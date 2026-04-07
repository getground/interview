export interface Photo {
  originalURL: string;
  standardURL: string;
  thumbnailURL: string;
  mimeType: string;
}

export type Region = "North West" | "London" | "North East" | "South West" | "South East" | "Midlands" | "Scotland" | "Wales";

export interface AddressDetails {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  shortenedPostcode: string;
  country: string;
  region: Region;
}

export type PropertyType = "apartment" | "detached" | "semi-detached" | "terraced" | "end-terrace" ;

export interface Listing {
  addressDetails: AddressDetails;
  bedrooms: number;
  bathrooms: number;
  description: string;
  id: number;
  // The gross yield of a property is the annual rental income divided by the purchase price
  // This is a key metric for investors to consider when evaluating a property
  grossYield: number;
  isCashOnly: boolean;
  // If the listing is being sold as part of a company.
  // Having a rental unit under a company has certain tax benefits.
  isCompany: boolean;
  // A new build is a listing that is currently under construction.
  // Typically, less risk of maintenance issues.
  // But less potential for appreciation over time
  isNewBuild: boolean;
  // A share sale is a listing that is being sold as a share of a property
  isShareSale: boolean;
  // A tenanted property is a property that is currently being rented out
  // This is a key metric for investors to consider when evaluating a property
  isTenanted: boolean;
  madeVisibleAt?: string | null;
  // The estimated deposit required after fees
  estimatedDepositInCents: number;
  // The minimum deposit required to secure the property
  // This is the minimum deposit required to secure the property
  minimumDepositInCents: number;
  photos: Photo[];
  priceInCents: number;
  propertyType: PropertyType;
  monthlyRentalIncomeInCents: number;
  sizeSqFt: number;
}

export interface CreateListingRequest {
  addressDetails: {
    addressLine1?: string;
    addressLine2?: string;
    city: string;
    postcode?: string;
    shortenedPostcode: string;
    country?: string;
    region: Region;
  };
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  priceInCents: number;
  minimumDepositInCents: number;
  estimatedDepositInCents: number;
  monthlyRentalIncomeInCents: number;
  isTenanted: boolean;
  isCashOnly: boolean;
  isNewBuild?: boolean;
  isCompany?: boolean;
  isShareSale?: boolean;
  description: string;
  photos: Photo[];
  grossYield: number;
  madeVisibleAt?: string | null;
}

export interface UpdateListingRequest {
  addressDetails?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postcode?: string;
    shortenedPostcode?: string;
    country?: string;
    region?: Region;
  };
  propertyType?: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqFt?: number;
  priceInCents?: number;
  minimumDepositInCents?: number;
  estimatedDepositInCents?: number;
  monthlyRentalIncomeInCents?: number;
  isTenanted?: boolean;
  isCashOnly?: boolean;
  isNewBuild?: boolean;
  isCompany?: boolean;
  isShareSale?: boolean;
  description?: string;
  photos?: Photo[];
  grossYield?: number;
  madeVisibleAt?: string | null;
}

// Validation functions
export const validateCreateListing = (data: any): CreateListingRequest => {
  // Validate addressDetails
  if (!data.addressDetails || typeof data.addressDetails !== 'object') {
    throw new Error('Address details are required and must be an object');
  }
  
  if (!data.addressDetails.city || typeof data.addressDetails.city !== 'string') {
    throw new Error('City is required and must be a string');
  }
  
  if (!data.addressDetails.shortenedPostcode || typeof data.addressDetails.shortenedPostcode !== 'string') {
    throw new Error('Shortened postcode is required and must be a string');
  }
  
  if (!data.addressDetails.region || typeof data.addressDetails.region !== 'string') {
    throw new Error('Region is required and must be a string');
  }
  
  // Validate region against Region union type
  const validRegions: Region[] = ["North West", "London", "North East", "South West", "South East", "Midlands", "Scotland", "Wales"];
  if (!validRegions.includes(data.addressDetails.region as Region)) {
    throw new Error(`Region must be one of: ${validRegions.join(', ')}`);
  }
  
  if (!data.propertyType || typeof data.propertyType !== 'string') {
    throw new Error('Property type is required and must be a string');
  }
  
  // Validate propertyType against PropertyType union
  const validPropertyTypes: PropertyType[] = ["apartment", "detached", "semi-detached", "terraced", "end-terrace"];
  if (!validPropertyTypes.includes(data.propertyType as PropertyType)) {
    throw new Error(`Property type must be one of: ${validPropertyTypes.join(', ')}`);
  }
  
  if (typeof data.bedrooms !== 'number' || data.bedrooms < 0) {
    throw new Error('Bedrooms must be a non-negative number');
  }
  
  if (typeof data.bathrooms !== 'number' || data.bathrooms < 0) {
    throw new Error('Bathrooms must be a non-negative number');
  }
  
  if (typeof data.sizeSqFt !== 'number' || data.sizeSqFt <= 0) {
    throw new Error('Size in square feet must be a positive number');
  }
  
  if (typeof data.priceInCents !== 'number' || data.priceInCents < 0) {
    throw new Error('Price in cents must be a non-negative number');
  }
  
  if (typeof data.minimumDepositInCents !== 'number' || data.minimumDepositInCents < 0) {
    throw new Error('Minimum deposit in cents must be a non-negative number');
  }
  
  if (typeof data.estimatedDepositInCents !== 'number' || data.estimatedDepositInCents < 0) {
    throw new Error('Estimated deposit in cents must be a non-negative number');
  }
  
  if (typeof data.monthlyRentalIncomeInCents !== 'number' || data.monthlyRentalIncomeInCents < 0) {
    throw new Error('Rental income in cents must be a non-negative number');
  }
  
  if (typeof data.isTenanted !== 'boolean') {
    throw new Error('Is tenanted must be a boolean');
  }
  
  if (typeof data.isCashOnly !== 'boolean') {
    throw new Error('Is cash only must be a boolean');
  }
  
  if (!data.description || typeof data.description !== 'string') {
    throw new Error('Description is required and must be a string');
  }
  
  if (!Array.isArray(data.photos)) {
    throw new Error('Photos must be an array');
  }
  
  // Validate each photo
  data.photos.forEach((photo: any, index: number) => {
    if (!photo.originalURL || typeof photo.originalURL !== 'string') {
      throw new Error(`Photo ${index + 1} must have a valid originalURL`);
    }
    if (!photo.standardURL || typeof photo.standardURL !== 'string') {
      throw new Error(`Photo ${index + 1} must have a valid standardURL`);
    }
    if (!photo.thumbnailURL || typeof photo.thumbnailURL !== 'string') {
      throw new Error(`Photo ${index + 1} must have a valid thumbnailURL`);
    }
    if (!photo.mimeType || typeof photo.mimeType !== 'string') {
      throw new Error(`Photo ${index + 1} must have a valid mimeType`);
    }
  });
  
  if (typeof data.grossYield !== 'number' || data.grossYield < 0) {
    throw new Error('Gross yield must be a non-negative number');
  }
  
  return {
    addressDetails: {
      addressLine1: data.addressDetails.addressLine1?.trim() || '',
      addressLine2: data.addressDetails.addressLine2?.trim() || '',
      city: data.addressDetails.city.trim(),
      postcode: data.addressDetails.postcode?.trim() || '',
      shortenedPostcode: data.addressDetails.shortenedPostcode.trim(),
      country: data.addressDetails.country?.trim() || 'UK',
      region: data.addressDetails.region as Region,
    },
    propertyType: data.propertyType as PropertyType,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    sizeSqFt: data.sizeSqFt,
    priceInCents: data.priceInCents,
    minimumDepositInCents: data.minimumDepositInCents,
    estimatedDepositInCents: data.estimatedDepositInCents,
    monthlyRentalIncomeInCents: data.monthlyRentalIncomeInCents,
    isTenanted: data.isTenanted,
    isCashOnly: data.isCashOnly,
    isNewBuild: data.isNewBuild || false,
    isCompany: data.isCompany || false,
    isShareSale: data.isShareSale || false,
    description: data.description.trim(),
    photos: data.photos,
    grossYield: data.grossYield,
    madeVisibleAt: data.madeVisibleAt || null
  };
};

export const validateUpdateListing = (data: any): UpdateListingRequest => {
  const updateData: UpdateListingRequest = {};
  
  // Validate addressDetails if provided
  if (data.addressDetails !== undefined) {
    if (typeof data.addressDetails !== 'object' || data.addressDetails === null) {
      throw new Error('Address details must be an object');
    }
    
    const addressDetails: any = {};
    
    if (data.addressDetails.addressLine1 !== undefined) {
      if (typeof data.addressDetails.addressLine1 !== 'string') {
        throw new Error('Address line 1 must be a string');
      }
      addressDetails.addressLine1 = data.addressDetails.addressLine1.trim();
    }
    
    if (data.addressDetails.addressLine2 !== undefined) {
      if (typeof data.addressDetails.addressLine2 !== 'string') {
        throw new Error('Address line 2 must be a string');
      }
      addressDetails.addressLine2 = data.addressDetails.addressLine2.trim();
    }
    
    if (data.addressDetails.city !== undefined) {
      if (typeof data.addressDetails.city !== 'string') {
        throw new Error('City must be a string');
      }
      addressDetails.city = data.addressDetails.city.trim();
    }
    
    if (data.addressDetails.postcode !== undefined) {
      if (typeof data.addressDetails.postcode !== 'string') {
        throw new Error('Postcode must be a string');
      }
      addressDetails.postcode = data.addressDetails.postcode.trim();
    }
    
    if (data.addressDetails.shortenedPostcode !== undefined) {
      if (typeof data.addressDetails.shortenedPostcode !== 'string') {
        throw new Error('Shortened postcode must be a string');
      }
      addressDetails.shortenedPostcode = data.addressDetails.shortenedPostcode.trim();
    }
    
    if (data.addressDetails.country !== undefined) {
      if (typeof data.addressDetails.country !== 'string') {
        throw new Error('Country must be a string');
      }
      addressDetails.country = data.addressDetails.country.trim();
    }
    
    if (data.addressDetails.region !== undefined) {
      if (typeof data.addressDetails.region !== 'string') {
        throw new Error('Region must be a string');
      }
      
      // Validate region against Region union type
      const validRegions: Region[] = ["North West", "London", "North East", "South West", "South East", "Midlands", "Scotland", "Wales"];
      if (!validRegions.includes(data.addressDetails.region as Region)) {
        throw new Error(`Region must be one of: ${validRegions.join(', ')}`);
      }
      
      addressDetails.region = data.addressDetails.region as Region;
    }
    
    updateData.addressDetails = addressDetails;
  }
  
  if (data.propertyType !== undefined) {
    if (typeof data.propertyType !== 'string') {
      throw new Error('Property type must be a string');
    }
    
    // Validate propertyType against PropertyType union
    const validPropertyTypes: PropertyType[] = ["apartment", "detached", "semi-detached", "terraced", "end-terrace"];
    if (!validPropertyTypes.includes(data.propertyType as PropertyType)) {
      throw new Error(`Property type must be one of: ${validPropertyTypes.join(', ')}`);
    }
    
    updateData.propertyType = data.propertyType as PropertyType;
  }
  
  if (data.bedrooms !== undefined) {
    if (typeof data.bedrooms !== 'number' || data.bedrooms < 0) {
      throw new Error('Bedrooms must be a non-negative number');
    }
    updateData.bedrooms = data.bedrooms;
  }
  
  if (data.bathrooms !== undefined) {
    if (typeof data.bathrooms !== 'number' || data.bathrooms < 0) {
      throw new Error('Bathrooms must be a non-negative number');
    }
    updateData.bathrooms = data.bathrooms;
  }
  
  if (data.sizeSqFt !== undefined) {
    if (typeof data.sizeSqFt !== 'number' || data.sizeSqFt <= 0) {
      throw new Error('Size in square feet must be a positive number');
    }
    updateData.sizeSqFt = data.sizeSqFt;
  }
  
  if (data.priceInCents !== undefined) {
    if (typeof data.priceInCents !== 'number' || data.priceInCents < 0) {
      throw new Error('Price in cents must be a non-negative number');
    }
    updateData.priceInCents = data.priceInCents;
  }
  
  if (data.minimumDepositInCents !== undefined) {
    if (typeof data.minimumDepositInCents !== 'number' || data.minimumDepositInCents < 0) {
      throw new Error('Minimum deposit in cents must be a non-negative number');
    }
    updateData.minimumDepositInCents = data.minimumDepositInCents;
  }
  
  if (data.estimatedDepositInCents !== undefined) {
    if (typeof data.estimatedDepositInCents !== 'number' || data.estimatedDepositInCents < 0) {
      throw new Error('Estimated deposit in cents must be a non-negative number');
    }
    updateData.estimatedDepositInCents = data.estimatedDepositInCents;
  }
  
  if (data.monthlyRentalIncomeInCents !== undefined) {
    if (typeof data.monthlyRentalIncomeInCents !== 'number' || data.monthlyRentalIncomeInCents < 0) {
      throw new Error('Rental income in cents must be a non-negative number');
    }
    updateData.monthlyRentalIncomeInCents = data.monthlyRentalIncomeInCents;
  }
  
  if (data.isTenanted !== undefined) {
    if (typeof data.isTenanted !== 'boolean') {
      throw new Error('Is tenanted must be a boolean');
    }
    updateData.isTenanted = data.isTenanted;
  }
  
  if (data.isCashOnly !== undefined) {
    if (typeof data.isCashOnly !== 'boolean') {
      throw new Error('Is cash only must be a boolean');
    }
    updateData.isCashOnly = data.isCashOnly;
  }
  
  if (data.isNewBuild !== undefined) {
    if (typeof data.isNewBuild !== 'boolean') {
      throw new Error('Is new build must be a boolean');
    }
    updateData.isNewBuild = data.isNewBuild;
  }
  
  if (data.isCompany !== undefined) {
    if (typeof data.isCompany !== 'boolean') {
      throw new Error('Is company must be a boolean');
    }
    updateData.isCompany = data.isCompany;
  }
  
  if (data.isShareSale !== undefined) {
    if (typeof data.isShareSale !== 'boolean') {
      throw new Error('Is share sale must be a boolean');
    }
    updateData.isShareSale = data.isShareSale;
  }
  
  if (data.description !== undefined) {
    if (typeof data.description !== 'string') {
      throw new Error('Description must be a string');
    }
    updateData.description = data.description.trim();
  }
  
  if (data.photos !== undefined) {
    if (!Array.isArray(data.photos)) {
      throw new Error('Photos must be an array');
    }
    
    // Validate each photo
    data.photos.forEach((photo: any, index: number) => {
      if (!photo.originalURL || typeof photo.originalURL !== 'string') {
        throw new Error(`Photo ${index + 1} must have a valid originalURL`);
      }
      if (!photo.standardURL || typeof photo.standardURL !== 'string') {
        throw new Error(`Photo ${index + 1} must have a valid standardURL`);
      }
      if (!photo.thumbnailURL || typeof photo.thumbnailURL !== 'string') {
        throw new Error(`Photo ${index + 1} must have a valid thumbnailURL`);
      }
      if (!photo.mimeType || typeof photo.mimeType !== 'string') {
        throw new Error(`Photo ${index + 1} must have a valid mimeType`);
      }
    });
    
    updateData.photos = data.photos;
  }
  
  if (data.grossYield !== undefined) {
    if (typeof data.grossYield !== 'number' || data.grossYield < 0) {
      throw new Error('Gross yield must be a non-negative number');
    }
    updateData.grossYield = data.grossYield;
  }
  
  if (data.madeVisibleAt !== undefined) {
    updateData.madeVisibleAt = data.madeVisibleAt || null;
  }
  
  return updateData;
}; 