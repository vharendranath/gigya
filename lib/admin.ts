import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import { BaseParamsSite } from './interfaces/base-params';

export * from './interfaces/gigya-response';
export * from './interfaces/base-params';

export class Admin {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This method creates a new site.
     * 
     * @see http://developers.gigya.com/display/GD/admin.createSite+REST
     */
    public createSite(params: BaseParamsSite & AdminCreateSiteParams) {
        return this.gigya.request<AdminCreateSiteResponse>('admin.createSite', params);
    }

    /**
     * This API retrieves a partner's previously-saved ACL and its description, or a built-in ACL.
     * 
     * @see http://developers.gigya.com/display/GD/admin.getACL+REST
     */
    public getEffectiveACL(params: BaseParamsSite & (AdminGetEffectiveACLTargetUserKeyParams | AdminGetEffectiveACLGroupIDsParams)) {
        return this.gigya.request<AdminGetEffectiveACLResponse>('admin.getEffectiveACL', params);
    }

    /**
     * This API retrieves a specified partner's information.
     * 
     * @see http://developers.gigya.com/display/GD/admin.getPartner+REST
     */
    public getPartner(params: BaseParamsSite & AdminGetPartnerParams) {
        return this.gigya.request<AdminGetPartnerResponse>('admin.getPartner', params);
    }

    /**
     * This API retrieves a partner's previously-saved ACL and its description, or a built-in ACL.
     * 
     * @see http://developers.gigya.com/display/GD/admin.getACL+REST
     */
    public getSiteConfig(params: BaseParamsSite & AdminGetSiteConfigParams) {
        return this.gigya.request<AdminGetSiteConfigResponse>('admin.getSiteConfig', params);
    }

    /**
     * This API returns either all sites with which a user is associated by way of group memberships or all sites in a specific partner with which a user is associated.
     * 
     * @see http://developers.gigya.com/display/GD/admin.getUserSites+REST
     */
    public getUserSites(params: BaseParamsSite & AdminGetUserSitesParams) {
        return this.gigya.request<AdminGetUserSitesResponse>('admin.getUserSites', params);
    }

    /**
     * This method searches the partner IDs, site IDs, base domains, and company names.
     * 
     * @see http://developers.gigya.com/display/GD/admin.search+REST
     */
    public search(params: BaseParamsSite & AdminSearchParams) {
        return this.gigya.request<AdminSearchResponse>('admin.search', params);
    }

    /**
     * This method sets the configuration for existing sites.
     * 
     * @see http://developers.gigya.com/display/GD/admin.setSiteConfig+REST
     */
    public setSiteConfig(params: BaseParamsSite & AdminSetSiteConfigParams) {
        return this.gigya.request('admin.setSiteConfig', params);
    }
}

export interface AdminCreateSiteParams {
    partnerID: number | string;
    baseDomain: string;
    description?: string;
    dataCenter?: string;
}
export interface AdminCreateSiteResponse {
    apiKey: string;
}

export interface AdminGetEffectiveACLTargetUserKeyParams {
    partnerID: number | string;
    targetUserKey: string;
    apiKey?: string;
}
export interface AdminGetEffectiveACLGroupIDsParams {
    partnerID: number | string;
    groupIds: string;
    apiKey?: string;
}
export interface AdminGetEffectiveACLResponse {
    eACL: {
        _api: {
            [namespace: string]: {
                [method: string]: {
                    _ace: { perms: 'x' }
                }
            }
        },
        _inherit: Array<string>;
    }
}

export interface AdminServices {
    gm?: {
        enabled: boolean;
    };
    comments?: {
        enabled: boolean;
    };
    accounts?: {
        enabled: boolean;
        features: Array<string>;
    };
    audit?: {
        enabled: boolean;
    }
    ds?: {
        enabled: boolean;
    };
    ids?: {
        enabled: boolean;
    };
    samlIdp?: {
        enabled: boolean;
    };
    nexus?: {
        enabled: boolean;
        features: Array<string>;
    };
    defaultDBSize: string;
    defaultDataCenter: string;
    customData: {
        websiteURL: string;
        companyName: string;
    };
    secretKey: string;
};
export interface AdminGetPartnerParams {
    partnerID: number | string;
}
export interface AdminGetPartnerResponse {
    partnerID: number;
    isTrial: boolean;
    isEnabled: boolean;
    services: AdminServices;
    defaultDataCenter: string;
    customData: {
        websiteURL: string;
        companyName: string;
    };
    secretKey: string;
}

export interface AdminUserSite {
    siteID: number;
    apiKey: string;
    baseDomain: string;
    description: string;
    dataCenter: string;
}
export interface AdminGetUserSitesParams {
    targetUserKey?: string;
    targetPartnerID?: number;
}
export interface AdminGetUserSitesResponse {
    sites: Array<{
        partnerID: number;
        sites: Array<AdminUserSite>;
    }>;
}

export interface AdminGetSiteConfigParams {
    apiKey: string;
    includeServices?: boolean;
    includeSiteGroupConfig?: boolean;
    includeSiteID?: boolean;
    explicitSiteGroupConfig?: boolean;
    explicitSiteConfig?: boolean;
    includeGigyaSettings?: boolean;
    includeGlobalConf?: boolean;
}
export interface AdminGetSiteConfigResponse {
    baseDomain: string;
    dataCenter: string;
    trustedSiteURLs: Array<string>;
    description: string;
    services: AdminServices;
    siteID: number;
    gigyaSettings: {
        enableRequestLoggingUntil: string;
        dsSize: string;
        enableSSLForCNAME: boolean;
        customAPIDomainPrefix: string;
    };
    settings: {
        CNAME: string;
        shortURLDomain: string;
        shortURLRedirMethod: string;
    };
    siteGroupConfig: {
        members?: Array<string>;
        enableSSO: boolean;
        SSOSegment: string; // It's always returned, but may be an empty string.
    };
    siteGroupOwner?: string;
    enableDataSharing: boolean;
    trustedShareURLs: Array<string>;
    logoutURL?: string;
    globalConf?: string;
}

export interface AdminSetSiteConfigParams {
    apiKey: string;
    baseDomain?: string;
    dataCenter?: string;
    trustedSiteURL?: Array<string>;
    description?: string;
    logoutURL?: string;
    services?: {
        gm?: {
            enabled: boolean;
        };
        comments?: {
            enabled: boolean;
        };
        accounts?: {
            enabled: boolean;
            features: Array<string>;
        };
        audit?: {
            enabled: boolean;
        }
        ds?: {
            enabled: boolean;
        };
        ids?: {
            enabled: boolean;
        };
        samlIdp?: {
            enabled: boolean;
        };
        nexus?: {
            enabled: boolean;
            features: Array<string>;
        };
        defaultDBSize?: string;
        defaultDataCenter?: string;
        customData?: {
            websiteURL?: string;
            companyName?: string;
        };
    }
    gigyaSettings?: {
        enableRequestLoggingUntil?: string;
        dsSize?: string;
        enableSSLForCNAME?: boolean;
        customAPIDomainPrefix?: string;
    };
    settings?: {
        CNAME?: string;
        shortURLDomain?: string;
        shortURLRedirMethod?: string;
    };
    siteGroupConfig?: {
        enableSSO?: boolean;
        SSOSegment?: string;
    };
    siteGroupOwner?: string | null;
    enableDataSharing?: boolean;
    trustedShareURLs?: Array<string>;
    globalConf?: string;
}

export interface AdminSearchParams {
    query: string;
}
export interface AdminSearchResponse {
    data: Array<{
        partnerID: number;
        companyName: string;
        isTrial: boolean;
    }>;
}

export default Admin;
