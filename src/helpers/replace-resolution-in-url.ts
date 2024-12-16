export function replaceResolutionInUrl(url: string, newResolution: string): string {
    return url.replace(/\/t\/x?\d+x\d+\//, `/t/${newResolution}/`);
}
