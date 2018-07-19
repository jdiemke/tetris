export class FullscreenUtils {

    public static fullscreen(stuff: any): void {
        const doc = stuff;
        if ('requestFullscreen' in doc) {
            doc['requestFullscreen']();
        } else if ('webkitRequestFullScreen' in doc) {
            doc['webkitRequestFullScreen']();
        } else if ('mozRequestFullScreen' in doc) {
            doc['mozRequestFullScreen']();
        } else if ('msRequestFullscreen' in doc) {
            doc['msRequestFullscreen']();
        }
    }

}