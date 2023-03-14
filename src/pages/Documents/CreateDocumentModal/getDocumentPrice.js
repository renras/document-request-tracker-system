function getDocumentPrice(value) {
  switch (value) {
    case "Processing Fee for 4Ps":
      return 0;
    case "Processing Fee-Local":
      return 75;
    case "Processing Fee-Abroad(CGFNS, WES, etc.)":
      return 100;
    case "Diploma with EDUFIED NEW RATE":
      return 2000;
    case "OTR W/ EDUFIED GRAD AS OF 2018 TO OLD WITH DOC STAMP (NEW RATE)":
      return 1500;
    case "Diploma-Rush":
      return 1000;
    case "For 137/138":
      return 170;
    case "Form 137/138-Rush":
      return 220;
    case "Trancript (first page with doc stamp)":
      return 200;
    case "Transcript (suceeding page)":
      return 180;
    case "Transcript (Rush rate; per page)":
      return 300;
    case "Authentication-Single":
      return 100;
    case "Authentication-Local":
      return 170;
    case "CAV (Authentication for CHED DFA Red Ribbon)":
      return 200;
    case "CAV with processing":
      return 500;
    case "Copy of Grades":
      return 50;
    case "Dropping Fee/Changing (per subject)-Tertiary":
      return 75;
    case "Dropping Fee/Changing )per subject)-Law/GS":
      return 100;
    case "Print Out Assessment":
      return 50;
    case "CHD - Grad School":
      return 600;
    case "CHD - Law":
      return 600;
    case "CHD - Tertiary":
      return 575;
    case "CHD - TechEd":
      return 550;
    case "CHD - BasicEd":
      return 550;
    case "Certification - Course Description":
      return 75;
    case "Certification - Letter of Acceptance":
      return 300;
    case "Certification - Letter of Acceptance; with SPA":
      return 700;
    case "Certification of Enrollment":
      return 150;
    case "Certification of Graduation":
      return 170;
    case "Certification of Units Earned":
      return 170;
    case "Certification-Med. of Instruction":
      return 170;
    case "Certification-Weighted Average":
      return 170;
    case "Certification-Good Moral":
      return 170;
    case "Certificate of Eligibility to Transfer, 2nd copy":
      return 170;
    case "Change of Section-SHS":
      return 100;
    case "Completion Grade-Tertiary":
      return 100;
    case "Completion Grade-Law/GS":
      return 150;
    case "Certification - OTR w/ hrs":
      return 60;
    case "Certification of Assessment":
      return 50;
    case "Forms (for education and/or employment)":
      return 75;
    case "RLE (per page)":
      return 60;
    case "Docementary Stamps":
      return 35;
    case "Course prospectus":
      return 25;
    case "Processing of correction of name":
      return 175;
    default:
      return 0;
  }
}

export default getDocumentPrice;
