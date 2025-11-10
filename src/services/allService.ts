import apiClient from './httpClient';


// -----------------------------------Below is api related Interfaces------------------------------------------------------

export interface ApiScheme {
  isFeatured: boolean;
  _id: string;
  schemeTitle: string;
  about: string;
  objectives: string;
  category?: {
    _id: string;
    name: string;
  } | null;
  publishedOn: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  cardImage?: {
    url: string;
    fileId: string;
  };
  createdAt: string;
  updatedAt: string;
  bannerImage?: {
    url: string;
    fileId: string;
  };
  textWithHTMLParsing?: {
    htmlDescription: string;
  };
  helplineNumber?: {
    tollFreeNumber?: string;
    emailSupport?: string;
    availability?: string;
  };
  sourcesAndReferences?: Array<{
    sourceName?: string;
    sourceLink?: string;
    _id?: string;
  }>;
  disclaimer?: {
    description?: string;
  };
  keyHighlightsOfTheScheme?: Array<{
    _id?: string;
    schemeName?: string;
    launchedBy?: string;
  }>;
  eligibilityCriteria?: Array<{
    _id?: string;
    subTitle?: string;
    subDescription?: string;
  }>;
  financialBenefits?: Array<{
    _id?: string;
    subTitle?: string;
    subDescription?: string;
  }>;
  requiredDocuments?: Array<{
    _id?: string;
    subTitle?: string;
    subDescription?: string;
  }>;
  importantDates?: Array<{
    _id?: string;
    label?: string;
    date?: string;
  }>;
  salientFeatures?: Array<{
    _id?: string;
    subTitle?: string;
    subDescription?: string;
  }>;
  applicationProcess?: Array<{
    _id?: string;
    subTitle?: string;
    subDescription?: string;
  }>;
  frequentlyAskedQuestions?: Array<{
    _id?: string;
    question?: string;
    answer?: string;
  }>;
  listCategory?: string[] | string;
  state?: Array<{
    _id: string;
    name: string;
  }>;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  updatedBy: {
    _id: string;
    name: string;
    email: string;
  };
  slug: string;
  excerpt?: string;
  seoTitle?: string;
  seoMetaDescription?: string;
  link1: {
    name: string;
    url: string;
  };
  link2: {
    name: string;
    url: string;
  };
  link3: {
    name: string;
    url: string;
  };
}

export interface SchemesResponse {
  success: boolean;
  data: ApiScheme[];
  message: string;
  total: number;
  length?: number;
}

export interface SchemeDetailResponse {
  success: boolean;
  data: ApiScheme | null;
  message: string;
}

export interface StateSchemeData {
  stateId: string;
  name: string;
  image: string;
  totalSchemes: number;
  slug?: string;
}

export interface StatesResponse {
  success: boolean;
  data: StateSchemeData[];
  message?: string;
}

export interface Category {
  categoryId: string;
  name: string;
  image: string | null;
  totalSchemes: number;
  slug?: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  message?: string;
}

// Discussion Interfaces
export interface Discussion {
  _id: string;
  scheme: {
    _id: string;
    schemeTitle: string;
    slug: string;
  };
  discussionTitle: string;
  discussionInBrief: string;
  name: string;
  mobileNo: string;
  gender: string;
  dateOfBirth: string;
  cast: string;
  religion: string;
  houseNumber: string;
  locality: string;
  city: string;
  wardNumber: string;
  tehsil: string;
  district: string;
  state: string | null;
  category: string[];
  pinCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DiscussionsResponse {
  success: boolean;
  length: number;
  message: string;
  data: Discussion[];
}

export interface DiscussionDetailResponse {
  success: boolean;
  message: string;
  data: Discussion;
}

export interface CreateDiscussionPayload {
  scheme: string;
  discussionTitle: string;
  discussionInBrief: string;
  name: string;
  mobileNo: string;
  gender: string;
  category: string[];
  dateOfBirth: string;
  cast: string;
  religion: string;
  houseNumber: string;
  locality: string;
  city: string;
  wardNumber: string;
  tehsil: string;
  district: string;
  state?: string;
  pinCode: string;
}

export interface Reply {
  _id: string;
  discussionId: {
    _id: string;
    discussionTitle: string;
  };
  yourName: string;
  yourEmail: string;
  subject: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RepliesResponse {
  success: boolean;
  count: number;
  message: string;
  data: Reply[];
}

export interface CreateReplyPayload {
  discussionId: string;
  yourName: string;
  yourEmail: string;
  subject: string;
  comment: string;
}


// -------------------------------------Below is only apis---------------------------------------------------------------


export const getAllSchemes = async (
  stateId?: string,
  categoryId?: string,
  limit?: number,
  skip?: number,
  signal?: AbortSignal,
  stateSlug?: string,
  categorySlug?: string
): Promise<SchemesResponse> => {
  try {
    let url = 'getAllSchemes';
    const params = new URLSearchParams();


    if (stateSlug) {
      params.append('stateSlug', stateSlug);
    }

    if (categorySlug) {
      params.append('categorySlug', categorySlug);
    }

    if (limit !== undefined) params.append('limit', String(limit));
    if (skip !== undefined) params.append('skip', String(skip));

    // Optional: cache buster to avoid 304
    params.append('_t', Date.now().toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await apiClient.get<SchemesResponse>(url, {
      signal: signal || undefined,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    return response.data;
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') {
      console.warn('Request aborted');
      return { success: false, data: [], message: 'Request aborted', total: 0 };
    }

    console.error('Error fetching schemes:', error);
    return { success: false, data: [], message: 'Failed to fetch schemes', total: 0 };
  }
};


export const getSchemeBySlug = async (
  id: string,
  signal?: AbortSignal
): Promise<SchemeDetailResponse> => {
  try {
    const response = await apiClient.get<SchemeDetailResponse>(`getSchemeBySlug/${id}`, { signal });
    return response.data;
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') {
      return {
        success: false,
        data: null,
        message: 'Request aborted'
      };
    }
    console.error('Error fetching scheme by ID:', error);
    return {
      success: false,
      data: null,
      message: 'Failed to fetch scheme details'
    };
  }
};


export const getSchemesByCategory = async (): Promise<CategoriesResponse> => {
  try {
    const response = await apiClient.get("/getSchemesByCategory");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const getSchemesByState = async (): Promise<StateSchemeData[]> => {
  try {
    const response = await apiClient.get<StatesResponse>("/getSchemesByState");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching schemes by state:", error);
    return [];
  }
};


export const searchSchemes = async (query: string): Promise<SchemesResponse> => {
  try {
    if (!query) {
      return {
        success: true,
        data: [],
        message: 'No query provided',
        total: 0
      };
    }

    const url = `searchScheme?query=${encodeURIComponent(query)}`;
    const response = await apiClient.get<SchemesResponse>(url);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to search schemes');
    }

    return response.data;
  } catch (error) {
    console.error('Error searching schemes:', error);
    return {
      success: false,
      data: [],
      message: 'Failed to search schemes. Please try again.',
      total: 0
    };
  }
};

// Discussion API Functions
export const getAllDiscussions = async (
  schemeId: string,
  signal?: AbortSignal
): Promise<DiscussionsResponse> => {
  try {
    const response = await apiClient.get<DiscussionsResponse>(
      `allDiscussions?schemeId=${schemeId}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') {
      return {
        success: false,
        length: 0,
        message: 'Request aborted',
        data: []
      };
    }
    console.error('Error fetching discussions:', error);
    return {
      success: false,
      length: 0,
      message: 'Failed to fetch discussions',
      data: []
    };
  }
};

export const getDiscussionById = async (
  discussionId: string,
  signal?: AbortSignal
): Promise<DiscussionDetailResponse> => {
  try {
    const response = await apiClient.get<DiscussionDetailResponse>(
      `getDiscussionById/${discussionId}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') {
      return {
        success: false,
        message: 'Request aborted',
        data: {} as Discussion
      };
    }
    console.error('Error fetching discussion:', error);
    return {
      success: false,
      message: 'Failed to fetch discussion details',
      data: {} as Discussion
    };
  }
};

export const createDiscussion = async (
  payload: CreateDiscussionPayload
): Promise<{ success: boolean; message: string; data?: unknown }> => {
  try {
    const response = await apiClient.post('registerDiscussion', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating discussion:', error);
    return {
      success: false,
      message: 'Failed to create discussion'
    };
  }
};

export const getAllReplies = async (
  discussionId: string,
  signal?: AbortSignal
): Promise<RepliesResponse> => {
  try {
    const response = await apiClient.get<RepliesResponse>(
      `allReply?discussionId=${discussionId}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') {
      return {
        success: false,
        count: 0,
        message: 'Request aborted',
        data: []
      };
    }
    console.error('Error fetching replies:', error);
    return {
      success: false,
      count: 0,
      message: 'Failed to fetch replies',
      data: []
    };
  }
};

export const createReply = async (
  payload: CreateReplyPayload
): Promise<{ success: boolean; message: string; data?: unknown }> => {
  try {
    const response = await apiClient.post('registerReply', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating reply:', error);
    return {
      success: false,
      message: 'Failed to create reply'
    };
  }
};