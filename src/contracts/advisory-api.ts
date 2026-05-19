import { ApiResponse } from '../types/common';

export interface AdvisoryBaseApiClient {
  setAuthToken(token: string): void;
  clearAuthToken(): void;
  setTimeout(timeout: number): void;
}

export type AdvisoryStepType = 'info' | 'single_choice' | 'multi_choice' | 'results';
export type AdvisoryTagCategory =
  | 'intent'
  | 'portfolio'
  | 'format'
  | 'liquidity'
  | 'pricing'
  | 'logistics'
  | 'trust'
  | 'collectibility';

export interface AdvisorySignalDto {
  tagKey: string;
  weight: number;
  rationale?: string;
}

export interface AdvisoryAnswerOptionDto {
  key: string;
  label: string;
  description?: string;
  signals: AdvisorySignalDto[];
  nextStepId?: string;
}

export interface AdvisoryInfoStepDto {
  id: string;
  type: 'info';
  title: string;
  body: string;
  nextStepId?: string;
}

export interface AdvisoryChoiceStepDto {
  id: string;
  type: 'single_choice' | 'multi_choice';
  title: string;
  body?: string;
  answers: AdvisoryAnswerOptionDto[];
  allowSkip?: boolean;
  skipToStepId?: string;
  nextStepId?: string;
}

export interface AdvisoryResultsStepDto {
  id: string;
  type: 'results';
  title: string;
  body?: string;
}

export type AdvisoryWorkflowStepDto =
  | AdvisoryInfoStepDto
  | AdvisoryChoiceStepDto
  | AdvisoryResultsStepDto;

export interface AdvisoryWorkflowDefinitionDto {
  workflowKey: string;
  version: number;
  entryStepId: string;
  steps: AdvisoryWorkflowStepDto[];
}

export interface AdvisoryWorkflowVersionDto {
  id: string;
  workflowId: string;
  versionNumber: number;
  status: 'draft' | 'published' | 'archived';
  definition: AdvisoryWorkflowDefinitionDto;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdvisorySessionDto {
  id: string;
  workflowVersionId: string;
  userId?: string | null;
  sessionStatus: 'in_progress' | 'completed' | 'abandoned';
  startedAt: string;
  completedAt?: string | null;
  lastAnsweredStepId?: string | null;
  derivedSignals: AdvisorySignalDto[];
}

export interface AdvisorySessionAnswerDto {
  id: string;
  sessionId: string;
  stepId: string;
  answerKey?: string | null;
  answerPayload: Record<string, unknown>;
  signalPayload: AdvisorySignalDto[];
  skipped: boolean;
  answeredAt: string;
}

export interface AdvisorySessionDetailsDto {
  session: AdvisorySessionDto;
  answers: AdvisorySessionAnswerDto[];
}

export interface AdvisoryCoverageResultDto {
  pathKey: string;
  stepIds: string[];
  answerKeys: string[];
  tagKeys: string[];
  matchingProductCount: number;
}

export interface AdvisoryRecommendationItemDto {
  productId: string;
  rankPosition: number;
  score: number;
  matchedTags: string[];
  reasons: string[];
  warnings: string[];
}

export interface AdvisoryRecommendationResultDto {
  sessionId: string;
  workflowVersionId: string;
  items: AdvisoryRecommendationItemDto[];
  warnings: string[];
  noMatchDetails: string[];
}

export interface AdvisoryTagDto {
  id: string;
  tagKey: string;
  displayName: string;
  category: AdvisoryTagCategory;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAdvisoryTagDto {
  id: string;
  productId: string;
  advisoryTagId: string;
  tagKey: string;
  displayName: string;
  category: AdvisoryTagCategory;
  relevance: number;
  rationale?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdvisoryWorkflowSummaryDto {
  workflowId: string;
  workflowKey: string;
  displayName: string;
  description?: string | null;
  isActive: boolean;
  versions: AdvisoryWorkflowVersionDto[];
}

export interface StartAdvisorySessionRequest {
  workflowKey?: string;
}

export interface SubmitAdvisoryAnswerRequest {
  stepId: string;
  answerKey?: string | null;
  answerPayload?: Record<string, unknown>;
  skipped?: boolean;
}

export interface CreateAdvisoryTagRequest {
  tagKey: string;
  displayName: string;
  category: AdvisoryTagCategory;
  description?: string | null;
}

export interface UpdateAdvisoryTagRequest {
  displayName?: string;
  category?: AdvisoryTagCategory;
  description?: string | null;
  isActive?: boolean;
}

export interface ReplaceProductAdvisoryTagsRequest {
  assignments: Array<{
    advisoryTagId: string;
    relevance: number;
    rationale?: string | null;
  }>;
}

export interface AdvisoryWorkflowDraftUpsertRequest {
  displayName: string;
  description?: string | null;
  definition: AdvisoryWorkflowDefinitionDto;
}

export interface CreateAdvisoryWorkflowDraftRequest extends AdvisoryWorkflowDraftUpsertRequest {
  workflowKey: string;
}

export type UpdateAdvisoryWorkflowDraftRequest = AdvisoryWorkflowDraftUpsertRequest;

export interface AdvisoryApiClient extends AdvisoryBaseApiClient {
  getActiveWorkflow(workflowKey?: string): Promise<ApiResponse<AdvisoryWorkflowVersionDto>>;
  startSession(request?: StartAdvisorySessionRequest): Promise<ApiResponse<AdvisorySessionDto>>;
  getSession(sessionId: string): Promise<ApiResponse<AdvisorySessionDetailsDto>>;
  submitAnswer(sessionId: string, request: SubmitAdvisoryAnswerRequest): Promise<ApiResponse<{ session: AdvisorySessionDto; answer: AdvisorySessionAnswerDto }>>;
  generateRecommendations(sessionId: string): Promise<ApiResponse<AdvisoryRecommendationResultDto>>;
  listTags(): Promise<ApiResponse<AdvisoryTagDto[]>>;
  getProductTags(productId: string): Promise<ApiResponse<ProductAdvisoryTagDto[]>>;
  createTag(request: CreateAdvisoryTagRequest): Promise<ApiResponse<AdvisoryTagDto>>;
  updateTag(tagId: string, request: UpdateAdvisoryTagRequest): Promise<ApiResponse<AdvisoryTagDto>>;
  replaceProductTags(productId: string, request: ReplaceProductAdvisoryTagsRequest): Promise<ApiResponse<ProductAdvisoryTagDto[]>>;
  listWorkflows(): Promise<ApiResponse<AdvisoryWorkflowSummaryDto[]>>;
  createWorkflowDraft(request: CreateAdvisoryWorkflowDraftRequest): Promise<ApiResponse<AdvisoryWorkflowVersionDto>>;
  updateWorkflowDraft(workflowVersionId: string, request: UpdateAdvisoryWorkflowDraftRequest): Promise<ApiResponse<AdvisoryWorkflowVersionDto>>;
  getWorkflowCoverage(workflowVersionId: string): Promise<ApiResponse<AdvisoryCoverageResultDto[]>>;
  publishWorkflow(workflowVersionId: string): Promise<ApiResponse<{
    version: AdvisoryWorkflowVersionDto;
    validation: {
      success: boolean;
      data?: AdvisoryWorkflowDefinitionDto;
      errors?: Array<{ path: string; message: string }>;
    };
    coverage: AdvisoryCoverageResultDto[];
  }>>;
}