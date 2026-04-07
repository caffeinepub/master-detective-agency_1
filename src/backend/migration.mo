module {
  type SiteSettings = {
    siteName : Text;
    tagline : Text;
    logoFileId : ?Text;
    themeColor : Text;
    whatsappNumber : Text;
    callNumber : Text;
    metaTitle : Text;
    metaDescription : Text;
    metaKeywords : Text;
  };

  type WebsiteContent = {
    heroHeadline : Text;
    heroSubheadline : Text;
    heroStatCases : Text;
    heroStatYears : Text;
    heroStatSuccess : Text;
    heroCtaText : Text;
    agencyStory : Text;
    contactEmail : Text;
    contactPhone : Text;
    contactAddress : Text;
    faqItems : Text;
    servicesData : Text;
    teamMembers : Text;
    footerTagline : Text;
    legalDisclaimer : Text;
    socialFacebook : Text;
    socialTwitter : Text;
    socialInstagram : Text;
    socialLinkedin : Text;
  };

  type OldActor = { var siteSettings : SiteSettings };
  type NewActor = { var siteSettings : SiteSettings; var websiteContent : WebsiteContent };

  public func run(old : OldActor) : NewActor {
    var websiteContent : WebsiteContent = {
      heroHeadline = "Master Detective Agency";
      heroSubheadline = "Master Detective Agency, founded in 2001, has successfully solved thousands of cases for individuals, businesses and law enforcement agencies. With over 20 years of experience and a highly skilled team of investigators, we provide confidential, professional and ethical detective services nationwide.";
      heroStatCases = "5,000+";
      heroStatYears = "20+";
      heroStatSuccess = "98%";
      heroCtaText = "Request a Case";
      agencyStory = "Master Detective Agency, founded in 2001, has successfully solved thousands of cases for individuals, businesses and law enforcement agencies. With over 20 years of experience and a highly skilled team of investigators, we provide confidential, professional and ethical detective services nationwide.";
      contactEmail = "info@detectiveagency.com";
      contactPhone = "+1234567890";
      contactAddress = "123 Main Street, City, Country";
      faqItems = "[]";
      servicesData = "[]";
      teamMembers = "[]";
      footerTagline = "Master Detective Agency - Your trusted partner in professional investigations.";
      legalDisclaimer = "All investigations are conducted in accordance with local laws and regulations. Information provided is confidential and for authorized use only.";
      socialFacebook = "https://facebook.com/detectiveagency";
      socialTwitter = "https://twitter.com/detectiveagency";
      socialInstagram = "https://instagram.com/detectiveagency";
      socialLinkedin = "https://linkedin.com/company/detectiveagency";
    };

    {
      var siteSettings = old.siteSettings;
      var websiteContent;
    };
  };
};
