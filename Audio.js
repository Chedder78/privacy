import { useEffect, useRef } from 'react'
import * as Tone from 'tone'

export function useAudio() {
  const backgroundMusicRef = useRef(null)
  const laserSoundRef = useRef(null)
  
  const playBackgroundMusic = () => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination()
    const filter = new Tone.Filter(800, "lowpass").toDestination()
    const reverb = new Tone.Reverb(3).toDestination()
    synth.connect(filter)
    synth.connect(reverb)
    
    const loop = new Tone.Loop(time => {
      const notes = ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"]
      const note = notes[Math.floor(Math.random() * notes.length)]
      synth.triggerAttackRelease(note, "8n", time)
    }, "4n").start(0)
    
    Tone.Transport.bpm.value = 120
    Tone.Transport.start()
    
    backgroundMusicRef.current = {
      synth,
      filter,
      reverb,
      loop
    }
  }
  
  const playTargetSound = () => {
    const synth = new Tone.MonoSynth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.2,
        release: 0.4
      }
    }).toDestination()
    
    synth.triggerAttackRelease("C6", "16n")
  }
  
  const playLaserSound = () => {
    if (!laserSoundRef.current) {
      laserSoundRef.current = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 5,
        oscillator: {
          type: "square"
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.1,
          release: 0.2,
          attackCurve: "exponential"
        }
      }).toDestination()
    }
    
    laserSoundRef.current.triggerAttackRelease("A2", "16n")
  }
  
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        Tone.Transport.stop()
        backgroundMusicRef.current.loop.dispose()
        backgroundMusicRef.current.synth.dispose()
        backgroundMusicRef.current.filter.dispose()
        backgroundMusicRef.current.reverb.dispose()
      }
      if (laserSoundRef.current) {
        laserSoundRef.current.dispose()
      }
    }
  }, [])
  
  return {
    playTargetSound,
    playBackgroundMusic,
    playLaserSound
  }
}
