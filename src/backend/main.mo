import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";



actor {
  type UserRole = AccessControl.UserRole;

  type CaseStatus = {
    #pending;
    #active;
    #closed;
  };

  type InquiryStatus = {
    #new;
    #approved;
    #rejected;
  };

  type User = {
    id : Text;
    username : Text;
    email : Text;
    phone : Text;
    role : UserRole;
    createdAt : Int;
    isActive : Bool;
  };

  type Case = {
    id : Text;
    title : Text;
    description : Text;
    clientId : Text;
    investigatorId : ?Text;
    status : CaseStatus;
    createdAt : Int;
    updatedAt : Int;
    notes : Text;
  };

  type Client = {
    id : Text;
    userId : Text;
    fullName : Text;
    phone : Text;
    email : Text;
    address : Text;
    kycFileId : ?Text;
  };

  type Staff = {
    id : Text;
    userId : Text;
    fullName : Text;
    role : Text;
    phone : Text;
    email : Text;
    isActive : Bool;
  };

  type Inquiry = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    createdAt : Int;
    status : InquiryStatus;
  };

  type MediaFile = {
    id : Text;
    name : Text;
    uploadedBy : Principal;
    fileId : Text;
    category : Text;
    createdAt : Int;
  };

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

  type ActivityLog = {
    id : Text;
    userId : Principal;
    action : Text;
    timestamp : Int;
    ipAddress : Text;
  };

  type CaseFile = {
    id : Text;
    caseId : Text;
    fileId : Text;
    fileName : Text;
    uploadedBy : Principal;
    createdAt : Int;
  };

  type SolvedCase = {
    id : Text;
    caseNumber : Text;
    category : Text;
    title : Text;
    description : Text;
    duration : Text;
    outcome : Text;
    roadmap : Text;
    challenges : Text;
    policeHelp : Bool;
    policeHelpDetail : Text;
    feedback : Text;
    rating : Nat;
    isPublished : Bool;
    createdAt : Int;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  module User {
    public func compare(user1 : User, user2 : User) : Order.Order {
      Text.compare(user1.id, user2.id);
    };

    public func compareByEmail(user1 : User, user2 : User) : Order.Order {
      Text.compare(user1.email, user2.email);
    };
  };

  var nextId = 1;
  func generateId() : Text {
    let id = nextId;
    nextId += 1;
    id.toText();
  };

  let users = Map.empty<Text, User>();
  let cases = Map.empty<Text, Case>();
  let clients = Map.empty<Text, Client>();
  let staff = Map.empty<Text, Staff>();
  let inquiries = Map.empty<Text, Inquiry>();
  let mediaFiles = Map.empty<Text, MediaFile>();
  let abandonedCaseFiles = Map.empty<Text, CaseFile>();
  let activityLogs = Map.empty<Text, ActivityLog>();
  let solvedCases = Map.empty<Text, SolvedCase>();
  let caseFiles = Map.empty<Text, CaseFile>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var siteSettings : SiteSettings = {
    siteName = "Detective Agency";
    tagline = "Professional Investigation Services";
    logoFileId = null;
    themeColor = "#000000";
    whatsappNumber = "";
    callNumber = "";
    metaTitle = "Detective Agency";
    metaDescription = "Professional detective services";
    metaKeywords = "detective, investigation, agency";
  };

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

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createUser(username : Text, email : Text, phone : Text, role : UserRole) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create users");
    };

    let id = generateId();
    let newUser = {
      id;
      username;
      email;
      phone;
      role;
      createdAt = 0;
      isActive = true;
    };
    users.add(id, newUser);
    id;
  };

  public query ({ caller }) func getUser(id : Text) : async User {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view user details");
    };

    switch (users.get(id)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { user };
    };
  };

  public query ({ caller }) func getAllUsersSortedById() : async [User] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };

    users.values().toArray().sort();
  };

  public query ({ caller }) func getAllUsersSortedByEmail() : async [User] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };

    users.values().toArray().sort(User.compareByEmail);
  };

  public shared ({ caller }) func updateUserStatus(id : Text, isActive : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update user status");
    };

    switch (users.get(id)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) {
        users.add(
          id,
          {
            id = user.id;
            username = user.username;
            email = user.email;
            phone = user.phone;
            role = user.role;
            createdAt = user.createdAt;
            isActive;
          },
        );
      };
    };
  };

  public shared ({ caller }) func createCase(title : Text, description : Text, clientId : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create cases");
    };

    let id = generateId();
    let newCase = {
      id;
      title;
      description;
      clientId;
      investigatorId = null;
      status = #pending;
      createdAt = 0;
      updatedAt = 0;
      notes = "";
    };
    cases.add(id, newCase);
    id;
  };

  public shared ({ caller }) func updateCaseStatus(caseId : Text, status : CaseStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update case status");
    };

    switch (cases.get(caseId)) {
      case (null) { Runtime.trap("Case not found") };
      case (?existingCase) {
        cases.add(
          caseId,
          {
            id = existingCase.id;
            title = existingCase.title;
            description = existingCase.description;
            clientId = existingCase.clientId;
            investigatorId = existingCase.investigatorId;
            status;
            createdAt = existingCase.createdAt;
            updatedAt = 0;
            notes = existingCase.notes;
          },
        );
      };
    };
  };

  public shared ({ caller }) func assignInvestigator(caseId : Text, investigatorId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign investigators");
    };

    switch (cases.get(caseId)) {
      case (null) { Runtime.trap("Case not found") };
      case (?existingCase) {
        cases.add(
          caseId,
          {
            id = existingCase.id;
            title = existingCase.title;
            description = existingCase.description;
            clientId = existingCase.clientId;
            investigatorId = ?investigatorId;
            status = existingCase.status;
            createdAt = existingCase.createdAt;
            updatedAt = 0;
            notes = existingCase.notes;
          },
        );
      };
    };
  };

  public shared ({ caller }) func addNotesToCase(caseId : Text, notes : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add notes to cases");
    };

    switch (cases.get(caseId)) {
      case (null) { Runtime.trap("Case not found") };
      case (?existingCase) {
        cases.add(
          caseId,
          {
            id = existingCase.id;
            title = existingCase.title;
            description = existingCase.description;
            clientId = existingCase.clientId;
            investigatorId = existingCase.investigatorId;
            status = existingCase.status;
            createdAt = existingCase.createdAt;
            updatedAt = 0;
            notes;
          },
        );
      };
    };
  };

  public query ({ caller }) func getCasesByClient(clientId : Text) : async [Case] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view cases");
    };

    cases.values().toArray().filter(func(c : Case) : Bool { c.clientId == clientId });
  };

  public query ({ caller }) func getAllCases() : async [Case] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view all cases");
    };

    cases.values().toArray();
  };

  public shared ({ caller }) func addClient(userId : Text, fullName : Text, phone : Text, email : Text, address : Text, kycFileId : ?Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add clients");
    };

    let id = generateId();
    let newClient = {
      id;
      userId;
      fullName;
      phone;
      email;
      address;
      kycFileId;
    };
    clients.add(id, newClient);
    id;
  };

  public shared ({ caller }) func editClient(id : Text, fullName : Text, phone : Text, email : Text, address : Text, kycFileId : ?Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can edit clients");
    };

    switch (clients.get(id)) {
      case (null) { Runtime.trap("Client not found") };
      case (?existingClient) {
        clients.add(
          id,
          {
            id = existingClient.id;
            userId = existingClient.userId;
            fullName;
            phone;
            email;
            address;
            kycFileId;
          },
        );
      };
    };
  };

  public query ({ caller }) func getClientDetails(id : Text) : async Client {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view client details");
    };

    switch (clients.get(id)) {
      case (null) { Runtime.trap("Client not found") };
      case (?client) { client };
    };
  };

  public query ({ caller }) func getAllClients() : async [Client] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view all clients");
    };

    clients.values().toArray();
  };

  public shared ({ caller }) func addStaff(userId : Text, fullName : Text, role : Text, phone : Text, email : Text) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add staff");
    };

    let id = generateId();
    let newStaff = {
      id;
      userId;
      fullName;
      role;
      phone;
      email;
      isActive = true;
    };
    staff.add(id, newStaff);
    id;
  };

  public shared ({ caller }) func editStaff(id : Text, fullName : Text, role : Text, phone : Text, email : Text, isActive : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can edit staff");
    };

    switch (staff.get(id)) {
      case (null) { Runtime.trap("Staff not found") };
      case (?existingStaff) {
        staff.add(
          id,
          {
            id = existingStaff.id;
            userId = existingStaff.userId;
            fullName;
            role;
            phone;
            email;
            isActive;
          },
        );
      };
    };
  };

  public query ({ caller }) func getAllStaff() : async [Staff] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all staff");
    };

    staff.values().toArray();
  };

  public shared func submitInquiry(name : Text, email : Text, phone : Text, message : Text) : async Text {
    let id = generateId();
    let newInquiry = {
      id;
      name;
      email;
      phone;
      message;
      createdAt = 0;
      status = #new;
    };
    inquiries.add(id, newInquiry);
    id;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };

    inquiries.values().toArray();
  };

  public shared ({ caller }) func approveInquiry(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve inquiries");
    };

    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?existingInquiry) {
        inquiries.add(
          id,
          {
            id = existingInquiry.id;
            name = existingInquiry.name;
            email = existingInquiry.email;
            phone = existingInquiry.phone;
            message = existingInquiry.message;
            createdAt = existingInquiry.createdAt;
            status = #approved;
          },
        );
      };
    };
  };

  public shared ({ caller }) func rejectInquiry(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject inquiries");
    };

    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?existingInquiry) {
        inquiries.add(
          id,
          {
            id = existingInquiry.id;
            name = existingInquiry.name;
            email = existingInquiry.email;
            phone = existingInquiry.phone;
            message = existingInquiry.message;
            createdAt = existingInquiry.createdAt;
            status = #rejected;
          },
        );
      };
    };
  };

  public shared ({ caller }) func saveMediaFile(name : Text, fileId : Text, category : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save media files");
    };

    let id = generateId();
    let newMedia = {
      id;
      name;
      uploadedBy = caller;
      fileId;
      category;
      createdAt = 0;
    };
    mediaFiles.add(id, newMedia);
    id;
  };

  public query ({ caller }) func getMediaByCategory(category : Text) : async [MediaFile] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view media files");
    };

    mediaFiles.values().toArray().filter(func(m : MediaFile) : Bool { m.category == category });
  };

  public shared ({ caller }) func deleteMediaRecord(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete media files");
    };

    switch (mediaFiles.get(id)) {
      case (null) { Runtime.trap("Media file not found") };
      case (?media) {
        if (not AccessControl.isAdmin(accessControlState, caller) and media.uploadedBy != caller) {
          Runtime.trap("Unauthorized: Can only delete your own media files");
        };
        mediaFiles.remove(id);
      };
    };
  };

  public query func getSettings() : async SiteSettings {
    siteSettings;
  };

  public shared ({ caller }) func updateSettings(
    siteName : Text,
    tagline : Text,
    logoFileId : ?Text,
    themeColor : Text,
    whatsappNumber : Text,
    callNumber : Text,
    metaTitle : Text,
    metaDescription : Text,
    metaKeywords : Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };

    siteSettings := {
      siteName;
      tagline;
      logoFileId;
      themeColor;
      whatsappNumber;
      callNumber;
      metaTitle;
      metaDescription;
      metaKeywords;
    };
  };

  public query func getWebsiteContent() : async WebsiteContent {
    websiteContent;
  };

  public shared ({ caller }) func updateWebsiteContent(content : WebsiteContent) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update website content");
    };
    websiteContent := content;
  };

  public shared ({ caller }) func logAction(action : Text, ipAddress : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can log actions");
    };

    let id = generateId();
    let newLog = {
      id;
      userId = caller;
      action;
      timestamp = 0;
      ipAddress;
    };
    activityLogs.add(id, newLog);
    id;
  };

  public query ({ caller }) func getLogs() : async [ActivityLog] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view activity logs");
    };

    activityLogs.values().toArray();
  };

  public shared ({ caller }) func attachFileToCase(caseId : Text, fileId : Text, fileName : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can attach files to cases");
    };

    let id = generateId();
    let newCaseFile = {
      id;
      caseId;
      fileId;
      fileName;
      uploadedBy = caller;
      createdAt = 0;
    };
    caseFiles.add(id, newCaseFile);
    id;
  };

  public query ({ caller }) func getFilesForCase(caseId : Text) : async [CaseFile] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view case files");
    };

    caseFiles.values().toArray().filter(func(cf : CaseFile) : Bool { cf.caseId == caseId });
  };

  public shared ({ caller }) func addSolvedCase(solvedCase : SolvedCase) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add solved cases");
    };

    let id = generateId();
    let newCase = {
      solvedCase with
      id;
      createdAt = Time.now();
    };
    solvedCases.add(id, newCase);
    id;
  };

  public shared ({ caller }) func updateSolvedCase(id : Text, solvedCase : SolvedCase) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update solved cases");
    };

    switch (solvedCases.get(id)) {
      case (null) { Runtime.trap("Solved case not found") };
      case (?existingCase) {
        solvedCases.add(
          id,
          {
            solvedCase with
            id;
            createdAt = existingCase.createdAt;
          },
        );
      };
    };
  };

  public shared ({ caller }) func deleteSolvedCase(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete solved cases");
    };

    if (not solvedCases.containsKey(id)) {
      Runtime.trap("Solved case not found");
    };

    solvedCases.remove(id);
  };

  public query ({ caller }) func getAllSolvedCases() : async [SolvedCase] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all solved cases");
    };

    solvedCases.values().toArray();
  };

  public query func getPublishedSolvedCases() : async [SolvedCase] {
    solvedCases.values().toArray().filter(func(c) { c.isPublished });
  };
};
