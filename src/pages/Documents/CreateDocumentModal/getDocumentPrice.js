function getDocumentPrice(value) {
  switch (value) {
    case "Processing Fee for 4Ps":
    case "Processing Fee-Local":
      return 100;
    case "Processing Fee-Abroad(CGFNS, WES, etc.)":
      return 150;
    case "OTR W/ EDUFIED GRAD AS OF 2018 TO OLD WITH DOC STAMP (NEW RATE)":
      return 500;
    case "Diploma-Rush":
      return 300;
    case "For 137/138":
    case "Form 137/138-Rush":
    case "Trancript (first page with doc stamp)":
    case "Transcript (suceeding page)":
      return 50;
    case "Transcript (Rush rate; per page)":
      return 75;
    case "Authentication-Single":
    case "Authentication-Local":
      return 200;
    case "CAV (Authentication for CHED DFA Red Ribbon)":
      return 500;
    case "CAV with processing":
      return 1000;
    case "Copy of Grades":
      return 25;
    case "Dropping Fee/Changing (per subject)-Tertiary":
      return 50;
    case "Dropping Fee/Changing )per subject)-Law/GS":
      return 100;
    case "Print Out Assessment":
      return 10;
    case "CHD - Grad School":
      return 200;
    case "CHD - Law":
      return 150;
    case "CHD - Tertiary":
      return 100;
    case "CHD - TechEd":
      return 75;
    case "CHD - BasicEd":
      return 50;
    case "Certification - Course Description":
    case "Certification - Letter of Acceptance":
      return 150;
    case "Certification - Letter of Acceptance; with SPA":
      return 200;
    case "Certification of Enrollment":
    case "Certification of Graduation":
    case "Certification of Units Earned":
    case "Certification-Med. of Instruction":
    case "Certification-Weighted Average":
    case "Certification-Good Moral":
      return 50;
    case "Certificate of Eligibility to Transfer, 2nd copy":
      return 100;
    case "Change of Section-SHS":
      return 20;
    case "Completion Grade-Tertiary":
      return 150;
    case "Completion Grade-Law/GS":
      return 200;
    case "Certification - OTR w/ hrs":
      return 300;
    case "Certification of Assessment":
      return 75;
    case "Forms (for education and/or employment)":
      return 30;
    case "RLE (per page)":
      return 5;
    case "Docementary Stamps":
      return 30;
    case "Course prospectus":
      return 50;
    case "Processing of correction of name":
      return 1000;
    default:
      return 0;
  }
}

export default getDocumentPrice;
