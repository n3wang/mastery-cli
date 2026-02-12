# High-Quality Flashcards: 009---Fundamentals-of-Enterprise-Architecture_processed (Part 24)

**Starting Chapter:** Map Capability Gaps

---

#### Identify Capabilities in Enterprise Architecture
This step of the enterprise architecture assessment framework involves defining the capabilities needed to achieve desired business outcomes related to enterprise architecture functions and practices. It builds upon the architectural domain model discussed in Chapter 8, focusing on people (culture), process, and tools.

:p What are the three broad categories used to define capabilities in an enterprise architecture context?
??x
The three broad categories are:
1. **People (Culture)** – Refers to the talent, skills, roles, and organizational culture required for effective enterprise architecture.
2. **Process** – Refers to the defined workflows, standards, governance processes, and practices that support enterprise architecture.
3. **Tools** – Refers to the software, platforms, automation, and technical infrastructure used to implement and manage enterprise architecture.

These categories help in structuring a capability model that aligns with business outcomes such as cloud migration.
x??

---

#### Capability Model for Cloud Migration
When an organization is transforming to cloud technology, its enterprise architecture must support rapid and cost-efficient application migration. The capability model must be tailored to include specific skills, processes, and tools relevant to cloud architecture.

:p What tailored capabilities are required for cloud migration in enterprise architecture?
??x
The tailored capabilities include:

**People:**
- Cloud application architecture
- Cloud engineering
- Cloud certification

**Process:**
- Cloud governance
- Cloud application standards
- Cloud application modernization disposition framework
- FinOps standards
- Resiliency standards
- Cloud configuration management using enterprise architecture metamodel
- Cloud network management
- Cloud monitoring
- Cloud security

**Tools:**
- Cost management
- Cloud billing
- Cloud service discovery
- Software-defined networking
- Cloud provisioning
- Cloud automation
- Cloud policy controls

These capabilities ensure the organization can effectively execute and manage cloud-based initiatives.
x??

---

#### Mapping Capability Gaps
After identifying the necessary capabilities, the next step is to perform a gap analysis. This involves evaluating whether the current state of people, process, and tools supports the desired outcomes and identifying deficiencies.

:p What are the key questions to ask during a capability gap analysis?
??x
Key questions include:

1. **People:**
   - Are they staffed with the right talent and skill sets?
   - Is the organization structured to use that talent effectively?

2. **Process:**
   - Are there well-defined and clear architecture standards?
   - Are architecture processes easy to follow?
   - Is architecture information readily available?
   - Are architecture templates reusable?

3. **Tools:**
   - Are there automated tools to support architecture standards and processes?
   - Is architecture governance automated?

These questions help assess whether current capabilities align with required ones and where improvements are needed.
x??

---

#### Prioritizing Capability Gaps
Once capability gaps are identified, they must be prioritized based on two factors: impact and effort.

:p How should capability gaps be prioritized in enterprise architecture?
??x
Capability gaps should be prioritized using the following criteria:

1. **Impact** – Determine which gaps, if remediated, would provide the greatest benefit to achieving business outcomes.
2. **Effort** – Estimate the work required to solve each gap.

This can be visualized using a prioritization matrix:
$$
\text{Priority} = f(\text{Impact}, \text{Effort})
$$

Example pseudocode:
```pseudocode
for each gap in gaps:
    if impact[gap] > threshold and effort[gap] < threshold:
        prioritize(gap, HIGH)
    else if impact[gap] > threshold:
        prioritize(gap, MEDIUM)
    else:
        prioritize(gap, LOW)
```

This approach helps focus resources on the most impactful and feasible improvements.
x??

---

#### Enterprise Architecture Functions and Capabilities
Enterprise architecture functions are defined as strategy, enablement, and oversight. Each requires specific capabilities to be effective.

:p What are the enterprise architecture functions and what capabilities do they require?
??x
The three enterprise architecture functions are:

1. **Strategy** – Defines the direction and alignment of architecture with business goals.
   - Capabilities: Strategic planning, architecture vision, business alignment

2. **Enablement** – Ensures architecture is implemented and used effectively.
   - Capabilities: Architecture standards, architecture delivery, tool support

3. **Oversight** – Monitors and ensures compliance with architecture practices.
   - Capabilities: Governance, compliance, metrics, reporting

These functions must be supported by tailored capabilities across people, process, and tools to be successful.
x??

---

---

#### Capability Gap Analysis Framework
Capability gap analysis is a structured method used to assess an organization’s current capabilities against desired outcomes, particularly in the context of enterprise architecture. It involves quantifying the impact and effort required to bridge gaps using a scoring scale. This framework helps prioritize investments by identifying which capabilities offer the highest return on investment (ROI) in terms of business benefits and resource effort.

The scoring scale assigns values from 1 to 5 for both impact and effort:
- **Impact** ranges from low (1) to high (5), indicating how transformative or beneficial a capability improvement would be.
- **Effort** also ranges from low (1) to high (5), reflecting the time and labor needed to implement changes.

This approach allows decision-makers to prioritize initiatives based on value and feasibility.

:p What is the purpose of using a scoring scale in capability gap analysis?
??x
The purpose of using a scoring scale in capability gap analysis is to quantify and compare the potential impact and required effort of different capabilities. This enables organizations to make informed decisions about where to invest resources, focusing on those with high impact and manageable effort. For example, a capability with an impact score of 5 and effort score of 3 would be prioritized over one with impact 2 and effort 4, assuming all other factors are equal. The scoring system provides a consistent basis for decision-making and avoids subjective judgments.
x??

---

#### Outcome-Based Capability Model
An outcome-based capability model starts with defining shared business outcomes and traces them directly to enterprise architecture efforts. This method ensures that the enterprise architecture strategy aligns with actual business goals rather than relying solely on maturity models, which can be static and contextually limited.

:p Why is an outcome-based approach preferred over maturity models in enterprise architecture?
??x
An outcome-based approach is preferred over maturity models because maturity models are often static, lack contextual relevance, and may oversimplify complex environments. In contrast, an outcome-based model connects architectural efforts directly to business outcomes, making the value proposition clearer and more actionable. It allows organizations to focus on what matters most—delivering business value—rather than just assessing where they stand in a generic maturity framework.
x??

---

#### Enterprise Architecture Strategy Development
After completing the capability gap analysis, the next step is to build an enterprise architecture strategy. This involves using insights from the assessment to define a roadmap for capability development that aligns with business outcomes and strategic priorities.

:p How does capability gap analysis contribute to building an enterprise architecture strategy?
??x
Capability gap analysis contributes to building an enterprise architecture strategy by identifying the most critical capabilities that need development. These insights guide the creation of a targeted roadmap, ensuring that investments are aligned with business outcomes and priorities. By focusing on high-impact, manageable efforts, organizations can develop a coherent and practical strategy that delivers measurable value while avoiding resource waste on less critical initiatives.
x??

---

#### Contextualizing Enterprise Architecture
Contextualizing enterprise architecture means understanding the business strategy, growth opportunities, and capabilities. It involves aligning architecture with business needs and ensuring that technology supports business outcomes. It's broader than IT and includes people, processes, and tools.

:p Why is contextualizing enterprise architecture important?
??x
Contextualizing is important because it ensures enterprise architecture aligns with business needs, enabling holistic strategies that support business outcomes through technology. It avoids siloed decision-making and supports alignment across all enterprise aspects.
x??

---

#### Business Capabilities and Enterprise Architecture
Business capabilities are the competencies needed to deliver products and services to customers. Enterprise architecture owns the business capability model, which maps these capabilities and helps identify gaps between current and desired outcomes.

:p What role does enterprise architecture play in business capabilities?
??x
Enterprise architecture owns and maintains the business capability model, which identifies necessary capabilities to support business outcomes. It also helps identify capability gaps and supports strategic alignment.
x??

---

#### SWOT Analysis in Enterprise Architecture
A SWOT analysis helps assess the internal and external factors affecting enterprise architecture. It includes strengths, weaknesses, opportunities, and threats. Conducting a SWOT analysis involves collaboration with stakeholders from business, technology, operations, and compliance.

:p What is the purpose of conducting a SWOT analysis in enterprise architecture?
??x
The purpose is to assess internal and external factors affecting enterprise architecture. It helps identify strengths, weaknesses, opportunities, and threats to guide strategic planning and stakeholder alignment.
x??

---

#### Principles Behind Enterprise Architecture Strategy
Key principles include: creating shared alignment, embedding architecture information, enabling standards, and instilling proactive and reactive architecture decisions. These principles support a dynamic and effective enterprise architecture function.

:p What are the core principles of enterprise architecture strategy?
??x
The core principles are: 1) Create shared alignment, 2) Make architecture information embedded and accessible, 3) Enable and enforce standards, and 4) Instill proactive and reactive architecture decisions. These support alignment, usability, governance, and adaptability.
x??

---

#### Continuous Improvement in Enterprise Architecture
Continuous improvement involves iteratively enhancing enterprise architecture practices based on feedback and performance metrics. It aligns with OKRs and ensures architecture evolves with business needs.

:p How does continuous improvement support enterprise architecture?
??x
Continuous improvement ensures enterprise architecture evolves with business needs by regularly assessing performance, identifying gaps, and refining practices. It supports alignment with strategic objectives and improves delivery outcomes.
x??

---

#### Aligning Architecture with Business Outcomes
Enterprise architecture must align with business outcomes by understanding business capabilities, goals, and growth strategies. This alignment ensures that architectural decisions support measurable business value.

:p Why is alignment between enterprise architecture and business outcomes important?
??x
Alignment ensures that architectural decisions support business goals and deliver measurable outcomes. It prevents siloed thinking and ensures that technology investments contribute directly to business value.
x??

---

#### Architecture Decisioning and Standards
Architecture decisioning includes standards, templates, processes, and tools that guide software delivery. Effective standards must be easy to follow and enforced through governance to ensure compliance.

:p What are the key components of architecture decisioning?
??x
Architecture decisioning includes standards, templates, processes, and tools that guide software delivery. Effective standards must balance ease of adherence with governance to ensure compliance and consistency.
x??

---

#### Tangible Direction vs. Stale Documentation
Tangible direction refers to architecture information that is integrated into software delivery processes and is accessible to teams. Stale documentation is outdated and not used in practice.

:p How does embedding architecture information improve enterprise architecture?
??x
Embedding architecture information ensures it is accessible and usable in daily delivery processes, making it tangible and actionable. This avoids stale documentation and supports real-time decision-making.
x??

---

