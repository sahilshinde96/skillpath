/**
 * ============================================================================
 * SkillSprint Official 14-Day Practical Sprint Curricula & Quiz Engine
 * ============================================================================
 * Contains complete curriculum matrix for:
 * 1. AI-Integrated Data Science: 14-Day Practical Sprint
 * 2. AI-Integrated Web Development: 14-Day Practical Sprint
 * Each day contains:
 *  - Core concepts & problem framing
 *  - Coding task & requirements
 *  - Starter code & solution reference
 *  - 3 Common logical errors
 *  - Socratic AI Mentor questions
 *  - Daily 3-question mastery quiz with explanations
 */

export const SPRINT_TRACKS = {
  "data-science": {
    id: "data-science",
    title: "AI-Integrated Data Science: 14-Day Practical Sprint",
    shortTitle: "Data Science",
    badge: "14-Day Sprint",
    icon: "database",
    color: "#2563eb",
    objective: "Transform beginners into hands-on junior Data Science practitioners through 14 consecutive 20–30 minute practical learning sprints.",
    promise: "14 days. 14 practical skills. 14 working data artifacts. One portfolio-ready Data Science project.",
    clientBrief: {
      client: "DataNova Technologies",
      projectTitle: "AI-Integrated Data Intelligence & Prediction Platform",
      background: "DataNova collects large amounts of customer and business data but struggles to convert that data into actionable insights.",
      trackA: "Predictive Data Science (ML pipeline, customer churn, predictive dashboard)",
      trackB: "Data Analytics & Decision Intelligence (EDA, statistical hypothesis tests, executive business recommendations)",
    },
    progression: [
      "UNDERSTAND", "CODE", "MANIPULATE", "CLEAN", "EXPLORE",
      "VISUALIZE", "ANALYZE", "ENGINEER", "MODEL", "EVALUATE",
      "AUGMENT WITH AI", "AUTOMATE", "BUILD CAPSTONE"
    ],
    days: [
      {
        day: 1,
        title: "Data Science Fundamentals & Problem Framing",
        skill: "Problem Framing & Lifecycle",
        progressionStep: "UNDERSTAND",
        concept: `A Data Scientist does not start with a model. A Data Scientist starts with a question.

You will learn how Data Science differs from Data Analytics, Machine Learning, AI, and Business Intelligence.

The Data Science Lifecycle:
1. Problem Definition → 2. Data Collection → 3. Data Preparation → 4. EDA → 5. Feature Engineering → 6. Model Building → 7. Evaluation → 8. Deployment → 9. Communication.`,
        codingTask: `Create a Python Data Science Problem Framing Tool for DataNova Technologies customer churn prediction.
Requirements:
1. Define problem statement & business impact.
2. Identify target variable ('churned') vs input features.
3. Define success metric (e.g. recall > 0.85 to catch leaving customers).
4. Output a structured project specification dict.`,
        language: "python",
        starterCode: `# Day 1: Problem Framing Tool
def generate_project_spec(business_goal, target_var, metric):
    """
    Generate structured specification dictionary.
    TODO: Complete the specification mapping
    """
    spec = {
        "client": "DataNova Technologies",
        "business_goal": business_goal,
        "target_variable": target_var,
        "evaluation_metric": metric,
        "lifecycle_phase": "Phase 1: Problem Definition"
    }
    return spec

# Test execution
if __name__ == "__main__":
    result = generate_project_spec(
        business_goal="Reduce subscription churn by 15%",
        target_var="churned",
        metric="Recall"
    )
    print("Project Spec Created:", result["target_variable"] == "churned")`,
        solutionCode: `def generate_project_spec(business_goal, target_var, metric):
    return {
        "client": "DataNova Technologies",
        "business_goal": business_goal,
        "target_variable": target_var,
        "evaluation_metric": metric,
        "lifecycle_phase": "Phase 1: Problem Definition",
        "approved": True
    }`,
        commonErrors: [
          "Confusing a business problem with a technical algorithm.",
          "Selecting a target variable without defining why it impacts business.",
          "Choosing metrics like accuracy before understanding class imbalance."
        ],
        mentorQuestions: [
          "What concrete business decision will this analysis help stakeholders make?",
          "Why is 'churned' your target variable instead of monthly spending?",
          "If 95% of users stay, why could high accuracy be misleading?"
        ],
        quizzes: [
          {
            q: "What is the primary starting point of a professional Data Science project?",
            options: [
              "Training an advanced neural network",
              "Framing a clear business question and definition of success",
              "Writing complex SQL queries",
              "Creating multi-colored 3D visualizations"
            ],
            answer: 1,
            explanation: "A Data Scientist starts with a problem definition, not a model."
          },
          {
            q: "Why is accuracy a dangerous metric when predicting rare events like customer churn (5% churn rate)?",
            options: [
              "Accuracy requires too much compute power",
              "A trivial model predicting 'no churn' for everyone achieves 95% accuracy while missing 100% of churners",
              "Accuracy only works for regression problems",
              "Python cannot calculate accuracy on boolean targets"
            ],
            answer: 1,
            explanation: "In imbalanced datasets, high accuracy can conceal a model that fails entirely at detecting the minority class."
          },
          {
            q: "Which sequence correctly reflects the core Data Science lifecycle?",
            options: [
              "Model → Deployment → EDA → Problem Definition",
              "Problem Definition → Data Prep → EDA → Feature Engineering → Model → Evaluation",
              "Visualization → Deployment → Problem Definition → Data Cleaning",
              "Feature Engineering → Training → Problem Definition → EDA"
            ],
            answer: 1,
            explanation: "Problem framing leads to data preparation, exploration, engineering, modeling, and rigorous evaluation."
          }
        ]
      },
      {
        day: 2,
        title: "Python for Data Science",
        skill: "Python Fundamentals for Data",
        progressionStep: "CODE",
        concept: `Focus on writing reusable, clean Python functions for data-related tasks rather than memorizing entire language trivia.

Master:
- Lists, Dictionaries, Tuples
- Loops & List comprehensions
- Functions with typed returns
- Exception handling on invalid numerical data.`,
        codingTask: `Build a Student Performance Analyzer function.
Calculates average, highest mark, lowest mark, and pass/fail status given a list of subject scores.`,
        language: "python",
        starterCode: `# Day 2: Student Performance Analyzer
def analyze_performance(student_name, marks):
    # TODO: Calculate average, max, min, and pass status (pass if avg >= 50)
    # Return a dictionary with: name, average, highest, lowest, passed
    pass

# Test
marks = [78, 85, 92, 64, 88]
res = analyze_performance("Alex Chen", marks)
print(res)`,
        solutionCode: `def analyze_performance(student_name, marks):
    if not marks:
        return {"name": student_name, "average": 0, "highest": 0, "lowest": 0, "passed": False}
    avg = sum(marks) / len(marks)
    return {
        "name": student_name,
        "average": round(avg, 2),
        "highest": max(marks),
        "lowest": min(marks),
        "passed": avg >= 50
    }`,
        commonErrors: [
          "Incorrect indentation causing loop logic to fail.",
          "Mixing string numbers like '85' with numerical integers without casting.",
          "Failing to handle an empty list or invalid values."
        ],
        mentorQuestions: [
          "Can this repeated calculation be extracted into a modular function?",
          "What happens if a student has an invalid negative or null mark?",
          "How would list comprehension simplify filtering passing scores?"
        ],
        quizzes: [
          {
            q: "What is the primary benefit of list comprehensions in Python data processing?",
            options: [
              "They run in the browser without Python",
              "They provide concise, readable syntax for transforming sequences without boilerplate loops",
              "They convert lists into relational databases",
              "They prevent any syntax errors from occurring"
            ],
            answer: 1,
            explanation: "List comprehensions offer a declarative, idiomatic way to map and filter lists."
          },
          {
            q: "What will `sum([10, 20, 30]) / len([10, 20, 30])` compute in Python?",
            options: ["The median (20)", "The arithmetic mean (20.0)", "The variance (66.6)", "The standard deviation"],
            answer: 1,
            explanation: "Dividing total sum by element count gives the arithmetic mean."
          },
          {
            q: "Why is a Python dictionary particularly useful for representing a single record or observation?",
            options: [
              "Dictionaries maintain unordered duplicates",
              "Key-value pairs map directly to feature names and observed values",
              "Dictionaries can only contain strings",
              "Dictionaries automatically train a regression model"
            ],
            answer: 1,
            explanation: "Keys act as column/feature headers and values represent observation data points."
          }
        ]
      },
      {
        day: 3,
        title: "NumPy & Numerical Computing",
        skill: "NumPy & Vectorized Computing",
        progressionStep: "MANIPULATE",
        concept: `Data Science requires efficient numerical computation, and NumPy provides optimized array operations in C.

Vectorized operations allow math across millions of points without slow Python loops.`,
        codingTask: `Build a Sales Statistics Analyzer using NumPy. Calculate mean sales, median, standard deviation, and daily deviations from the mean.`,
        language: "python",
        starterCode: `# Day 3: NumPy Sales Analyzer
import numpy as np

def analyze_sales(sales_data):
    arr = np.array(sales_data)
    # TODO: Calculate mean, median, std_dev, and deviation_from_avg
    return {
        "mean": float(np.mean(arr)),
        "median": float(np.median(arr)),
        "std_dev": float(np.std(arr)),
        "deviations": (arr - np.mean(arr)).tolist()
    }`,
        solutionCode: `import numpy as np

def analyze_sales(sales_data):
    arr = np.array(sales_data, dtype=float)
    mean_val = float(np.mean(arr))
    return {
        "mean": round(mean_val, 2),
        "median": round(float(np.median(arr)), 2),
        "std_dev": round(float(np.std(arr)), 2),
        "deviations": np.round(arr - mean_val, 2).tolist()
    }`,
        commonErrors: [
          "Confusing array shape `(3, 4)` with total array size `12`.",
          "Using slow Python `for` loops instead of native vectorized arithmetic.",
          "Applying operations across the wrong axis (axis=0 vs axis=1)."
        ],
        mentorQuestions: [
          "Why is a NumPy ndarray substantially faster than a standard Python list?",
          "What does a high standard deviation indicate about monthly sales stability?"
        ],
        quizzes: [
          {
            q: "What does 'vectorization' in NumPy mean?",
            options: [
              "Drawing vector graphics with SVG",
              "Performing element-wise operations at compiled C-speed without explicit Python loops",
              "Creating vectors only in 3D physics engines",
              "Converting strings into integers"
            ],
            answer: 1,
            explanation: "Vectorization offloads repetitive iterations to optimized compiled low-level routines."
          },
          {
            q: "If an array has shape `(100, 5)`, what does that represent in a typical dataset?",
            options: ["5 rows and 100 columns", "100 observations (rows) with 5 features (columns)", "500 dimensions in 3D space", "A 1D vector of length 95"],
            answer: 1,
            explanation: "In 2D arrays, axis 0 represents rows (records) and axis 1 represents columns (attributes)."
          },
          {
            q: "When would you prefer the median over the mean?",
            options: [
              "When data has extreme outliers or heavy skewness",
              "When all numbers are identical",
              "When calculating standard deviation",
              "Only when data contains negative numbers"
            ],
            answer: 0,
            explanation: "The median is robust against extreme outliers, unlike the mean which gets pulled by extreme values."
          }
        ]
      },
      {
        day: 4,
        title: "Pandas & Data Manipulation",
        skill: "Pandas & DataFrames",
        progressionStep: "MANIPULATE",
        concept: `Raw table → Structured DataFrame → Useful information.
Pandas is the workhorse of real-world data science: reading CSVs, filtering rows, group-by aggregations, and column transformations.`,
        codingTask: `Build a Retail Sales Analyzer with Pandas calculating total revenue, revenue by category, and top products.`,
        language: "python",
        starterCode: `# Day 4: Pandas Retail Analyzer
# Simulate DataFrame operations
import pandas as pd

def process_retail(data_records):
    df = pd.DataFrame(data_records)
    # TODO: Add 'revenue' = quantity * price
    # Group by category and sum revenue
    df['revenue'] = df['quantity'] * df['price']
    cat_revenue = df.groupby('category')['revenue'].sum().to_dict()
    return cat_revenue`,
        solutionCode: `import pandas as pd

def process_retail(data_records):
    df = pd.DataFrame(data_records)
    df['revenue'] = df['quantity'] * df['price']
    return {
        "total_revenue": float(df['revenue'].sum()),
        "by_category": df.groupby('category')['revenue'].sum().to_dict(),
        "top_product": df.groupby('product')['revenue'].sum().idxmax()
    }`,
        commonErrors: [
          "Filtering with `and` instead of bitwise `&` inside Pandas conditionals.",
          "Performing aggregations on string columns without numeric casting.",
          "Modifying DataFrame views without `.copy()` leading to SettingWithCopyWarning."
        ],
        mentorQuestions: [
          "Why did you group by this specific column rather than another?",
          "What concrete business decision does your category revenue aggregation support?"
        ],
        quizzes: [
          {
            q: "What is the primary difference between a Pandas Series and a DataFrame?",
            options: [
              "A Series is a 1-dimensional labeled array; a DataFrame is a 2-dimensional tabular structure with labeled rows and columns",
              "A Series holds only numbers while a DataFrame holds only strings",
              "Series are deprecated in Pandas 2.0",
              "DataFrames can only have 1 column"
            ],
            answer: 0,
            explanation: "A DataFrame is essentially a collection of Series sharing an index."
          },
          {
            q: "How do you combine multiple conditions when filtering a Pandas DataFrame?",
            options: [
              "`df[(df['a'] > 5) & (df['b'] < 10)]`",
              "`df[df['a'] > 5 and df['b'] < 10]`",
              "`df.filter(a > 5 or b < 10)`",
              "`df.where('a > 5 && b < 10')`"
            ],
            answer: 0,
            explanation: "Pandas requires bitwise operators `&` and `|` with parenthesized conditions."
          },
          {
            q: "What does `df.groupby('city')['revenue'].mean()` compute?",
            options: [
              "The average city population",
              "The average revenue generated per transaction in each distinct city",
              "The total global revenue divided by cities",
              "The median sales per country"
            ],
            answer: 1,
            explanation: "It groups records by city and calculates the mean revenue for each group."
          }
        ]
      },
      {
        day: 5,
        title: "Data Cleaning & Preprocessing",
        skill: "Data Cleaning & Imputation",
        progressionStep: "CLEAN",
        concept: `Real data is messy: missing values, duplicate records, inconsistent casing, invalid entries (Age = -5).
Understand the critical difference between blindly dropping data and domain-aware imputation.`,
        codingTask: `Create a Data Cleaning Pipeline that detects missing values, removes duplicates, standardizes strings, and handles invalid numbers.`,
        language: "python",
        starterCode: `# Day 5: Cleaning Pipeline
def clean_dataset(records):
    # TODO: 
    # 1. Remove duplicate IDs
    # 2. Impute missing age with median
    # 3. Standardize gender ('M'/'male' -> 'Male')
    pass`,
        solutionCode: `def clean_dataset(records):
    seen_ids = set()
    cleaned = []
    ages = [r["age"] for r in records if r.get("age") and r["age"] > 0]
    median_age = sorted(ages)[len(ages)//2] if ages else 30
    
    for r in records:
        if r["id"] in seen_ids:
            continue
        seen_ids.add(r["id"])
        item = dict(r)
        if not item.get("age") or item["age"] <= 0:
            item["age"] = median_age
        item["gender"] = "Male" if str(item.get("gender","")).lower().startswith("m") else "Female"
        cleaned.append(item)
    return cleaned`,
        commonErrors: [
          "Deleting every row with a null value, discarding 40% of useful training data.",
          "Treating every statistical outlier as an error without investigating context.",
          "Silently mutating records without logging or tracking transformation steps."
        ],
        mentorQuestions: [
          "Why did you choose median imputation over mean imputation for age?",
          "Could this outlier order value represent a legitimate enterprise client?"
        ],
        quizzes: [
          {
            q: "When is median imputation preferable to mean imputation for missing values?",
            options: [
              "When the distribution has strong skewness or extreme outliers",
              "When data is categorical",
              "Only when sample size is less than 5",
              "Never, mean is always mathematically superior"
            ],
            answer: 0,
            explanation: "Outliers pull the mean away from the true center; the median remains robust."
          },
          {
            q: "What danger occurs when dropping all rows with any missing value via `dropna()`?",
            options: [
              "You can introduce systematic bias and lose significant portions of your sample size",
              "It deletes the entire SQL database",
              "It turns integers into strings",
              "Pandas will crash with a memory error"
            ],
            answer: 0,
            explanation: "If missingness is correlated with a specific group, dropping rows distorts the distribution."
          },
          {
            q: "What is string normalization in data cleaning?",
            options: [
              "Translating text to Latin",
              "Standardizing capitalization, stripping whitespace, and consolidating synonymous terms (e.g. 'NY', 'New York')",
              "Converting strings to floating point numbers",
              "Deleting all punctuation"
            ],
            answer: 1,
            explanation: "Normalization ensures categories are uniform and consistently counted."
          }
        ]
      },
      {
        day: 6,
        title: "Exploratory Data Analysis",
        skill: "EDA & Correlation Analysis",
        progressionStep: "EXPLORE",
        concept: `Explore before you model.
EDA is about systematically uncovering distributions, relationships, correlations, and anomalies to build domain intuition.`,
        codingTask: `Generate an automated EDA Summary Report reporting row/column counts, missing percentage, numerical stats, and Pearson correlations.`,
        language: "python",
        starterCode: `# Day 6: EDA Report Generator
def generate_eda_report(df_dict):
    # TODO: Calculate dimensions, column null counts, and summary stats
    return {
        "rows": len(df_dict),
        "columns": list(df_dict[0].keys()) if df_dict else [],
        "null_counts": {}
    }`,
        solutionCode: `def generate_eda_report(records):
    if not records:
        return {"rows": 0, "columns": []}
    cols = list(records[0].keys())
    null_counts = {c: sum(1 for r in records if r.get(c) is None) for c in cols}
    return {
        "rows": len(records),
        "columns": cols,
        "null_counts": null_counts,
        "completeness_pct": round(100 * (1 - sum(null_counts.values()) / (len(records) * len(cols))), 2)
    }`,
        commonErrors: [
          "Calculating Pearson correlation on raw categorical strings.",
          "Reporting correlation without noting that correlation does NOT equal causation.",
          "Skipping visual inspection of distributions."
        ],
        mentorQuestions: [
          "What is the single most actionable pattern your EDA revealed?",
          "Does a high correlation between customer tenure and spend imply tenure causes spending?"
        ],
        quizzes: [
          {
            q: "What does a Pearson correlation coefficient of -0.85 indicate between two features?",
            options: [
              "No relationship exists",
              "A strong inverse linear relationship: as one increases, the other systematically decreases",
              "85% of records are invalid",
              "A positive exponential curve"
            ],
            answer: 1,
            explanation: "Negative values near -1 signify a strong inverse linear correlation."
          },
          {
            q: "Why is 'correlation does not imply causation' a fundamental principle in Data Science?",
            options: [
              "Two variables can correlate due to a confounding third factor or random coincidence",
              "Correlation only applies to biological data",
              "Math formulas are rarely reliable",
              "Causation can never be proven in any field"
            ],
            answer: 0,
            explanation: "Confounding variables often create strong correlations between independent phenomena."
          },
          {
            q: "What visual chart is most effective for inspecting the distribution of a single continuous variable?",
            options: ["Pie chart", "Histogram or KDE plot", "Network diagram", "Stacked bar chart"],
            answer: 1,
            explanation: "Histograms show bin counts and frequency distributions clearly."
          }
        ]
      },
      {
        day: 7,
        title: "Data Visualization & Storytelling",
        skill: "Visualization & Dashboards",
        progressionStep: "VISUALIZE",
        concept: `A Data Scientist must communicate findings, not just calculate them.
Choose chart types strictly based on the question being answered:
- Category comparison → Bar chart
- Trend over time → Line chart
- Distribution → Histogram / Box plot
- Relationship → Scatter plot
- Correlation matrix → Heatmap.`,
        codingTask: `Create a Sales Dashboard specification selecting 5 distinct visualizations mapped to business questions.`,
        language: "python",
        starterCode: `# Day 7: Visualization Mapper
CHART_MAPPING = {
    "trend_over_time": "line_chart",
    "category_comparison": "bar_chart",
    "distribution": "histogram",
    "feature_relationship": "scatter_plot",
    "outliers": "box_plot"
}`,
        solutionCode: `def get_recommended_chart(analytical_goal):
    mapping = {
        "trend": "Line Chart (temporal continuity)",
        "compare": "Bar Chart (discrete categories)",
        "distribution": "Histogram / KDE (shape & skew)",
        "relationship": "Scatter Plot (bivariate correlation)",
        "spread": "Box Plot (quartiles & outliers)"
    }
    for k, v in mapping.items():
        if k in analytical_goal.lower():
            return v
    return "Bar Chart"`,
        commonErrors: [
          "Using pie charts with more than 3 slices, making angle comparison impossible.",
          "Omitting axis labels, units, or starting bar chart y-axes at non-zero misleading values.",
          "Prioritizing aesthetic decoration over cognitive clarity."
        ],
        mentorQuestions: [
          "What specific question does this visualization answer in under 5 seconds?",
          "Could this truncated scale lead an executive to an erroneous conclusion?"
        ],
        quizzes: [
          {
            q: "Why are pie charts with 10 slices widely discouraged in professional data visualizations?",
            options: [
              "Human visual cognition is poor at judging relative angles and areas compared to aligned bar lengths",
              "Pie charts require WebGL graphics accelerators",
              "They cannot display percentages",
              "They are illegal under WCAG guidelines"
            ],
            answer: 0,
            explanation: "Bar charts align values on a shared axis, enabling accurate rapid comparison."
          },
          {
            q: "Which visualization is best suited for identifying outliers across multiple categorical groups?",
            options: ["Line chart", "Box plot (whisker plot)", "Scatter plot with 1 point", "Word cloud"],
            answer: 1,
            explanation: "Box plots display median, IQR, and points beyond 1.5x IQR as explicit outliers."
          },
          {
            q: "What is the primary risk of truncating the Y-axis on a bar chart?",
            options: [
              "It visually exaggerates minor differences between categories, misleading viewers",
              "It slows down rendering performance",
              "It deletes negative numbers",
              "It converts the chart into a line chart"
            ],
            answer: 0,
            explanation: "Bar charts encode quantity by length from zero; cutting the baseline distorts ratios."
          }
        ]
      },
      {
        day: 8,
        title: "Statistics & Hypothesis Testing",
        skill: "A/B Testing & p-values",
        progressionStep: "ANALYZE",
        concept: `Make statistically defensible decisions.
Formulate:
H₀ (Null Hypothesis): There is no significant difference between Control and Variant.
H₁ (Alternative Hypothesis): A significant difference exists.
Interpret p-value against significance threshold alpha = 0.05.`,
        codingTask: `Build an A/B Testing Significance Analyzer. Calculate group means, lift percentage, t-statistic, and p-value conclusion.`,
        language: "python",
        starterCode: `# Day 8: A/B Testing Significance Analyzer
def evaluate_ab_test(control_mean, variant_mean, p_val, alpha=0.05):
    # TODO: Determine if result is statistically significant
    # Calculate percentage lift
    lift = ((variant_mean - control_mean) / control_mean) * 100
    significant = p_val < alpha
    return {"lift_pct": round(lift, 2), "significant": significant}`,
        solutionCode: `def evaluate_ab_test(control_mean, variant_mean, p_val, alpha=0.05):
    lift = ((variant_mean - control_mean) / control_mean) * 100
    significant = p_val < alpha
    conclusion = "Reject H0: Statistically significant improvement" if significant and lift > 0 else "Fail to reject H0: Difference likely due to chance"
    return {
        "lift_pct": round(lift, 2),
        "p_value": p_val,
        "alpha": alpha,
        "significant": significant,
        "conclusion": conclusion
    }`,
        commonErrors: [
          "Treating a p-value as the probability that the hypothesis itself is true.",
          "Confusing statistical significance with business practical significance (a 0.01% lift on 1M users).",
          "Stopping an A/B test early as soon as p < 0.05 (peeking problem)."
        ],
        mentorQuestions: [
          "What is your exact null hypothesis in plain English?",
          "Even if the p-value is 0.02, is a $0.03 revenue lift worth re-engineering the application?"
        ],
        quizzes: [
          {
            q: "What does a p-value of 0.03 strictly mean when testing a new website design against alpha = 0.05?",
            options: [
              "There is a 3% chance the new design is effective",
              "Assuming the null hypothesis is true (no real difference), there is a 3% probability of observing data at least this extreme by random chance alone",
              "The conversion rate will improve by 3%",
              "97% of users preferred the new design"
            ],
            answer: 1,
            explanation: "The p-value measures probability of data under the null, not probability of the hypothesis."
          },
          {
            q: "What is a Type I error in statistical hypothesis testing?",
            options: [
              "A syntax error in Python",
              "Rejecting the null hypothesis when it was actually true (False Positive)",
              "Failing to reject the null when it was false (False Negative)",
              "Dividing by zero in NumPy"
            ],
            answer: 1,
            explanation: "Type I error is a False Alarm: claiming an effect exists when it is merely noise."
          },
          {
            q: "Why is 'practical significance' distinct from 'statistical significance'?",
            options: [
              "With massive sample sizes, tiny trivial differences become statistically significant but lack real commercial value",
              "Practical significance only applies to non-profits",
              "Statistical significance cannot be measured in software",
              "They are identical terms"
            ],
            answer: 0,
            explanation: "High statistical power detects trivial lifts that do not justify engineering implementation costs."
          }
        ]
      },
      {
        day: 9,
        title: "Feature Engineering & Data Preparation",
        skill: "Feature Pipelines & Anti-Leakage",
        progressionStep: "ENGINEER",
        concept: `Machine learning performance depends heavily on representation.
Transform dates into day-of-week, combine raw signals into activity scores, one-hot encode categories, and scale numerical features.
CRITICAL RULE: Never allow information from the test set to leak into training (Data Leakage).`,
        codingTask: `Build a Feature Engineering Pipeline with train/test split and one-hot encoding without data leakage.`,
        language: "python",
        starterCode: `# Day 9: Feature Pipeline
def create_features(raw_record):
    # TODO: Calculate customer activity score and encode tier
    # Feature 1: tenure_months * monthly_orders
    # Feature 2: is_vip (tier == 'Enterprise')
    pass`,
        solutionCode: `def create_features(raw_record):
    tenure = raw_record.get("tenure_months", 1)
    orders = raw_record.get("monthly_orders", 0)
    return {
        "activity_score": round(tenure * orders, 2),
        "is_enterprise": 1 if raw_record.get("tier") == "Enterprise" else 0,
        "avg_spend_per_order": round(raw_record.get("spend", 0) / max(1, orders), 2)
    }`,
        commonErrors: [
          "Fitting scalers (MinMaxScaler/StandardScaler) on the entire dataset BEFORE train/test split.",
          "Including future information that would never be available at live prediction time.",
          "Including target-correlated metadata proxies (target leakage)."
        ],
        mentorQuestions: [
          "Could this feature contain information from after the customer already decided to churn?",
          "Why must the scaler `.fit()` only on the training split?"
        ],
        quizzes: [
          {
            q: "What is 'Data Leakage' in machine learning?",
            options: [
              "When an attacker steals user records from a database",
              "When information from outside the training dataset (such as test set or future data) influences model training",
              "When memory leaks cause Python to crash",
              "When features have null values"
            ],
            answer: 1,
            explanation: "Leakage creates unrealistically optimistic validation metrics that collapse in production."
          },
          {
            q: "Why must feature scaling (like StandardScaler) be fit ONLY on the training split?",
            options: [
              "To prevent the mean and variance of the test set from influencing feature transformations during training",
              "Because Scikit-learn will throw a syntax error otherwise",
              "Testing sets do not have numerical features",
              "Scaling test sets is impossible in Python"
            ],
            answer: 0,
            explanation: "Fitting on the entire dataset leaks test set distribution metrics into training."
          },
          {
            q: "What is One-Hot Encoding?",
            options: [
              "Encrypting passwords with SHA-256",
              "Converting categorical variables into binary (0/1) indicator columns for each category",
              "Normalizing numbers between 0 and 1",
              "Compressing files into zip archives"
            ],
            answer: 1,
            explanation: "It transforms categorical labels into distinct binary vector columns without false ordinal rank."
          }
        ]
      },
      {
        day: 10,
        title: "Supervised Machine Learning",
        skill: "Classification & Scikit-Learn",
        progressionStep: "MODEL",
        concept: `Build your first practical Machine Learning model.
Understand the core workflow:
Features + Target → Train/Test Split → Model Fitting → Inference / Prediction.
Classification (predict discrete class: Churn / No Churn) vs Regression (predict continuous value: Revenue).`,
        codingTask: `Build a Customer Churn Prediction Model pipeline using Scikit-Learn Logistic Regression / Decision Tree.`,
        language: "python",
        starterCode: `# Day 10: Churn Classifier Pipeline
# Simple rule/probabilistic classifier simulator
def predict_churn(customer_features):
    # Customer: {tenure, monthly_spend, complaints, contract_type}
    # TODO: Compute churn probability based on features
    score = 0.2
    if customer_features.get("complaints", 0) > 2:
        score += 0.4
    if customer_features.get("tenure", 12) < 3:
        score += 0.3
    return {"churn_probability": min(0.99, score), "prediction": score >= 0.5}`,
        solutionCode: `def predict_churn(customer_features):
    score = 0.15
    if customer_features.get("complaints", 0) >= 2:
        score += 0.40
    if customer_features.get("tenure", 12) < 3:
        score += 0.25
    if customer_features.get("contract_type") == "Month-to-Month":
        score += 0.15
    prob = round(min(0.95, max(0.05, score)), 2)
    return {
        "churn_probability": prob,
        "prediction": "CHURN" if prob >= 0.50 else "RETAIN",
        "risk_level": "HIGH" if prob > 0.65 else ("MEDIUM" if prob > 0.40 else "LOW")
    }`,
        commonErrors: [
          "Evaluating accuracy strictly on the training set, missing severe overfitting.",
          "Passing raw unencoded text labels directly to Scikit-learn estimators.",
          "Using the target variable as one of the input feature columns."
        ],
        mentorQuestions: [
          "What specific signals is the model relying on to predict churn?",
          "Why is evaluating a model only on training data dangerous?"
        ],
        quizzes: [
          {
            q: "What is the primary difference between Supervised and Unsupervised Learning?",
            options: [
              "Supervised learning trains on labeled input-output pairs; unsupervised discovers latent structure without ground-truth labels",
              "Supervised learning only runs on cloud GPUs",
              "Unsupervised learning requires humans to supervise the training",
              "Supervised learning cannot make predictions"
            ],
            answer: 0,
            explanation: "Supervised models learn a mapping function from features to known ground-truth targets."
          },
          {
            q: "In Scikit-learn, what is the role of the `model.fit(X_train, y_train)` method?",
            options: [
              "It sizes the browser window",
              "It optimizes internal model parameters to minimize loss on training data",
              "It exports the code to GitHub",
              "It cleans null values in X_train"
            ],
            answer: 1,
            explanation: "`.fit()` executes parameter optimization (training) on the feature matrix and target vector."
          },
          {
            q: "What does `train_test_split(test_size=0.2)` achieve?",
            options: [
              "Deletes 20% of corrupted records",
              "Reserves 20% of data completely untouched during training to evaluate true generalization performance",
              "Duplicates the dataset 5 times",
              "Scales numbers by 0.2"
            ],
            answer: 1,
            explanation: "Holding out test data simulates model performance on unseen production observations."
          }
        ]
      },
      {
        day: 11,
        title: "Model Evaluation & Optimization",
        skill: "Precision, Recall, ROC-AUC",
        progressionStep: "EVALUATE",
        concept: `Building a model is only the beginning.
Understand the Confusion Matrix:
- True Positives (TP), False Positives (FP), True Negatives (TN), False Negatives (FN).
- Precision = TP / (TP + FP) (Quality of positive predictions)
- Recall = TP / (TP + FN) (Quantity of actual positives detected)
- F1-Score = Harmonic mean of precision and recall.`,
        codingTask: `Create a Model Comparison Matrix computing Accuracy, Precision, Recall, and F1 across multiple model candidates.`,
        language: "python",
        starterCode: `# Day 11: Model Metrics Evaluator
def calculate_metrics(tp, fp, tn, fn):
    # TODO: Return dict with accuracy, precision, recall, f1
    acc = (tp + tn) / (tp + fp + tn + fn)
    prec = tp / (tp + fp) if (tp + fp) > 0 else 0
    rec = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (prec * rec) / (prec + rec) if (prec + rec) > 0 else 0
    return {"accuracy": round(acc, 3), "precision": round(prec, 3), "recall": round(rec, 3), "f1": round(f1, 3)}`,
        solutionCode: `def calculate_metrics(tp, fp, tn, fn):
    total = tp + fp + tn + fn
    acc = (tp + tn) / total if total > 0 else 0
    prec = tp / (tp + fp) if (tp + fp) > 0 else 0
    rec = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = (2 * prec * rec) / (prec + rec) if (prec + rec) > 0 else 0
    return {
        "accuracy": round(acc, 3),
        "precision": round(prec, 3),
        "recall": round(rec, 3),
        "f1": round(f1, 3),
        "balance_assessment": "High recall favors fraud/churn detection" if rec > prec else "High precision favors low-false-alarm applications"
    }`,
        commonErrors: [
          "Selecting a model purely on accuracy when target classes are heavily imbalanced.",
          "Evaluating repeatedly on the test set, causing hyperparameter test leakage.",
          "Ignoring the trade-off between False Positives and False Negatives."
        ],
        mentorQuestions: [
          "For customer churn, is a False Negative (missing a churner) worse than a False Positive (offering a discount to a loyal customer)?",
          "How does adjusting your classification probability threshold alter precision and recall?"
        ],
        quizzes: [
          {
            q: "In a medical diagnosis or customer churn setting, why is RECALL prioritized over Precision?",
            options: [
              "Recall is faster to compute",
              "Missing an actual positive case (False Negative) carries far worse consequences than investigating a false alarm",
              "Recall does not require test data",
              "Precision cannot exceed 0.5"
            ],
            answer: 1,
            explanation: "High recall ensures as many true positive cases as possible are identified and captured."
          },
          {
            q: "What does the F1-Score represent mathematically?",
            options: [
              "The arithmetic average of True Positives and True Negatives",
              "The harmonic mean of Precision and Recall",
              "The square root of accuracy",
              "The sum of all predictions"
            ],
            answer: 1,
            explanation: "The harmonic mean penalizes extreme imbalances between precision and recall."
          },
          {
            q: "What is Overfitting in machine learning?",
            options: [
              "When a model memorizes training noise and idiosyncrasies, performing great on training data but failing on unseen test data",
              "When a dataset has too many columns for RAM",
              "When training takes longer than 1 hour",
              "When accuracy is exactly 50%"
            ],
            answer: 0,
            explanation: "Overfitted models fail to generalize to real-world out-of-sample data."
          }
        ]
      },
      {
        day: 12,
        title: "AI-Assisted Data Science",
        skill: "LLM Augmentation & Verification",
        progressionStep: "AUGMENT WITH AI",
        concept: `AI can assist Data Scientists without blindly trusting AI-generated analysis.
LLMs help with SQL/Python code suggestions, summarizing EDA, explaining model behavior, and anomaly hypotheses.
CORE RULE: AI-generated insights MUST be verified directly against numerical evidence from the dataset.`,
        codingTask: `Build an AI-Assisted Insight Validator that checks AI claim numbers against ground-truth pandas calculations.`,
        language: "python",
        starterCode: `# Day 12: AI Claim Verifier
def verify_ai_claim(claim_val, actual_data_val, tolerance=0.01):
    # TODO: Verify if AI numeric assertion matches actual dataset value
    discrepancy = abs(claim_val - actual_data_val)
    return {
        "verified": discrepancy <= tolerance,
        "discrepancy": round(discrepancy, 4)
    }`,
        solutionCode: `def verify_ai_claim(claim_val, actual_data_val, tolerance=0.01):
    diff = abs(claim_val - actual_data_val)
    is_valid = diff <= tolerance
    return {
        "verified": is_valid,
        "claimed": claim_val,
        "actual": actual_data_val,
        "discrepancy": round(diff, 4),
        "status": "VALIDATED" if is_valid else "HALLUCINATION_DETECTED"
    }`,
        commonErrors: [
          "Accepting AI-generated statistical metrics without running code against the underlying CSV.",
          "Allowing LLM prompts to invent patterns or causal narratives unsupported by data.",
          "Pasting sensitive customer PII or raw secrets into external public AI APIs."
        ],
        mentorQuestions: [
          "Can you verify this specific AI-generated percentage directly from your pandas dataframe?",
          "What concrete numerical evidence supports this LLM recommendation?"
        ],
        quizzes: [
          {
            q: "What is the primary danger of using Generative AI blindly for data analysis?",
            options: [
              "AI code will not run in Python",
              "LLMs frequently hallucinate plausible-sounding statistics, percentages, and causal claims not present in the data",
              "AI increases RAM usage by 100x",
              "SQL queries are illegal for LLMs"
            ],
            answer: 1,
            explanation: "Generative models produce probabilistic text, not verified statistical calculations."
          },
          {
            q: "What is the responsible role of an AI Assistant in modern data science workflows?",
            options: [
              "Fully replacing human analysts and deploying models unmonitored",
              "Drafting boilerplate code, suggesting exploratory hypotheses, and explaining syntax, while humans verify all outputs",
              "Inventing synthetic data to replace real customer surveys",
              "Approving corporate financial statements automatically"
            ],
            answer: 1,
            explanation: "AI acts as a co-pilot; empirical validation against ground-truth data remains human responsibility."
          },
          {
            q: "Why should raw customer PII (names, emails, SSNs) never be passed to public LLM endpoints?",
            options: [
              "It violates privacy regulations (GDPR/CCPA/HIPAA) and client confidentiality",
              "LLMs cannot process text with symbols like '@'",
              "It makes the prompt too slow to load",
              "It turns the LLM into a classifier"
            ],
            answer: 0,
            explanation: "Exposing private identifying customer data violates strict security and compliance standards."
          }
        ]
      },
      {
        day: 13,
        title: "Data Science Automation & Deployment",
        skill: "Model Serialization & APIs",
        progressionStep: "AUTOMATE",
        concept: `Move from an interactive notebook into a reproducible production application.
Structure projects cleanly (data/, src/, models/, tests/, requirements.txt).
Serialize trained weights with Joblib/Pickle and expose a lightweight REST API or Streamlit interface.`,
        codingTask: `Build a Model Inference API Endpoint handler accepting JSON customer features and returning churn prediction payload.`,
        language: "python",
        starterCode: `# Day 13: Prediction Endpoint Handler
def handle_prediction_request(json_payload):
    # TODO: Validate input schema, extract features, generate prediction
    if not json_payload.get("customer_id"):
        return {"error": "customer_id required", "status": 400}
    # Return formatted prediction
    return {"status": 200, "prediction": "RETAIN"}`,
        solutionCode: `def handle_prediction_request(json_payload):
    req_fields = ["customer_id", "tenure", "monthly_spend"]
    for f in req_fields:
        if f not in json_payload:
            return {"status": 400, "error": f"Missing required field: {f}"}
    
    tenure = float(json_payload["tenure"])
    spend = float(json_payload["monthly_spend"])
    prob = round(0.75 if tenure < 3 else (0.45 if spend > 150 else 0.15), 2)
    
    return {
        "status": 200,
        "customer_id": json_payload["customer_id"],
        "churn_probability": prob,
        "action": "Trigger Retention Campaign" if prob > 0.50 else "Standard Monitoring"
    }`,
        commonErrors: [
          "Re-training the machine learning model from scratch on every incoming HTTP API request.",
          "Using different preprocessing or imputation rules during inference than were used during training.",
          "Failing to pin library versions in requirements.txt, causing deployment dependency drift."
        ],
        mentorQuestions: [
          "Is the exact same preprocessing pipeline used during training and live inference?",
          "Can an external developer clone your repository and reproduce the result in 3 terminal commands?"
        ],
        quizzes: [
          {
            q: "What is 'Model Serialization' in production machine learning?",
            options: [
              "Assigning serial numbers to each dataset row",
              "Freezing and persisting trained model parameters/artifacts to disk (e.g. .joblib, .onnx, .pkl) for fast reuse",
              "Printing predictions one by one",
              "Streaming videos of model training"
            ],
            answer: 1,
            explanation: "Serialization saves trained models to disk so inference servers can load them instantly without re-training."
          },
          {
            q: "Why is re-training a model on every incoming API request an anti-pattern?",
            options: [
              "Training is computationally heavy and causes unacceptable request latency and massive server load",
              "Python does not allow calling `.fit()` twice",
              "APIs only support GET requests",
              "It corrupts the operating system"
            ],
            answer: 0,
            explanation: "Training takes minutes to hours; inference should take milliseconds by loading pre-trained weights."
          },
          {
            q: "What is the purpose of `requirements.txt` in a Python data science repository?",
            options: [
              "Listing system hardware specifications",
              "Specifying exact package dependencies and version constraints for reproducible environments",
              "Writing instructions for human reviewers only",
              "Configuring Git credentials"
            ],
            answer: 1,
            explanation: "`requirements.txt` enables deterministic replication of the Python environment across machines."
          }
        ]
      },
      {
        day: 14,
        title: "End-to-End Data Science Capstone",
        skill: "Portfolio Capstone & Proof",
        progressionStep: "BUILD CAPSTONE",
        concept: `Integrate at least 3 previous components into a cohesive portfolio piece for DataNova Technologies.
Deliver:
README.md, clean source code, sample dataset, data dictionary, EDA report, 5 visualizations, trained model, evaluation metrics, and validated AI insights.`,
        codingTask: `Complete the DataNova Technologies AI-Integrated Data Intelligence Platform prototype.`,
        language: "python",
        starterCode: `# Day 14: Capstone Pipeline Integration
def run_end_to_end_capstone(raw_data):
    # Component 1: Data Cleaning & Preprocessing (Day 5)
    # Component 2: Feature Engineering (Day 9)
    # Component 3: Churn Prediction & Model Evaluation (Day 10/11)
    # Component 4: AI-Assisted Recommendation (Day 12)
    pass`,
        solutionCode: `def run_end_to_end_capstone(raw_data):
    total = len(raw_data)
    high_risk = sum(1 for r in raw_data if r.get("tenure", 12) < 3 or r.get("complaints", 0) > 1)
    churn_rate_est = round((high_risk / max(1, total)) * 100, 1)
    return {
        "status": "CAPSTONE_COMPLETE",
        "client": "DataNova Technologies",
        "records_processed": total,
        "high_risk_customers": high_risk,
        "projected_churn_rate_pct": churn_rate_est,
        "recommendation": "Deploy proactive onboarding intervention for accounts with tenure < 90 days."
    }`,
        commonErrors: [
          "Starting a completely new disconnected mini-project instead of consolidating previous sprint artifacts.",
          "Claiming 99% accuracy without discussing class balance or real-world model limitations.",
          "Omitting a clear 3-minute video demo or reproducible setup instructions in README."
        ],
        mentorQuestions: [
          "Can an engineering hiring manager reproduce your entire project using only your README.md?",
          "What is the single most significant limitation of your model in a production environment?"
        ],
        quizzes: [
          {
            q: "What makes a Data Science portfolio project truly convincing to engineering hiring managers?",
            options: [
              "Copy-pasting standard Titanic or Iris datasets with default tutorial code",
              "A demonstrable end-to-end artifact with problem framing, clean reproducible code, rigorous evaluation, and honest discussion of limitations",
              "A 500-page theoretical PDF document",
              "Using 10 different deep learning frameworks in one notebook"
            ],
            answer: 1,
            explanation: "Hiring managers look for end-to-end execution, analytical reasoning, and real engineering discipline."
          },
          {
            q: "Why is discussing model limitations in your final capstone report viewed positively by senior interviewers?",
            options: [
              "It proves you understand real-world edge cases, potential biases, and business constraints rather than assuming models are magic",
              "It lowers your salary expectations",
              "It allows you to skip writing unit tests",
              "It is required by the Python standard library"
            ],
            answer: 0,
            explanation: "Recognizing constraints demonstrates mature engineering judgment and reliability."
          },
          {
            q: "What is the optimal structure for a technical project presentation to executive stakeholders?",
            options: [
              "Mathematical formula proofs → Python syntax details → Database schema",
              "Problem Statement → Data & Methodology Summary → Findings & Business Impact → Next Steps",
              "Complaints about messy data → Random charts → Apologies",
              "Showing 1,000 lines of Jupyter Notebook code line by line"
            ],
            answer: 1,
            explanation: "Executives care about business context, validated findings, and actionable recommendations."
          }
        ]
      }
    ]
  },

  "web-dev": {
    id: "web-dev",
    title: "AI-Integrated Web Development: 14-Day Practical Sprint",
    shortTitle: "Web Development",
    badge: "14-Day Sprint",
    icon: "code",
    color: "#059669",
    objective: "Transform beginners into hands-on junior full-stack developers through 14 consecutive 20–30 minute practical learning sprints.",
    promise: "No passive learning days. Every day ends with a working code artifact and a submission.",
    clientBrief: {
      client: "SkillSprint Career Hub",
      projectTitle: "Full-Stack Developer Learning & Certification Platform",
      background: "A complete mini full-stack application connecting HTML/CSS, React frontend, Express/Django REST API, database persistence, and secure authentication.",
      trackA: "Interactive Frontend & Component Architecture",
      trackB: "Full-Stack API Integration & Application Security",
    },
    progression: [
      "UNDERSTAND", "STYLE", "RESPONSIVE", "PROGRAM", "INTERACT",
      "CONNECT", "VERSION", "BUILD UI", "BUILD SERVER", "CONNECT API",
      "STORE DATA", "AUTHENTICATE", "INTEGRATE", "DEPLOY + SHOW PROOF"
    ],
    days: [
      {
        day: 1,
        title: "HTML & Web Foundations",
        skill: "Semantic HTML & Architecture",
        progressionStep: "UNDERSTAND",
        concept: `Understand how the web actually functions before jumping into complex frameworks:
Browser → HTML (structure) → CSS (style) → JavaScript (behavior) → Server (data).
Focus on semantic HTML: header, nav, main, section, article, footer, forms, and accessibility.`,
        codingTask: `Build the semantic HTML structure for your developer portfolio (navigation, hero, about, skills, projects, contact form, footer).`,
        language: "html",
        starterCode: `<!-- Day 1: Semantic Portfolio Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Developer Portfolio</title>
</head>
<body>
  <!-- TODO: Add semantic header, nav, main, sections, and footer -->
  <header>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="hero">
      <h1>Hi, I'm Alex Chen</h1>
      <p>Junior Full-Stack Developer</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Alex Chen</p>
  </footer>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Chen — Full-Stack Developer</title>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="hero">
      <h1>Alex Chen</h1>
      <p>Full-Stack Engineer building resilient modern web applications.</p>
    </section>
    <section id="projects">
      <h2>Featured Projects</h2>
      <article>
        <h3>SkillSprint Learning Platform</h3>
        <p>Interactive web development simulator with instant feedback.</p>
      </article>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Alex Chen. All rights reserved.</p>
  </footer>
</body>
</html>`,
        commonErrors: [
          "Using <div> for every container instead of descriptive semantic tags like <section> or <article>.",
          "Incorrect nesting of tags (e.g. placing <p> inside <span> or unclosed tags).",
          "Missing form <label> associations and image alt attributes."
        ],
        mentorQuestions: [
          "What is the exact purpose of this section, and is there an HTML5 element that describes it better than <div>?",
          "If a screen reader user visited your page, would your heading hierarchy (h1, h2, h3) make navigation effortless?"
        ],
        quizzes: [
          {
            q: "Why is semantic HTML preferred over generic <div> containers?",
            options: [
              "Semantic tags load 10x faster over HTTP/3",
              "Semantic tags convey structural meaning to search engines, screen readers, and future developers",
              "HTML5 strictly bans the use of <div>",
              "Semantic elements automatically apply CSS styles"
            ],
            answer: 1,
            explanation: "Semantic elements communicate intent and accessibility to user agents and assistive tools."
          },
          {
            q: "How many `<h1>` elements should typically exist on a single webpage?",
            options: ["Zero", "Exactly one representing the main page topic", "At least five", "One per paragraph"],
            answer: 1,
            explanation: "Best accessibility and SEO practice dictates a single main `<h1>` per page."
          },
          {
            q: "What is the primary purpose of the `alt` attribute on `<img>` tags?",
            options: [
              "It styles the border color of the image",
              "It provides alternative text for screen readers and displays when the image fails to load",
              "It sets image compression quality",
              "It defines the hover animation duration"
            ],
            answer: 1,
            explanation: "The alt attribute ensures web content remains accessible to visually impaired users."
          }
        ]
      },
      {
        day: 2,
        title: "CSS Fundamentals",
        skill: "Box Model & Modern Styling",
        progressionStep: "STYLE",
        concept: `Transform plain HTML into a visually polished site.
Master the CSS Box Model:
Content → Padding (inside) → Border → Margin (outside).
Learn typography hierarchy, color variables, reusable classes, and smooth interactive hover transitions.`,
        codingTask: `Style the Day 1 developer portfolio with modern CSS variables, cards, buttons, and responsive spacing.`,
        language: "css",
        starterCode: `/* Day 2: Modern Portfolio Styles */
:root {
  --primary: #4338ca;
  --bg: #ffffff;
  --text: #0f172a;
}

body {
  font-family: system-ui, sans-serif;
  color: var(--text);
  margin: 0;
  padding: 0;
}

/* TODO: Style navigation, hero, cards, and buttons */
.btn-primary {
  background: var(--primary);
  color: #fff;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}`,
        solutionCode: `:root {
  --primary: #4338ca;
  --primary-hover: #3730a3;
  --bg: #ffffff;
  --surface: #f8fafc;
  --text: #0f172a;
  --border: #e2e8f0;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: var(--text); line-height: 1.6; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 24px; transition: transform 0.2s; }
.card:hover { transform: translateY(-3px); }
.btn { background: var(--primary); color: #fff; padding: 12px 20px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; }
.btn:hover { background: var(--primary-hover); }`,
        commonErrors: [
          "Confusing margin (spacing outside element) with padding (spacing inside element).",
          "Using overly specific cascading selectors that become unmaintainable.",
          "Failing to set `box-sizing: border-box`, causing padding to expand container widths unexpectedly."
        ],
        mentorQuestions: [
          "Are you trying to create breathing room inside the container or push sibling elements away?",
          "Can this style rule be generalized into a utility class rather than duplicated?"
        ],
        quizzes: [
          {
            q: "What does `box-sizing: border-box` do in CSS?",
            options: [
              "Draws a black border around all boxes",
              "Includes padding and border within the element's total specified width and height",
              "Restricts all boxes to square shapes",
              "Removes all margin from the element"
            ],
            answer: 1,
            explanation: "`border-box` prevents padding and borders from ballooning element dimensions beyond `width`."
          },
          {
            q: "Which property creates space INSIDE an element, between its content and its border?",
            options: ["Margin", "Padding", "Outline", "Gap"],
            answer: 1,
            explanation: "Padding is internal spacing; margin is external spacing."
          },
          {
            q: "Why are CSS Custom Properties (Variables) like `--primary: #4338ca` widely adopted?",
            options: [
              "They allow global design token consistency and enable effortless theme switching (dark/light mode)",
              "They compile directly to C++",
              "They prevent any CSS errors",
              "They are required by HTML5"
            ],
            answer: 0,
            explanation: "Variables centralize color and spacing tokens, making multi-theme styling straightforward."
          }
        ]
      },
      {
        day: 3,
        title: "Responsive Web Design",
        skill: "Flexbox, CSS Grid & Mobile-First",
        progressionStep: "RESPONSIVE",
        concept: `Websites cannot be designed only for wide monitors.
Master:
- Mobile-first CSS media queries
- Flexbox for 1-dimensional layouts (navbars, cards, button groups)
- CSS Grid for 2-dimensional grid layouts
- Relative units (rem, %, vh/vw) preventing horizontal scrolling on mobile.`,
        codingTask: `Convert the portfolio into a mobile-responsive layout that stacks cards vertically on mobile (<768px) and expands to 3 columns on desktop.`,
        language: "css",
        starterCode: `/* Day 3: Responsive Grid Layout */
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* TODO: Add media query for tablet and desktop */
@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
        solutionCode: `.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 16px;
}

@media (min-width: 640px) {
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .project-grid { grid-template-columns: repeat(3, 1fr); }
}`,
        commonErrors: [
          "Using fixed pixel widths (width: 1200px) that cause mobile screens to scroll horizontally.",
          "Writing dozens of random media queries without standardizing breakpoints.",
          "Forgetting `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` in HTML."
        ],
        mentorQuestions: [
          "What element causes the unwanted horizontal scrollbar on mobile?",
          "Should this element wrap, stack, or shrink at this specific viewport width?"
        ],
        quizzes: [
          {
            q: "What is the core philosophy of 'Mobile-First' CSS design?",
            options: [
              "Banning desktop websites entirely",
              "Writing default CSS styles for small mobile screens first, then using `min-width` media queries to progressively enhance larger viewports",
              "Designing only for iOS devices",
              "Writing HTML without any CSS"
            ],
            answer: 1,
            explanation: "Mobile-first establishes clean lean styles first, progressively scaling up with `min-width`."
          },
          {
            q: "When would you prefer CSS Grid over Flexbox?",
            options: [
              "When creating a 2-dimensional layout with rows AND columns aligned simultaneously",
              "When centering text inside a button",
              "When setting font sizes",
              "Flexbox is always better"
            ],
            answer: 0,
            explanation: "CSS Grid excels at 2D layouts (rows and columns); Flexbox is ideal for 1D distributions."
          },
          {
            q: "What unit is relative to the root `<html>` element's font size?",
            options: ["px", "em", "rem", "vh"],
            answer: 2,
            explanation: "`rem` (root em) scales relative to the root font-size, supporting user accessibility settings."
          }
        ]
      },
      {
        day: 4,
        title: "JavaScript Fundamentals",
        skill: "ES6+, Functions & Arrays",
        progressionStep: "PROGRAM",
        concept: `Programming dynamic logic:
Variables (const, let), functions, arrays, objects, conditionals, and array methods (map, filter, reduce).
Learn to break down complex tasks: Input → Process → Decision → Output.`,
        codingTask: `Build a Developer Expense Calculator. Add expenses, calculate total by category, and return summary object.`,
        language: "javascript",
        starterCode: `// Day 4: Developer Expense Calculator
function calculateExpenses(expenses) {
  // expenses: [{ title: 'Hosting', amount: 20, category: 'Dev' }]
  // TODO: Compute total and category breakdown
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  return { total };
}`,
        solutionCode: `function calculateExpenses(expenses) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const byCategory = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});
  return {
    total,
    byCategory,
    count: expenses.length,
    average: expenses.length ? Number((total / expenses.length).toFixed(2)) : 0
  };
}`,
        commonErrors: [
          "Treating numerical strings '20' as numbers, causing '20' + 10 to equal '2010'.",
          "Mutating arrays unexpectedly instead of using pure methods like `.map()` or `.filter()`.",
          "Using `var` instead of `const` and `let`, introducing scoping bugs."
        ],
        mentorQuestions: [
          "What is the exact data type stored in this variable at runtime?",
          "Can you trace the value of `acc` through each step of your `.reduce()` call?"
        ],
        quizzes: [
          {
            q: "What is the difference between `const` and `let` in modern JavaScript?",
            options: [
              "`const` prevents variable reassignment; `let` allows variable reassignment",
              "`const` is global; `let` is private",
              "`const` only stores numbers",
              "There is no difference"
            ],
            answer: 0,
            explanation: "`const` declares block-scoped bindings that cannot be reassigned."
          },
          {
            q: "What does the expression `'40' + 2` evaluate to in JavaScript?",
            options: ["42", "'402'", "NaN", "TypeError"],
            answer: 1,
            explanation: "The `+` operator coerces the number into a string and performs string concatenation."
          },
          {
            q: "Which array method creates a NEW array containing only items that satisfy a boolean predicate?",
            options: [".map()", ".forEach()", ".filter()", ".reduce()"],
            answer: 2,
            explanation: "`.filter()` returns a new array with elements that pass the test function."
          }
        ]
      },
      {
        day: 5,
        title: "DOM & Interactive Web Pages",
        skill: "DOM Events & Dynamic UI",
        progressionStep: "INTERACT",
        concept: `Connect JavaScript to HTML using the Document Object Model.
User Action → Event Listener → JavaScript State Update → DOM Mutation.
Handle click events, form submissions, dynamic item creation, and class toggling.`,
        codingTask: `Build an Interactive Task Manager that appends tasks, marks tasks complete, and updates task counters.`,
        language: "javascript",
        starterCode: `// Day 5: Task Manager Controller
class TaskManager {
  constructor() {
    this.tasks = [];
  }
  addTask(title) {
    const task = { id: Date.now(), title, completed: false };
    this.tasks.push(task);
    return task;
  }
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    return task;
  }
}`,
        solutionCode: `class TaskManager {
  constructor() { this.tasks = []; }
  addTask(title) {
    if (!title.trim()) return null;
    const task = { id: Date.now(), title: title.trim(), completed: false };
    this.tasks.push(task);
    return task;
  }
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    return task;
  }
  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    return { total, completed, pending: total - completed };
  }
}`,
        commonErrors: [
          "Forgetting `event.preventDefault()` on form submit, causing the page to reload and wipe state.",
          "Attaching event listeners before the DOM has loaded.",
          "Modifying DOM nodes directly inside massive loops instead of DocumentFragments."
        ],
        mentorQuestions: [
          "Which specific element needs to change when the user clicks 'Complete'?",
          "Does your event listener run before or after the element is injected into the DOM?"
        ],
        quizzes: [
          {
            q: "Why must `e.preventDefault()` be called inside a form's 'submit' event handler in single-page apps?",
            options: [
              "To prevent the browser's default action of reloading the page or sending an HTTP request",
              "To speed up JavaScript execution",
              "To validate password strength",
              "It is only required in Internet Explorer"
            ],
            answer: 0,
            explanation: "Default form submissions trigger full page reloads, destroying current client application state."
          },
          {
            q: "What is Event Delegation in JavaScript DOM programming?",
            options: [
              "Delegating work to a web worker thread",
              "Attaching a single event listener to a parent element to handle events triggered by current or future child elements using bubbling",
              "Assigning events in CSS",
              "Passing variables between functions"
            ],
            answer: 1,
            explanation: "Event delegation leverages DOM bubbling to manage dynamic child events efficiently."
          },
          {
            q: "What is the return value of `document.querySelector('.card')`?",
            options: [
              "The first matching element node, or null if none is found",
              "An array of all cards",
              "A boolean true/false",
              "The text content of the card"
            ],
            answer: 0,
            explanation: "`querySelector` returns the first element matching the CSS selector, or null."
          }
        ]
      },
      {
        day: 6,
        title: "APIs & Asynchronous JavaScript",
        skill: "Fetch, Async/Await & Error Handling",
        progressionStep: "CONNECT",
        concept: `Fetch remote data over HTTP:
Frontend → Request → Server → JSON → UI Update.
Master:
- Promises & async/await
- Status codes (200 OK, 404 Not Found, 500 Server Error)
- Managing 3 mandatory UI states: Loading, Success, and Error.`,
        codingTask: `Build a resilient API data fetcher with try/catch, loading indicator state, and user-friendly error banners.`,
        language: "javascript",
        starterCode: `// Day 6: Async API Client
async function fetchCourseData(apiUrl) {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('HTTP Error: ' + res.status);
    const data = await res.json();
    return { status: 'success', data };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
}`,
        solutionCode: `async function fetchCourseData(apiUrl, timeoutMs = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error('API returned status ' + res.status);
    const data = await res.json();
    return { success: true, data, error: null };
  } catch (err) {
    clearTimeout(id);
    return { success: false, data: null, error: err.name === 'AbortError' ? 'Request timed out' : err.message };
  }
}`,
        commonErrors: [
          "Trying to read `.json()` or data properties synchronously before `await fetch()` finishes.",
          "Assuming HTTP error status codes (like 404 or 500) automatically throw errors in `fetch()`.",
          "Forgetting to render a visible loading state or error message for slow network connections."
        ],
        mentorQuestions: [
          "At what exact point in your code is the JSON payload actually resolved and accessible?",
          "What will the user see on screen if the backend server is offline or times out?"
        ],
        quizzes: [
          {
            q: "Does `fetch()` reject its Promise when the server responds with a 404 or 500 status code?",
            options: [
              "No, `fetch()` only rejects on network failures or CORS errors; you must check `response.ok` manually",
              "Yes, any status >= 400 automatically triggers the catch block",
              "Only on mobile devices",
              "Only if JSON parsing fails"
            ],
            answer: 0,
            explanation: "`fetch()` resolves successfully as long as an HTTP response was received, regardless of status code."
          },
          {
            q: "What is the purpose of the `await` keyword?",
            options: [
              "Pauses async function execution until a Promise settles (resolves or rejects)",
              "Slows down execution to prevent crashes",
              "Turns synchronous functions into threads",
              "Waits for user mouse clicks"
            ],
            answer: 0,
            explanation: "`await` unwraps the resolved value of a Promise in a clean linear syntax."
          },
          {
            q: "What format does `response.json()` return?",
            options: [
              "A Promise that resolves to the parsed JavaScript object",
              "A raw string of JSON characters",
              "A binary buffer",
              "An HTML DOM tree"
            ],
            answer: 0,
            explanation: "`.json()` returns a Promise that asynchronously parses the response body as JSON."
          }
        ]
      },
      {
        day: 7,
        title: "Git & GitHub",
        skill: "Version Control & Collaboration",
        progressionStep: "VERSION",
        concept: `Version control is the bedrock of professional software development:
git init → git add → git commit -m "feat: ..." → git push.
Learn branch management, merge conflicts, .gitignore rules, and writing meaningful documentation in README.md.`,
        codingTask: `Initialize git repository, configure .gitignore, stage project files, create conventional commits, and publish README.`,
        language: "markdown",
        starterCode: `# Project Name: SkillSprint Platform
## Overview
A web-based interactive career learning platform.

## Features
- Interactive 14-day practical sprints
- Code playground & automated feedback
- Progress tracking and persistent storage

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\``,
        solutionCode: `# SkillSprint — Modern Web Learning Platform

## Architecture
- Frontend: React 18, Vite, Lucide Icons
- Backend: Django REST Framework / Express API
- Persistence: PostgreSQL / SQLite with SimpleJWT auth

## Installation & Setup
\`\`\`bash
git clone https://github.com/skillsprint/skillpath.git
cd skillpath/frontend
npm install
npm run dev
\`\`\`

## Testing
Run test suite:
\`\`\`bash
npm test
\`\`\``,
        commonErrors: [
          "Committing sensitive files like `.env` with API keys or `node_modules/` folders.",
          "Writing vague commit messages like 'fixed stuff' or 'update'.",
          "Confusing the local git repository on your machine with remote GitHub hosting."
        ],
        mentorQuestions: [
          "If a production bug was introduced yesterday, how could `git log` and `git diff` pinpoint the exact defect?",
          "Are there any secret environment credentials in your repository that should be in `.gitignore`?"
        ],
        quizzes: [
          {
            q: "What is the primary function of the `.gitignore` file?",
            options: [
              "Specifies intentionally untracked files (such as node_modules, .env, and build artifacts) that Git should ignore",
              "Hides the repository from GitHub search",
              "Prevents other developers from contributing",
              "Deletes files when pushing to remote"
            ],
            answer: 0,
            explanation: "`.gitignore` prevents committing local dependencies, build caches, and sensitive environment secrets."
          },
          {
            q: "What command creates a new isolated feature branch and switches to it in one step?",
            options: ["git checkout -b feature-auth (or git switch -c feature-auth)", "git branch feature-auth", "git merge feature-auth", "git push feature-auth"],
            answer: 0,
            explanation: "`git checkout -b <branch>` or `git switch -c <branch>` creates and checks out the new branch."
          },
          {
            q: "What is a Pull Request (PR) on GitHub?",
            options: [
              "A request asking GitHub for more disk space",
              "A proposed set of code changes from a branch submitted for code review, discussion, and testing before merging into main",
              "Downloading a file to local disk",
              "A Git command that pulls remote commits"
            ],
            answer: 1,
            explanation: "Pull Requests facilitate peer code reviews, continuous integration checks, and collaborative discussion."
          }
        ]
      },
      {
        day: 8,
        title: "Frontend Development with React",
        skill: "Components, Props & State",
        progressionStep: "BUILD UI",
        concept: `Component-driven architecture:
JSX + Props (data in) + State (reactive local data) = Declarative UI.
Learn useState, useEffect, passing callbacks as props, conditional rendering, and rendering dynamic lists with unique key attributes.`,
        codingTask: `Build a React Course Dashboard component rendering course cards, filter tags, and progress bar using useState.`,
        language: "javascript",
        starterCode: `// Day 8: React Course Dashboard Component
import React, { useState } from 'react';

export default function CourseDashboard({ courses }) {
  const [filter, setFilter] = useState('All');
  
  // TODO: Filter courses by category and calculate total progress
  const filtered = filter === 'All' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <div>
      <h2>Courses ({filtered.length})</h2>
      {/* Render course cards */}
    </div>
  );
}`,
        solutionCode: `import React, { useState, useMemo } from 'react';

export default function CourseDashboard({ courses = [] }) {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    return filter === 'All' ? courses : courses.filter(c => c.category === filter);
  }, [courses, filter]);

  const avgProgress = useMemo(() => {
    if (!courses.length) return 0;
    return Math.round(courses.reduce((s, c) => s + (c.progress || 0), 0) / courses.length);
  }, [courses]);

  return (
    <div className="course-dashboard">
      <header>
        <h2>Your Learning Path ({avgProgress}% Complete)</h2>
        <div className="filter-tabs">
          {['All', 'Web', 'Data', 'Cloud'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'active' : ''}>
              {cat}
            </button>
          ))}
        </div>
      </header>
      <div className="course-grid">
        {filtered.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.progress || 0}% completed</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        commonErrors: [
          "Mutating state directly (e.g. `state.count = 5`) instead of calling the setter function `setCount(5)`.",
          "Using non-unique list array indices as keys in dynamic lists.",
          "Triggering infinite loops by setting state inside `useEffect` without proper dependency arrays."
        ],
        mentorQuestions: [
          "Which specific piece of reactive data triggers the UI to re-render when a user clicks this filter?",
          "Could this repeated UI pattern be extracted into its own modular child component?"
        ],
        quizzes: [
          {
            q: "Why must React state never be mutated directly (e.g. `user.name = 'Alex'`)?",
            options: [
              "Direct mutation bypasses React's virtual DOM reconciliation and does not trigger component re-renders",
              "JavaScript forbids mutating object properties",
              "It deletes the entire component from memory",
              "React only allows read-only variables"
            ],
            answer: 0,
            explanation: "React relies on referential inequality (`setter` calls) to schedule efficient re-renders."
          },
          {
            q: "What is the purpose of the `key` prop when rendering lists in React?",
            options: [
              "It encrypts the list item data",
              "It provides a stable identifier so React's diffing algorithm can track which items were added, changed, or removed",
              "It sets the font size of the item",
              "It connects the item to an API"
            ],
            answer: 1,
            explanation: "Unique keys prevent unnecessary re-mounting and retain correct state during list re-ordering."
          },
          {
            q: "What does an empty dependency array `[]` mean in `useEffect(() => {}, [])`?",
            options: [
              "The effect runs only once after the initial component mount",
              "The effect never runs",
              "The effect runs on every single render",
              "The effect runs when the page is closed"
            ],
            answer: 0,
            explanation: "An empty dependency array instructs React to execute the effect only on initial mount."
          }
        ]
      },
      {
        day: 9,
        title: "Backend Development",
        skill: "Server Architecture & Express/Node",
        progressionStep: "BUILD SERVER",
        concept: `Moving beyond the browser sandbox:
Frontend (Client) → HTTP Request → Server (Node/Express or Django) → Processing → HTTP Response.
Learn routes, middleware, request params/body, JSON response structures, and proper status codes.`,
        codingTask: `Build a modular Course REST backend service handling GET /api/courses and POST /api/courses.`,
        language: "javascript",
        starterCode: `// Day 9: Express REST Server
const express = require('express');
const app = express();
app.use(express.json());

let courses = [
  { id: 1, title: 'HTML Foundations', category: 'Web' }
];

app.get('/api/courses', (req, res) => {
  res.json({ courses });
});

app.post('/api/courses', (req, res) => {
  // TODO: Validate body and append course
});`,
        solutionCode: `const express = require('express');
const app = express();
app.use(express.json());

let courses = [
  { id: 1, title: 'HTML Foundations', category: 'Web' }
];

app.get('/api/courses', (req, res) => {
  res.json({ success: true, count: courses.length, courses });
});

app.post('/api/courses', (req, res) => {
  const { title, category } = req.body;
  if (!title || !category) {
    return res.status(400).json({ success: false, error: 'Title and category required' });
  }
  const newCourse = { id: Date.now(), title, category };
  courses.push(newCourse);
  res.status(201).json({ success: true, course: newCourse });
});`,
        commonErrors: [
          "Forgetting `app.use(express.json())` middleware, causing `req.body` to be undefined.",
          "Sending HTTP 200 OK when a resource was created (should be 201) or when validation fails (should be 400).",
          "Sending multiple responses for a single request (`headers already sent` error)."
        ],
        mentorQuestions: [
          "Which HTTP verb and status code represents successfully creating a new resource?",
          "What should the server return when the requested course ID does not exist?"
        ],
        quizzes: [
          {
            q: "What HTTP status code should a REST API return when a client attempts to access an endpoint that does not exist?",
            options: ["200 OK", "404 Not Found", "500 Internal Server Error", "301 Moved Permanently"],
            answer: 1,
            explanation: "404 Not Found signifies that the requested endpoint resource cannot be located."
          },
          {
            q: "What does middleware in Express do?",
            options: [
              "Functions that have access to the request (`req`), response (`res`), and `next` function in the application's request-response cycle",
              "Connects cables between physical computers",
              "Compiles JavaScript into machine assembly",
              "Manages CSS flexbox layouts"
            ],
            answer: 0,
            explanation: "Middleware intercepts requests to execute authentication, logging, body parsing, and route guards."
          },
          {
            q: "Why is `POST` used instead of `GET` when submitting new data to a server?",
            options: [
              "`POST` sends data in the request body without character length limits or URL exposure, and is non-idempotent",
              "`POST` is only used for sending emails",
              "`GET` is disabled in modern HTTP",
              "`POST` encrypts all data automatically"
            ],
            answer: 0,
            explanation: "`GET` is for idempotent retrieval; `POST` transmits payload data in the body to modify server state."
          }
        ]
      },
      {
        day: 10,
        title: "REST API & Frontend-Backend Connection",
        skill: "Full-Stack API Integration",
        progressionStep: "CONNECT API",
        concept: `Connect the React UI to your backend server:
USER → React Component → Axios/Fetch HTTP Request → Backend API → JSON Response → React State Update.
Master CORS (Cross-Origin Resource Sharing), request headers, error status banners, and optimistic UI updates.`,
        codingTask: `Connect the React course list to the backend API with loading spinner, retry button on error, and automatic state refresh.`,
        language: "javascript",
        starterCode: `// Day 10: Connected React Component
import React, { useState, useEffect } from 'react';

export default function ConnectedCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch from /api/courses and update state
  }, []);

  return <div>{loading ? 'Loading...' : 'Loaded'}</div>;
}`,
        solutionCode: `import React, { useState, useEffect } from 'react';

export default function ConnectedCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/courses/');
      if (!res.ok) throw new Error('Backend returned status ' + res.status);
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend service');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCourses(); }, []);

  if (loading) return <div className="loader">Connecting to API...</div>;
  if (error) return <div className="alert alert-error">{error} <button onClick={loadCourses}>Retry</button></div>;

  return (
    <ul className="course-list">
      {courses.map(c => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}`,
        commonErrors: [
          "Calling the wrong port or URL (e.g. calling `http://localhost:3000` when backend runs on `8000`), triggering CORS errors.",
          "Updating unmounted component state when user navigates away before fetch completes.",
          "Failing to handle backend JSON error messages gracefully."
        ],
        mentorQuestions: [
          "What exact HTTP request is your frontend firing in the browser Network tab?",
          "If the backend returns a 500 error, where in the React component does that error get communicated to the user?"
        ],
        quizzes: [
          {
            q: "What is CORS (Cross-Origin Resource Sharing)?",
            options: [
              "A security mechanism enforced by browsers that restricts web pages from making requests to a different domain/port than the one that served it unless explicitly permitted",
              "A CSS framework for responsive tables",
              "A cloud database provider",
              "An encryption protocol for email"
            ],
            answer: 0,
            explanation: "CORS is a browser security protocol preventing unauthorized cross-origin HTTP requests."
          },
          {
            q: "How does a Vite dev proxy solve local development CORS issues?",
            options: [
              "It forwards frontend requests starting with `/api` to the backend server running on another port, making them appear same-origin to the browser",
              "It turns off all internet security",
              "It compiles backend code into the browser",
              "It stores data in local cookies"
            ],
            answer: 0,
            explanation: "Proxies make API requests appear same-origin, completely circumventing local browser CORS blocks."
          },
          {
            q: "What header tells the server that the client is sending JSON in the request body?",
            options: [
              "`Content-Type: application/json`",
              "`Accept-Encoding: gzip`",
              "`User-Agent: Mozilla`",
              "`Cache-Control: no-cache`"
            ],
            answer: 0,
            explanation: "`Content-Type: application/json` informs the backend body-parser to deserialize the incoming payload as JSON."
          }
        ]
      },
      {
        day: 11,
        title: "Database & CRUD Operations",
        skill: "PostgreSQL, SQLite & ORM",
        progressionStep: "STORE DATA",
        concept: `Moving beyond ephemeral in-memory storage to persistent relational databases.
CRUD: Create, Read, Update, Delete.
Master tables, primary keys, foreign key relationships, database migrations, and queries via ORM (Django ORM / Prisma / Sequelize).`,
        codingTask: `Define database model schema and execute persistent CRUD operations with parameterized queries / ORM.`,
        language: "python",
        starterCode: `# Day 11: Persistent Model Operations
# Django ORM / Data Layer simulation
def get_user_progress(user_id, database_records):
    # TODO: Filter user records, calculate completion percentage
    pass`,
        solutionCode: `def get_user_progress(user_id, records):
    user_records = [r for r in records if r.get("user_id") == user_id]
    total = len(user_records)
    completed = sum(1 for r in user_records if r.get("completed"))
    pct = round((completed / total * 100), 1) if total > 0 else 0
    return {
        "user_id": user_id,
        "total_tasks": total,
        "completed_tasks": completed,
        "progress_pct": pct
    }`,
        commonErrors: [
          "Executing raw string concatenation in SQL queries, opening critical SQL Injection vulnerabilities.",
          "Forgetting to run database migrations after modifying model schemas.",
          "Calling database queries inside loops (the N+1 query performance anti-pattern)."
        ],
        mentorQuestions: [
          "How does your database schema uniquely identify individual records?",
          "What happens if your API attempts to update a record ID that does not exist in the database?"
        ],
        quizzes: [
          {
            q: "What is a Primary Key in a relational database?",
            options: [
              "The password required to log into the database server",
              "A unique attribute or column that distinctively identifies every single row/record in a table",
              "The first column displayed on the screen",
              "An encrypted backup file"
            ],
            answer: 1,
            explanation: "Primary keys enforce uniqueness and integrity for every individual record in a table."
          },
          {
            q: "What is the primary danger of SQL Injection?",
            options: [
              "Attackers inject malicious SQL into input fields to read, modify, or delete the entire database",
              "It causes the frontend to display broken CSS",
              "It increases database server electric bills",
              "It prevents users from uploading profile photos"
            ],
            answer: 0,
            explanation: "Unsanitized user inputs in queries can execute unauthorized arbitrary SQL commands."
          },
          {
            q: "What is the role of an ORM (Object-Relational Mapper) like Django ORM or Prisma?",
            options: [
              "It allows developers to interact with database tables using native language objects instead of writing raw SQL",
              "It replaces the need for a database",
              "It draws vector diagrams of tables",
              "It converts databases into Excel files"
            ],
            answer: 0,
            explanation: "ORMs abstract database operations into type-safe object methods while sanitizing queries against injection."
          }
        ]
      },
      {
        day: 12,
        title: "Authentication & Application Security",
        skill: "JWT Tokens & Password Hashing",
        progressionStep: "AUTHENTICATE",
        concept: `Authentication (Who are you?) vs Authorization (What are you allowed to do?).
Master:
- Secure password hashing (bcrypt / PBKDF2)
- JWT (JSON Web Tokens): access tokens (short-lived) + refresh tokens (long-lived)
- Protecting backend endpoints with authorization middleware
- Storing secrets in environment variables (.env).`,
        codingTask: `Build a JWT verification middleware that checks Authorization header, verifies signature, and attaches req.user.`,
        language: "javascript",
        starterCode: `// Day 12: JWT Verification Middleware
function verifyAuthToken(authHeader, secretKey) {
  // TODO:
  // 1. Check if authHeader exists and starts with 'Bearer '
  // 2. Extract token
  // 3. Verify signature
  // 4. Return decoded user payload or error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, error: 'Missing or malformed Authorization header' };
  }
  const token = authHeader.split(' ')[1];
  return { authenticated: true, token };
}`,
        solutionCode: `function verifyAuthToken(authHeader, secretKey) {
  if (!authHeader || typeof authHeader !== 'string') {
    return { authenticated: false, status: 401, error: 'Authorization header required' };
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return { authenticated: false, status: 401, error: 'Format must be Bearer <token>' };
  }
  const token = parts[1];
  if (!token || token.length < 10) {
    return { authenticated: false, status: 401, error: 'Invalid token structure' };
  }
  return {
    authenticated: true,
    status: 200,
    user: { id: 1, username: 'learner', role: 'student' }
  };
}`,
        commonErrors: [
          "Storing passwords in plain text without cryptographic hashing (bcrypt/Argon2).",
          "Putting sensitive secrets directly in public JWT payloads (JWT payloads are Base64 encoded, NOT encrypted).",
          "Hardcoding secret keys or API credentials into git repository files."
        ],
        mentorQuestions: [
          "Can an unauthorized user bypass your React route guards and hit your backend API endpoints directly via cURL?",
          "Why is a JWT payload easily readable by anyone who inspects network traffic?"
        ],
        quizzes: [
          {
            q: "Can the payload of a standard JSON Web Token (JWT) be read by anyone who inspects it?",
            options: [
              "Yes! JWTs are signed to prevent tampering, but the payload is merely Base64URL encoded, NOT encrypted",
              "No, JWTs are encrypted with AES-256 and unreadable without the secret",
              "Only by users with admin privileges",
              "Only on HTTPS connections"
            ],
            answer: 0,
            explanation: "JWTs provide integrity and authenticity, not confidentiality. Never put passwords or credit cards in them."
          },
          {
            q: "Why should passwords never be hashed with plain MD5 or SHA-256?",
            options: [
              "They are too fast and vulnerable to precomputed rainbow table attacks; slow salt-based algorithms like bcrypt or PBKDF2 are required",
              "MD5 cannot hash letters",
              "SHA-256 produces negative numbers",
              "Browsers do not support SHA-256"
            ],
            answer: 0,
            explanation: "General-purpose hashes are designed to be fast; password hashing requires computationally slow algorithms with salts."
          },
          {
            q: "What is the difference between Authentication and Authorization?",
            options: [
              "Authentication verifies identity (who you are); Authorization verifies permissions (what you are allowed to access)",
              "They are exact synonyms",
              "Authentication is handled in CSS; Authorization is handled in SQL",
              "Authorization must happen before Authentication"
            ],
            answer: 0,
            explanation: "Authentication establishes identity; authorization grants or denies access to specific resources."
          }
        ]
      },
      {
        day: 13,
        title: "Full-Stack Integration",
        skill: "End-to-End System Integration",
        progressionStep: "INTEGRATE",
        concept: `System thinking: Bringing all layers together into a production unit:
React Client (Vite)
       ↓
REST API (Django / Express)
       ↓
Database (PostgreSQL / SQLite)
       ↓
JWT Authentication & CORS Security.
Perform integration testing across all flows, error states, and responsive viewports.`,
        codingTask: `Perform end-to-end integration audit checking login, roadmap progress sync, and portfolio generation.`,
        language: "javascript",
        starterCode: `// Day 13: Full-Stack Integration Health Check
async function auditPlatformHealth() {
  // TODO: Check auth endpoint, user plan endpoint, and roadmap endpoint
  return {
    auth_service: 'ONLINE',
    database: 'CONNECTED',
    api_latency_ms: 18
  };
}`,
        solutionCode: `async function auditPlatformHealth() {
  return {
    status: 'SYSTEM_HEALTHY',
    services: {
      auth: { endpoint: '/api/auth/me/', status: 200, healthy: true },
      plans: { endpoint: '/api/plans/', status: 200, healthy: true },
      roadmaps: { endpoint: '/api/roadmaps/progress/', status: 200, healthy: true },
      portfolio: { endpoint: '/api/portfolio/', status: 200, healthy: true }
    },
    timestamp: new Date().toISOString()
  };
}`,
        commonErrors: [
          "Assuming all microservices will always respond within 50ms without timeout fallbacks.",
          "Failing to handle database disconnection errors gracefully.",
          "Missing automated regression checks before tagging release versions."
        ],
        mentorQuestions: [
          "What happens to the frontend user experience if the database drops connection for 10 seconds?",
          "Can another developer set up and run your integrated stack from scratch using only your README?"
        ],
        quizzes: [
          {
            q: "What is an End-to-End (E2E) integration test?",
            options: [
              "Testing a single isolated function in JavaScript",
              "Testing the entire application flow from user interface actions through backend APIs down to database persistence",
              "Testing computer monitor cables",
              "Checking HTML syntax validity only"
            ],
            answer: 1,
            explanation: "E2E testing verifies that all decoupled layers communicate and perform correctly together."
          },
          {
            q: "Why is environment variable configuration (`.env`) essential in full-stack architecture?",
            options: [
              "It isolates configuration (database URLs, ports, API secrets) from code, allowing different configs in dev vs production without code changes",
              "It makes JavaScript compile to WebAssembly",
              "It speeds up React rendering",
              "It prevents user logins"
            ],
            answer: 0,
            explanation: "Decoupling config from codebase adheres to 12-factor application standards."
          },
          {
            q: "What does an HTTP 500 status code communicate to the frontend?",
            options: [
              "The client entered an invalid email",
              "An unhandled internal error occurred on the backend server while processing the request",
              "The user was logged out",
              "The requested image was not found"
            ],
            answer: 1,
            explanation: "500 indicates unexpected server-side execution failure."
          }
        ]
      },
      {
        day: 14,
        title: "Deployment, Portfolio & Final Capstone",
        skill: "Production Deployment & Proof",
        progressionStep: "DEPLOY + SHOW PROOF",
        concept: `Deploy your full-stack application to the web:
- Build optimized production bundle (npm run build)
- Configure production static asset caching
- Set up continuous deployment (Vercel / Netlify / Render / Docker)
- Publish a portfolio case study demonstrating architecture, metrics, and proof of work.`,
        codingTask: `Build the production bundle, verify clean compilation, and generate the final cryptographic proof-of-competence artifact.`,
        language: "javascript",
        starterCode: `// Day 14: Final Capstone Deployment Verification
function verifyCapstoneDeployment(projectMeta) {
  // TODO: Validate repo, README, production URL, and test results
  return {
    ready_for_production: true,
    portfolio_status: 'VERIFIED'
  };
}`,
        solutionCode: `function verifyCapstoneDeployment(projectMeta) {
  const checklist = {
    has_git_repo: Boolean(projectMeta.repoUrl),
    has_live_demo: Boolean(projectMeta.liveUrl),
    has_readme: true,
    tests_passing: true,
    lighthouse_score: 98
  };
  return {
    ready_for_production: Object.values(checklist).every(Boolean),
    checklist,
    certificate_id: "SS-CERT-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    issued_date: new Date().toLocaleDateString()
  };
}`,
        commonErrors: [
          "Deploying development builds with console.log statements and unminified bundles.",
          "Hardcoding `http://localhost:8000` URLs into production frontend code.",
          "Neglecting to configure production SPA fallback routing for client-side URLs."
        ],
        mentorQuestions: [
          "Can an engineering hiring manager visit your live deployed URL and test all features without assistance?",
          "What is one technical trade-off you made during this 14-day sprint, and how would you evolve it in version 2?"
        ],
        quizzes: [
          {
            q: "Why is a production build (`npm run build`) required before deploying a React application?",
            options: [
              "It transpiles, tree-shakes, minifies, and bundles JavaScript and CSS into highly optimized static assets for fast global delivery",
              "It deletes the source code to save hard drive space",
              "It installs a web server on the client's laptop",
              "It is required by the browser to run HTML"
            ],
            answer: 0,
            explanation: "Production builds strip dev overhead, bundle dependencies, and minify code for low latency."
          },
          {
            q: "In single-page applications (SPAs), why must the production web server redirect all unknown paths back to `index.html`?",
            options: [
              "Because client-side routing (React Router) needs `index.html` to load first so JavaScript can inspect the browser URL and render the appropriate page",
              "To prevent anyone from hacking the server",
              "Because SPAs only have one file",
              "It is an outdated 1990s requirement"
            ],
            answer: 0,
            explanation: "Without SPA fallback rewrites, refreshing a route like `/portfolio` returns a 404 from static servers."
          },
          {
            q: "What is the single most valuable asset a junior developer brings to an engineering interview?",
            options: [
              "Memorized syntax definitions from a textbook",
              "A deployed, verifiable portfolio project demonstrating problem solving, clean code, and working software",
              "A long list of tutorials watched on YouTube",
              "A claim that they never write any bugs"
            ],
            answer: 1,
            explanation: "Working software and thoughtful trade-off rationale are the definitive evidence of competence."
          }
        ]
      }
    ]
  }
};
