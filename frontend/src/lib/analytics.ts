/**
 * Google Analytics (GA4) Custom Event Tracking Utility
 * 
 * Safely checks for window.gtag before sending events to ensure no errors
 * occur if GA4 is blocked by adblockers or unavailable.
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    } else if (
      // @ts-ignore
      import.meta.env.DEV
    ) {
      // Log to console in development if GA is not loaded
      console.log(`[GA4 Track Event]: ${eventName}`, params);
    }
  } catch (error) {
    console.error(`[GA4 Error] Failed to track event ${eventName}:`, error);
  }
};

/**
 * Reusable section view tracker hook (optional usage)
 * usage:
 * useEffect(() => {
 *   if (isVisible) trackEvent('section_view', { section: 'resume' });
 * }, [isVisible]);
 */
