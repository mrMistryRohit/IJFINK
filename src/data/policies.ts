export type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export type PolicySection = {
  id: string;
  title: string;
  summary?: string;
  blocks: PolicyBlock[];
};

export const policySections: PolicySection[] = [
  {
    id: "copyright",
    title: "Copyright",
    blocks: [
      { type: "paragraph", text: "Authors retain copyright of their published work." },
      {
        type: "paragraph",
        text: "By submitting a manuscript and upon acceptance for publication, authors grant IJFINK a non-exclusive license to publish, archive and disseminate the article in electronic formats.",
      },
      {
        type: "paragraph",
        text: "Authors warrant that:",
      },
      {
        type: "bullets",
        items: [
          "The submitted work is original.",
          "Necessary permissions have been obtained for third-party materials.",
          "The manuscript does not infringe upon any copyright or intellectual property rights.",
        ],
      },
      {
        type: "paragraph",
        text: "Proper acknowledgment must be given when reproducing or citing published materials from IJFINK.",
      },
      {
        type: "paragraph",
        text: "Any requests regarding reuse or reproduction should be directed to the Editorial Office.",
      },
    ],
  },
  {
    id: "open-access",
    title: "Open Access",
    blocks: [
      {
        type: "paragraph",
        text: "The International Journal for Invention of Noble Knowledge (IJFINK) is committed to the principle that knowledge should be freely accessible to all.",
      },
      {
        type: "paragraph",
        text: "All published articles are made immediately available online without subscription barriers, registration requirements or paywalls.",
      },
      { type: "paragraph", text: "Readers are permitted to:" },
      {
        type: "bullets",
        items: ["Read", "Download", "Copy", "Distribute", "Print", "Search and link to full-text articles"],
      },
      {
        type: "paragraph",
        text: "These uses are permitted provided appropriate citation and attribution are maintained.",
      },
      {
        type: "paragraph",
        text: "IJFINK believes that unrestricted access to scholarly research enhances global knowledge dissemination, academic collaboration and societal progress.",
      },
    ],
  },
  {
    id: "peer-review",
    title: "Peer Review",
    blocks: [
      {
        type: "paragraph",
        text: "The International Journal for Invention of Noble Knowledge (IJFINK) is committed to maintaining the highest standards of academic quality and integrity through a rigorous peer-review process.",
      },
      {
        type: "paragraph",
        text: "All submitted manuscripts undergo an initial editorial assessment to determine their suitability with respect to the journal's scope, quality requirements and ethical standards. Manuscripts that successfully pass the preliminary screening are assigned to independent subject experts for peer review.",
      },
      {
        type: "paragraph",
        text: "IJFINK follows a Double-Blind Peer Review process, whereby the identities of both authors and reviewers remain confidential throughout the review process.",
      },
      { type: "paragraph", text: "Reviewers evaluate manuscripts based on:" },
      {
        type: "bullets",
        items: [
          "Originality and novelty of the research",
          "Scientific and methodological rigor",
          "Relevance to the journal's scope",
          "Clarity of presentation and organization",
          "Ethical compliance and scholarly contribution",
        ],
      },
      { type: "paragraph", text: "Based on reviewer recommendations, manuscripts may be:" },
      {
        type: "bullets",
        items: ["Accepted", "Accepted with Minor Revisions", "Accepted with Major Revisions", "Rejected"],
      },
      {
        type: "paragraph",
        text: "The Editor-in-Chief and Editorial Team retain the final authority regarding publication decisions.",
      },
      {
        type: "paragraph",
        text: "All reviewers are expected to maintain confidentiality and disclose any potential conflicts of interest.",
      },
    ],
  },
  {
    id: "plagiarism",
    title: "Plagiarism",
    blocks: [
      {
        type: "paragraph",
        text: "IJFINK maintains a zero-tolerance approach towards plagiarism and academic misconduct.",
      },
      {
        type: "paragraph",
        text: "All submitted manuscripts are screened using plagiarism detection tools and editorial assessment procedures before entering the peer-review process.",
      },
      { type: "paragraph", text: "The following practices are considered unethical:" },
      {
        type: "bullets",
        items: [
          "Direct plagiarism",
          "Mosaic plagiarism",
          "Self-plagiarism without proper citation",
          "Data fabrication or falsification",
          "Improper attribution of sources",
        ],
      },
      {
        type: "paragraph",
        text: "Manuscripts found to contain significant plagiarism may be rejected immediately.",
      },
      {
        type: "paragraph",
        text: "If plagiarism is discovered after publication, IJFINK reserves the right to issue corrections, expressions of concern, or retractions as deemed appropriate.",
      },
      {
        type: "paragraph",
        text: "Authors are solely responsible for ensuring the originality of their work.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "paragraph",
        text: "IJFINK respects the privacy of authors, reviewers, editors and readers.",
      },
      {
        type: "paragraph",
        text: "Personal information collected through manuscript submissions, peer review and journal operations shall be used solely for editorial and publishing purposes.",
      },
      {
        type: "paragraph",
        text: "The journal will not sell, distribute or disclose personal information to third parties except where required by law or necessary for publication-related processes.",
      },
      { type: "paragraph", text: "Information collected may include:" },
      {
        type: "bullets",
        items: ["Name", "Institutional affiliation", "Email address", "ORCiD", "Manuscript-related information"],
      },
      {
        type: "paragraph",
        text: "Appropriate administrative and technical measures are implemented to protect submitted information against unauthorized access.",
      },
    ],
  },
  {
    id: "retraction",
    title: "Retraction",
    blocks: [
      {
        type: "paragraph",
        text: "IJFINK is committed to preserving the integrity of the scholarly record.",
      },
      { type: "paragraph", text: "Articles may be retracted when:" },
      {
        type: "bullets",
        items: [
          "Significant errors invalidate the findings.",
          "Research misconduct is identified.",
          "Plagiarism is confirmed.",
          "Data fabrication or falsification is discovered.",
          "Unethical research practices are established.",
        ],
      },
      {
        type: "paragraph",
        text: "Retraction decisions shall be made by the Editor-in-Chief in consultation with the Editorial Board following a fair investigation process.",
      },
      {
        type: "paragraph",
        text: "Retracted articles will remain accessible as part of the scholarly record but will be clearly marked as retracted.",
      },
      {
        type: "paragraph",
        text: "Where appropriate, corrections, errata or expressions of concern may be issued instead of retraction.",
      },
    ],
  },
];

export const publicationSummary: PolicySection = {
  id: "publication",
  title: "Publication",
  summary:
    "IJFINK maintains publication standards covering author, reviewer and editor responsibilities, misconduct handling, ethical review, corrections, retractions and publication frequency.",
  blocks: [
    {
      type: "paragraph",
      text: "The publication policy brings together the journal's ethics and malpractice statement, publication ethics policy and biannual publication frequency. Because this guidance is detailed, the full material is available on a dedicated Publication Policy page.",
    },
  ],
};

export const publicationPolicySections: PolicySection[] = [
  {
    id: "publication-ethics-malpractice",
    title: "Publication Ethics & Malpractice Statement",
    blocks: [
      {
        type: "paragraph",
        text: "The International Journal for Invention of Noble Knowledge (IJFINK) is committed to maintaining the highest standards of publication ethics, academic integrity and professional responsibility throughout the publication process.",
      },
      {
        type: "paragraph",
        text: "The journal follows internationally recognized ethical publishing principles and expects all participants involved in the publication process, including authors, reviewers, editors and publishers, to uphold these standards.",
      },
      { type: "paragraph", text: "Responsibilities of Authors:" },
      {
        type: "bullets",
        items: [
          "Ensure the submitted work is original and has not been published elsewhere.",
          "Confirm the manuscript is not under review by another publication simultaneously.",
          "Appropriately acknowledge all sources and references.",
          "Present accurate, authentic data free from fabrication or falsification.",
          "Ensure all listed authors have made significant contributions to the research.",
          "Fully disclose conflicts of interest.",
          "Obtain necessary ethical approvals where applicable.",
        ],
      },
      {
        type: "paragraph",
        text: "Any form of plagiarism, duplicate publication, data manipulation or unethical research practice may result in rejection, retraction or other corrective actions.",
      },
      { type: "paragraph", text: "Responsibilities of Reviewers:" },
      {
        type: "bullets",
        items: [
          "Evaluate manuscripts objectively and constructively.",
          "Maintain confidentiality regarding submitted manuscripts.",
          "Identify relevant published work that has not been cited.",
          "Notify editors of any suspected ethical concerns.",
          "Declare any conflicts of interest that may affect impartiality.",
        ],
      },
      {
        type: "paragraph",
        text: "Reviewers must not use unpublished information obtained during the review process for personal advantage.",
      },
      { type: "paragraph", text: "Responsibilities of Editors:" },
      {
        type: "bullets",
        items: [
          "Make publication decisions based solely on academic merit.",
          "Maintain confidentiality throughout the review process.",
          "Ensure fair, unbiased and timely peer review.",
          "Avoid discrimination based on nationality, gender, institutional affiliation, religion or political beliefs.",
          "Address ethical concerns promptly and transparently.",
          "Take appropriate action when misconduct is identified.",
        ],
      },
      {
        type: "paragraph",
        text: "The Editor-in-Chief retains the final authority regarding publication decisions.",
      },
      { type: "paragraph", text: "IJFINK maintains a strict zero-tolerance policy toward:" },
      {
        type: "bullets",
        items: [
          "Plagiarism",
          "Self-plagiarism",
          "Data fabrication",
          "Data falsification",
          "Duplicate publication",
          "Citation manipulation",
          "Authorship misconduct",
        ],
      },
      {
        type: "paragraph",
        text: "All manuscripts may be screened using plagiarism detection tools prior to publication.",
      },
      {
        type: "paragraph",
        text: "When significant errors or ethical concerns are identified after publication, IJFINK reserves the right to publish corrections or errata, issue expressions of concern, or retract articles when necessary.",
      },
      {
        type: "paragraph",
        text: "Retraction decisions shall be made following a fair investigation conducted by the Editorial Office and Editorial Board.",
      },
      {
        type: "paragraph",
        text: "Authors, reviewers and editors must disclose any financial, professional or personal relationships that could influence the publication process. Where conflicts exist, appropriate measures will be taken to ensure transparency and impartiality.",
      },
      {
        type: "paragraph",
        text: "IJFINK is dedicated to fostering a transparent, responsible and trustworthy scholarly publishing environment. The journal continuously strives to uphold research integrity, promote academic excellence and contribute meaningfully to the advancement of global knowledge.",
      },
    ],
  },
  {
    id: "publication-ethics",
    title: "Publication Ethics Policy",
    blocks: [
      {
        type: "paragraph",
        text: "The International Journal for Invention of Noble Knowledge (IJFINK) adheres to the highest standards of publication ethics and academic integrity.",
      },
      {
        type: "paragraph",
        text: "Authors, reviewers and editors are expected to uphold ethical conduct throughout the publication process.",
      },
      { type: "paragraph", text: "Authors must ensure that:" },
      {
        type: "bullets",
        items: [
          "Submitted work is original and has not been published elsewhere.",
          "Data presented are accurate and authentic.",
          "Proper acknowledgment and citation of sources are provided.",
          "All listed authors have significantly contributed to the work.",
          "Conflicts of interest are disclosed.",
        ],
      },
      { type: "paragraph", text: "Editors shall:" },
      {
        type: "bullets",
        items: [
          "Evaluate submissions fairly and impartially.",
          "Maintain confidentiality of submitted manuscripts.",
          "Prevent unethical publishing practices.",
          "Act upon suspected ethical misconduct.",
        ],
      },
      { type: "paragraph", text: "Reviewers shall:" },
      {
        type: "bullets",
        items: [
          "Provide objective and constructive evaluations.",
          "Maintain confidentiality.",
          "Identify relevant published work not cited by authors.",
          "Report suspected plagiarism or ethical concerns.",
        ],
      },
      {
        type: "paragraph",
        text: "IJFINK follows internationally recognized ethical guidelines and reserves the right to investigate and take corrective action against any form of publication misconduct.",
      },
    ],
  },
  {
    id: "publication-frequency",
    title: "Publication Frequency",
    blocks: [
      {
        type: "paragraph",
        text: "The International Journal for Invention of Noble Knowledge (IJFINK) is an international peer-reviewed, open-access scholarly journal published on a biannual basis.",
      },
      {
        type: "paragraph",
        text: "The journal publishes two issues annually, ensuring a structured and rigorous editorial and peer-review process that upholds the highest standards of academic quality and research integrity.",
      },
      { type: "paragraph", text: "Publication Schedule:" },
      {
        type: "bullets",
        items: ["Issue 1: January - June", "Issue 2: July - December"],
      },
      {
        type: "paragraph",
        text: "Special Issues may be published periodically based on emerging research themes, interdisciplinary collaborations and recommendations from the Editorial Board.",
      },
      {
        type: "paragraph",
        text: "IJFINK is committed to maintaining consistency, transparency and timely publication while promoting impactful research across the domains of Intelligent Systems, Biological Sciences and Management.",
      },
      {
        type: "paragraph",
        text: "All accepted manuscripts are published online and made freely accessible to the global research community under the journal's Open Access policy.",
      },
    ],
  },
];
