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
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  message?: string;
}


// -------------------------------------Below is only apis---------------------------------------------------------------


export const getAllSchemes = async (
  stateId?: string,
  categoryId?: string,
  limit?: number,
  skip?: number,
  signal?: AbortSignal
): Promise<SchemesResponse> => {
  try {
    let url = 'getAllSchemes';
    const params = new URLSearchParams();

    if (stateId) params.append('stateId', stateId);
    if (categoryId) params.append('categoryId', categoryId);
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