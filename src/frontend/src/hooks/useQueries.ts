import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type CaseStatus,
  InquiryStatus,
  type SolvedCase,
  type UserRole,
  type WebsiteContent,
} from "../backend";
import { useActor } from "./useActor";

// Cases
export function useAllCases() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCasesByClient(clientId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["casesByClient", clientId],
    queryFn: async () => {
      if (!actor || !clientId) return [];
      return actor.getCasesByClient(clientId);
    },
    enabled: !!actor && !isFetching && !!clientId,
  });
}

export function useCreateCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      clientId,
    }: {
      title: string;
      description: string;
      clientId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCase(title, description, clientId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useUpdateCaseStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      caseId,
      status,
    }: {
      caseId: string;
      status: CaseStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCaseStatus(caseId, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useAssignInvestigator() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      caseId,
      investigatorId,
    }: {
      caseId: string;
      investigatorId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.assignInvestigator(caseId, investigatorId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useAddNotes() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      caseId,
      notes,
    }: {
      caseId: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addNotesToCase(caseId, notes);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useCaseFiles(caseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["caseFiles", caseId],
    queryFn: async () => {
      if (!actor || !caseId) return [];
      return actor.getFilesForCase(caseId);
    },
    enabled: !!actor && !isFetching && !!caseId,
  });
}

export function useAttachFileToCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      caseId,
      fileId,
      fileName,
    }: {
      caseId: string;
      fileId: string;
      fileName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.attachFileToCase(caseId, fileId, fileName);
    },
    onSuccess: (_d, v) =>
      qc.invalidateQueries({ queryKey: ["caseFiles", v.caseId] }),
  });
}

// Clients
export function useAllClients() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllClients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddClient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      userId: string;
      fullName: string;
      phone: string;
      email: string;
      address: string;
      kycFileId: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addClient(
        data.userId,
        data.fullName,
        data.phone,
        data.email,
        data.address,
        data.kycFileId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useEditClient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      fullName: string;
      phone: string;
      email: string;
      address: string;
      kycFileId: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.editClient(
        data.id,
        data.fullName,
        data.phone,
        data.email,
        data.address,
        data.kycFileId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}

// Staff
export function useAllStaff() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStaff();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddStaff() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      userId: string;
      fullName: string;
      role: string;
      phone: string;
      email: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addStaff(
        data.userId,
        data.fullName,
        data.role,
        data.phone,
        data.email,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}

export function useEditStaff() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      fullName: string;
      role: string;
      phone: string;
      email: string;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.editStaff(
        data.id,
        data.fullName,
        data.role,
        data.phone,
        data.email,
        data.isActive,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}

// Inquiries
export function useAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        data.name,
        data.email,
        data.phone,
        data.message,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}

export function useApproveInquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveInquiry(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}

export function useRejectInquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectInquiry(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}

// Media
export function useMediaByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["media", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMediaByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveMedia() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      fileId: string;
      category: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveMediaFile(data.name, data.fileId, data.category);
    },
    onSuccess: (_d, v) =>
      qc.invalidateQueries({ queryKey: ["media", v.category] }),
  });
}

export function useDeleteMedia() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMediaRecord(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });
}

// Settings
export function useSiteSettings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      siteName: string;
      tagline: string;
      logoFileId: string | null;
      themeColor: string;
      whatsappNumber: string;
      callNumber: string;
      metaTitle: string;
      metaDescription: string;
      metaKeywords: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSettings(
        data.siteName,
        data.tagline,
        data.logoFileId,
        data.themeColor,
        data.whatsappNumber,
        data.callNumber,
        data.metaTitle,
        data.metaDescription,
        data.metaKeywords,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

// Website Content
export function useWebsiteContent() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["websiteContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWebsiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateWebsiteContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: WebsiteContent) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateWebsiteContent(content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["websiteContent"] }),
  });
}

// Logs
export function useActivityLogs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

// Users
export function useAllUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsersSortedByEmail();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      phone: string;
      role: UserRole;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createUser(data.username, data.email, data.phone, data.role);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ─── Solved Cases ─────────────────────────────────────────────────────────────

export function usePublishedSolvedCases() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["publishedSolvedCases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedSolvedCases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllSolvedCases() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["solvedCases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSolvedCases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSolvedCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: SolvedCase) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSolvedCase(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["solvedCases"] }),
  });
}

export function useUpdateSolvedCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: SolvedCase }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSolvedCase(id, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["solvedCases"] });
      qc.invalidateQueries({ queryKey: ["publishedSolvedCases"] });
    },
  });
}

export function useDeleteSolvedCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSolvedCase(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["solvedCases"] });
      qc.invalidateQueries({ queryKey: ["publishedSolvedCases"] });
    },
  });
}
