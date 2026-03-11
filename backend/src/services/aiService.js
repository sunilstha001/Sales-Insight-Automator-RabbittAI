const Groq = require('groq-sdk');

class AIService {
  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }
    
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }

  async generateNarrative(data, stats) {
    try {
      const prompt = this.buildPrompt(data, stats);
      
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a professional business analyst. Create a concise, professional sales summary.
            
CRITICAL RULES:
1. Use EXACT numbers provided - do not modify them
2. Format currency with commas: $684,000 not $684000
3. Format percentages with one decimal place: 93.5% not 93.5
4. Keep it concise and professional for executives`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 1000
      });

      return completion.choices[0]?.message?.content || "Unable to generate summary";
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI summary');
    }
  }

  buildPrompt(data, stats) {
    const formatCurrency = (num) => {
      return '$' + num.toLocaleString('en-US');
    };

    // Build category breakdown
    const categoryText = Object.entries(stats.categoryBreakdown)
      .map(([cat, vals]) => {
        return `- ${cat}: ${formatCurrency(vals.revenue)} (${vals.revenuePercentage}% of total), ${vals.units.toLocaleString()} units (${vals.unitPercentage}% of units), ${vals.orders} orders`;
      }).join('\n');

    // Build region breakdown
    const regionText = Object.entries(stats.regionBreakdown)
      .map(([region, vals]) => {
        return `- ${region}: ${formatCurrency(vals.revenue)} (${vals.revenuePercentage}% of total), ${vals.units.toLocaleString()} units (${vals.unitPercentage}% of units), ${vals.orders} orders`;
      }).join('\n');

    // Build status breakdown
    const statusText = Object.entries(stats.statusBreakdown)
      .map(([status, count]) => {
        const percentage = ((count / stats.totalOrders) * 100).toFixed(1);
        return `- ${status}: ${count} orders (${percentage}%)`;
      }).join('\n');

    return `
SALES DATA ANALYSIS - USE THESE EXACT NUMBERS:

===========================================
KEY METRICS
===========================================
Total Revenue: ${formatCurrency(stats.totalRevenue)}
Total Units Sold: ${stats.totalUnits.toLocaleString()}
Total Orders: ${stats.totalOrders}
Average Order Value: ${formatCurrency(stats.avgOrderValue)}
Date Range: ${stats.dateRange.from} to ${stats.dateRange.to}

===========================================
CATEGORY BREAKDOWN
===========================================
${categoryText}

===========================================
REGIONAL BREAKDOWN
===========================================
${regionText}

===========================================
ORDER STATUS
===========================================
${statusText}

===========================================
REQUIRED OUTPUT FORMAT
===========================================
Please provide:

**EXECUTIVE SUMMARY**
[2-3 sentences summarizing overall performance with key numbers]

**KEY INSIGHTS**
• [Insight 1 with specific numbers]
• [Insight 2 with specific numbers]
• [Insight 3 with specific numbers]

**TOP PERFORMING**
- Best Category: [Name] with [revenue] ([percentage]% of total)
- Best Region: [Name] with [revenue] ([percentage]% of total)

**AREAS FOR IMPROVEMENT**
• [Area 1 with specific numbers]
• [Area 2 with specific numbers]

**ACTIONABLE RECOMMENDATIONS**
1. [Recommendation 1 with rationale]
2. [Recommendation 2 with rationale]

REMEMBER: Use EXACT numbers from above.`;
  }
}

module.exports = new AIService();