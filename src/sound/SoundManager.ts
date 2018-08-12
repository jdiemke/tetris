import music from '../assets/music/chipphopp.xm';
//import music from '../assets/music/4mat-truck_is_jarig.xm';

// Side effect imports because jsxm exposes its player through a global scope object
import 'jsxm/xm';
import 'jsxm/xmeffects';

export class SoundManager {

    private audioContext: AudioContext;
    private sounds: Map<number, AudioBuffer> = new Map<number, AudioBuffer>();

    public constructor() {
        XMPlayer.init();

        // this.audioContext = new AudioContext();
        this.audioContext = XMPlayer.audioctx;

       // this.playExtendedModule(music);
    }

    public loadSound(sound: number, filename: string): Promise<void> {
        return fetch(filename)
            .then((response: Response) => response.arrayBuffer())
            .then((arrayBuffer: ArrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => {
                this.sounds.set(sound, audioBuffer);
            });
    }

    public loadExtendedModule(filename: string): Promise<ArrayBuffer> {
        return fetch(filename)
            .then((response: Response) => response.arrayBuffer());
    }

    public playExtendedModule(filename: string) {
        return fetch(filename)
            .then((response: Response) => response.arrayBuffer())
            .then((arrayBuffer: ArrayBuffer) => {
                if (arrayBuffer) {
                    XMPlayer.load(arrayBuffer);
                    XMPlayer.play();
                } else {
                    console.log('unable to load', filename);
                }
            });
    }

    // TODO: check whether we have to dealocate the buffer and gain node?
    public play(sound: number) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds.get(sound);
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0.3;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start();
    }

}
