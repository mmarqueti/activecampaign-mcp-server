export interface ActiveCampaignContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  fieldValues?: Array<{
    field: string;
    value: string;
  }>;
  tags?: string[];
  lists?: Array<{
    list: string;
    status: string;
  }>;
  cdate?: string;
  udate?: string;
}

export interface TrackingEvent {
  id: string;
  type: string;
  tstamp: string;
  contact: string;
  campaign?: string;
  automation?: string;
  email?: string;
  link?: string;
  value?: string;
  description?: string;
  eventdata?: any;
}

export interface TrackingLogResponse {
  trackingLogs: TrackingEvent[];
  meta: {
    total: number;
    count: number;
    limit: number;
    offset: number;
  };
}

export interface TrackingOptions {
  limit?: number;
  offset?: number;
  eventType?: string;
  dateRange?: { start?: string; end?: string };
} 