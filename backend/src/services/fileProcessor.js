const XLSX = require('xlsx');
const csv = require('csv-parser');
const { Readable } = require('stream');

class FileProcessor {
  async processFile(file) {
    try {
      const fileExt = file.originalname.split('.').pop().toLowerCase();
      let data = [];
      
      if (fileExt === 'csv') {
        data = await this.processCSV(file.buffer);
      } else {
        data = this.processExcel(file.buffer);
      }
      
      if (!data || data.length === 0) {
        throw new Error('File contains no data');
      }
      
      return data;
    } catch (error) {
      throw new Error(`File processing failed: ${error.message}`);
    }
  }

  async processCSV(buffer) {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = Readable.from(buffer.toString());
      
      stream.pipe(csv())
        .on('data', (data) => {
          const cleanedData = {};
          for (const [key, value] of Object.entries(data)) {
            if (['Units_Sold', 'Unit_Price', 'Revenue'].includes(key)) {
              // Remove any commas and convert to number
              const cleanValue = value.toString().replace(/,/g, '').trim();
              const numValue = parseFloat(cleanValue);
              cleanedData[key] = isNaN(numValue) ? 0 : numValue;
            } else {
              cleanedData[key] = value;
            }
          }
          results.push(cleanedData);
        })
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  processExcel(buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
      raw: false,
      defval: 0
    });
    
    return jsonData.map(row => {
      const cleanedRow = {};
      for (const [key, value] of Object.entries(row)) {
        if (['Units_Sold', 'Unit_Price', 'Revenue'].includes(key)) {
          let numValue;
          if (typeof value === 'string') {
            const cleanValue = value.replace(/,/g, '').trim();
            numValue = parseFloat(cleanValue);
          } else {
            numValue = Number(value);
          }
          cleanedRow[key] = isNaN(numValue) ? 0 : numValue;
        } else {
          cleanedRow[key] = value;
        }
      }
      return cleanedRow;
    });
  }

  generateStats(data) {
    // Calculate total revenue
    const totalRevenue = data.reduce((sum, row) => {
      return sum + (Number(row.Revenue) || 0);
    }, 0);
    
    const totalUnits = data.reduce((sum, row) => {
      return sum + (Number(row.Units_Sold) || 0);
    }, 0);
    
    const avgOrderValue = totalUnits > 0 ? totalRevenue / totalUnits : 0;
    
    // Category breakdown
    const categoryBreakdown = data.reduce((acc, row) => {
      const category = row.Product_Category;
      if (!acc[category]) {
        acc[category] = { revenue: 0, units: 0, orders: 0 };
      }
      acc[category].revenue += Number(row.Revenue) || 0;
      acc[category].units += Number(row.Units_Sold) || 0;
      acc[category].orders += 1;
      return acc;
    }, {});

    // Region breakdown
    const regionBreakdown = data.reduce((acc, row) => {
      const region = row.Region;
      if (!acc[region]) {
        acc[region] = { revenue: 0, units: 0, orders: 0 };
      }
      acc[region].revenue += Number(row.Revenue) || 0;
      acc[region].units += Number(row.Units_Sold) || 0;
      acc[region].orders += 1;
      return acc;
    }, {});

    // Status breakdown
    const statusBreakdown = data.reduce((acc, row) => {
      const status = row.Status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Date range
    const dates = data.map(row => new Date(row.Date)).filter(d => !isNaN(d));
    const dateRange = dates.length > 0 ? {
      from: new Date(Math.min(...dates)).toISOString().split('T')[0],
      to: new Date(Math.max(...dates)).toISOString().split('T')[0]
    } : { from: 'N/A', to: 'N/A' };

    // Calculate percentages
    const categoryWithPercentages = {};
    for (const [cat, vals] of Object.entries(categoryBreakdown)) {
      categoryWithPercentages[cat] = {
        revenue: vals.revenue,
        units: vals.units,
        orders: vals.orders,
        revenuePercentage: totalRevenue > 0 ? Number(((vals.revenue / totalRevenue) * 100).toFixed(1)) : 0,
        unitPercentage: totalUnits > 0 ? Number(((vals.units / totalUnits) * 100).toFixed(1)) : 0
      };
    }

    const regionWithPercentages = {};
    for (const [region, vals] of Object.entries(regionBreakdown)) {
      regionWithPercentages[region] = {
        revenue: vals.revenue,
        units: vals.units,
        orders: vals.orders,
        revenuePercentage: totalRevenue > 0 ? Number(((vals.revenue / totalRevenue) * 100).toFixed(1)) : 0,
        unitPercentage: totalUnits > 0 ? Number(((vals.units / totalUnits) * 100).toFixed(1)) : 0
      };
    }

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalUnits: Math.round(totalUnits * 100) / 100,
      avgOrderValue: Math.round(avgOrderValue * 100) / 100,
      totalOrders: data.length,
      dateRange,
      categoryBreakdown: categoryWithPercentages,
      regionBreakdown: regionWithPercentages,
      statusBreakdown
    };
  }
}

module.exports = new FileProcessor();