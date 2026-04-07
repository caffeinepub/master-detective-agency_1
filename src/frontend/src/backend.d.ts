import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MediaFile {
    id: string;
    name: string;
    createdAt: bigint;
    fileId: string;
    category: string;
    uploadedBy: Principal;
}
export interface Case {
    id: string;
    status: CaseStatus;
    title: string;
    clientId: string;
    createdAt: bigint;
    description: string;
    updatedAt: bigint;
    notes: string;
    investigatorId?: string;
}
export interface User {
    id: string;
    username: string;
    createdAt: bigint;
    role: UserRole;
    isActive: boolean;
    email: string;
    phone: string;
}
export interface CaseFile {
    id: string;
    createdAt: bigint;
    fileName: string;
    fileId: string;
    caseId: string;
    uploadedBy: Principal;
}
export interface ActivityLog {
    id: string;
    action: string;
    userId: Principal;
    timestamp: bigint;
    ipAddress: string;
}
export interface SiteSettings {
    metaDescription: string;
    tagline: string;
    metaKeywords: string;
    themeColor: string;
    logoFileId?: string;
    siteName: string;
    whatsappNumber: string;
    metaTitle: string;
    callNumber: string;
}
export interface Staff {
    id: string;
    userId: string;
    role: string;
    fullName: string;
    isActive: boolean;
    email: string;
    phone: string;
}
export interface Inquiry {
    id: string;
    status: InquiryStatus;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface Client {
    id: string;
    kycFileId?: string;
    userId: string;
    fullName: string;
    email: string;
    address: string;
    phone: string;
}
export interface WebsiteContent {
    footerTagline: string;
    faqItems: string;
    socialInstagram: string;
    heroStatSuccess: string;
    socialFacebook: string;
    heroCtaText: string;
    heroStatCases: string;
    teamMembers: string;
    agencyStory: string;
    servicesData: string;
    socialTwitter: string;
    heroSubheadline: string;
    contactEmail: string;
    legalDisclaimer: string;
    socialLinkedin: string;
    heroHeadline: string;
    contactAddress: string;
    contactPhone: string;
    heroStatYears: string;
}
export interface SolvedCase {
    id: string;
    roadmap: string;
    policeHelpDetail: string;
    title: string;
    duration: string;
    isPublished: boolean;
    caseNumber: string;
    createdAt: bigint;
    description: string;
    feedback: string;
    category: string;
    policeHelp: boolean;
    rating: bigint;
    outcome: string;
    challenges: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum CaseStatus {
    closed = "closed",
    active = "active",
    pending = "pending"
}
export enum InquiryStatus {
    new_ = "new",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addClient(userId: string, fullName: string, phone: string, email: string, address: string, kycFileId: string | null): Promise<string>;
    addNotesToCase(caseId: string, notes: string): Promise<void>;
    addSolvedCase(solvedCase: SolvedCase): Promise<string>;
    addStaff(userId: string, fullName: string, role: string, phone: string, email: string): Promise<string>;
    approveInquiry(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignInvestigator(caseId: string, investigatorId: string): Promise<void>;
    attachFileToCase(caseId: string, fileId: string, fileName: string): Promise<string>;
    createCase(title: string, description: string, clientId: string): Promise<string>;
    createUser(username: string, email: string, phone: string, role: UserRole): Promise<string>;
    deleteMediaRecord(id: string): Promise<void>;
    deleteSolvedCase(id: string): Promise<void>;
    editClient(id: string, fullName: string, phone: string, email: string, address: string, kycFileId: string | null): Promise<void>;
    editStaff(id: string, fullName: string, role: string, phone: string, email: string, isActive: boolean): Promise<void>;
    getAllCases(): Promise<Array<Case>>;
    getAllClients(): Promise<Array<Client>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllSolvedCases(): Promise<Array<SolvedCase>>;
    getAllStaff(): Promise<Array<Staff>>;
    getAllUsersSortedByEmail(): Promise<Array<User>>;
    getAllUsersSortedById(): Promise<Array<User>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCasesByClient(clientId: string): Promise<Array<Case>>;
    getClientDetails(id: string): Promise<Client>;
    getFilesForCase(caseId: string): Promise<Array<CaseFile>>;
    getLogs(): Promise<Array<ActivityLog>>;
    getMediaByCategory(category: string): Promise<Array<MediaFile>>;
    getPublishedSolvedCases(): Promise<Array<SolvedCase>>;
    getSettings(): Promise<SiteSettings>;
    getUser(id: string): Promise<User>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWebsiteContent(): Promise<WebsiteContent>;
    isCallerAdmin(): Promise<boolean>;
    logAction(action: string, ipAddress: string): Promise<string>;
    rejectInquiry(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveMediaFile(name: string, fileId: string, category: string): Promise<string>;
    submitInquiry(name: string, email: string, phone: string, message: string): Promise<string>;
    updateCaseStatus(caseId: string, status: CaseStatus): Promise<void>;
    updateSettings(siteName: string, tagline: string, logoFileId: string | null, themeColor: string, whatsappNumber: string, callNumber: string, metaTitle: string, metaDescription: string, metaKeywords: string): Promise<void>;
    updateSolvedCase(id: string, solvedCase: SolvedCase): Promise<void>;
    updateUserStatus(id: string, isActive: boolean): Promise<void>;
    updateWebsiteContent(content: WebsiteContent): Promise<void>;
}
