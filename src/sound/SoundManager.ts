export class SoundManager {

    private audioContext: AudioContext;
    private sounds: Map<number, AudioBuffer> = new Map<number, AudioBuffer>();

    public constructor() {
        this.audioContext = new AudioContext();
    }

    public loadSound(sound: number, filename: string): Promise<void> {
        return fetch(filename)
            .then((response: Response) => response.arrayBuffer())
            .then((arrayBuffer: ArrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => {
                this.sounds.set(sound, audioBuffer);
            });
    }

    public play(sound: number) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds.get(sound);
        source.connect(this.audioContext.destination);
        source.start();
    }

}
