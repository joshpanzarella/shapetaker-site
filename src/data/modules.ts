import { Activity, AudioLines, Compass, Drum, Eye, Gauge, Hourglass, Music, PenLine, Shuffle, SlidersHorizontal, Sparkles, Split, Square, Filter, Layers, Tv, Waves, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Hotspot = {
  id: string;
  label: string;
  type: "knob" | "switch" | "jack" | "meter";
  x: number;
  y: number;
  size: number;
  description: string | string[];
  tip: string;
  voltageRange?: string;
  diagrams?: Array<{
    id: string;
    label: string;
    icon?: string;
    svg?: string;
    color?: string;
    rotation?: number;
    state?: 'up' | 'down';
    tracePath?: string;
  }>;
};

export type ManualSection = {
  title: string;
  body: string;
};

export type ContextMenuItem = {
  id: string;
  group: string;
  label: string;
  kind: "toggle" | "choice" | "slider";
  values?: string[];
  description: string | string[];
};

export type PatchPort = {
  id: string;
  label: string;
  side: "left" | "right";
  offsetY: number;
  icon?: "triangle" | "sine" | "square" | "saw";
};

export type PatchNode = {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  ports: PatchPort[];
  settings?: { label: string; value: string | number }[];
};

export type PatchCable = {
  id: string;
  fromNode: string;
  fromPort: string;
  toNode: string;
  toPort: string;
  color: string;
};

export type PatchStep = {
  instruction: string;
  detail?: string;
  cableIds: string[];
};

export type SuggestedPatch = {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  audioUrl?: string;
  viewBox: string;
  nodes: PatchNode[];
  cables: PatchCable[];
  steps: PatchStep[];
};

export type ModuleSpec = {
  slug: string;
  name: string;
  hidden?: boolean;
  subtitle: string;
  summary: string;
  category: string;
  status: string;
  accent: string;
  accentSoft: string;
  icon: LucideIcon;
  hp: number;
  panelImage?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  controls: Hotspot[];
  contextMenu?: ContextMenuItem[];
  manual: ManualSection[];
  audioSamples?: {
    title: string;
    url: string;
  }[];
  media: {
    audioDemos?: { title: string; src: string; description?: string }[];
    video?: string;
  };
  suggestedPatches?: SuggestedPatch[];
  typeplate?: {
    unit: string;
    type: string;
    alt?: string;
  };
};

export type ModuleExplorerData = Pick<
  ModuleSpec,
  "name" | "accent" | "controls" | "panelImage" | "contextMenu" | "subtitle" | "summary" | "status" | "hp" | "typeplate"
>;

export const modules: ModuleSpec[] = [
  {
    slug: "clairaudient",
    name: "clairaudient",
    subtitle: "polyphonic dual sigmoid oscillator whose pitch-locked voice engine animates every note from within, with reverse-sync chaos and true mono-to-wide stereo imaging",
    summary: "Two sigmoid cores, V and Z, blended by a crossfader and animated by an audio-rate voice engine locked to each note's pitch, vowels, brass, and voices emerge inside the tone with no patching at all. Reverse sync and a chance control supply the chaos.",
    category: "vcv rack modules",
    status: "STEREO OSCILLATOR",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: AudioLines,
    hp: 18,
    panelImage: {
      src: "/modules/clairaudient/panel-v6.webp",
      width: 1350,
      height: 1900,
      alt: "clairaudient vcv rack module panel"
    },
    media: {
      audioDemos: [
        {
          title: "harmonic drift",
          src: "/modules/clairaudient/clair-demo-1.wav",
          description: "Two voices tuned a fifth apart, crossfading slowly through the V Shape range while the Z oscillator drifts via an LFO on Z Shape CV.",
        },
        {
          title: "bass scream",
          src: "/modules/clairaudient/clair-bass-scream.wav",
          description: "",
        },
      ],
    },
    controls: [
      {
        id: "scope",
        label: "oscilloscope",
        type: "meter",
        x: 50.0,
        y: 18.9,
        size: 30,
        description: [
          "lissajous mode plots left against right: diagonal means mono, open ellipse means stereo, woolly cloud means wide",
          "waveform mode traces left with right ghosted behind, watch the voice engine bend the sigmoid live",
          "color themes (phosphor, ice, solar, amber) live in the context menu",
        ],
        tip: "learn the voice engine in waveform view, every DEPTH, RATIO, and ASYM move shows immediately.",
        diagrams: [
          {
            id: "scope-liss-mono",
            label: "lissajous: mono",
            tracePath: "M 60,140 L 140,60"
          },
          {
            id: "scope-liss-wide",
            label: "lissajous: wide",
            tracePath: "M 55,100 C 55,72 75,55 100,55 C 125,55 145,72 145,100 C 145,128 125,145 100,145 C 75,145 55,128 55,100 Z"
          },
          {
            id: "scope-waveform",
            label: "waveform trace",
            tracePath: "M 30,100 C 40,45 55,45 65,100 C 70,128 78,128 84,100 C 94,45 109,45 119,100 C 124,128 132,128 138,100 C 148,45 163,45 173,100"
          }
        ]
      },
      {
        id: "v-freq",
        label: "v freq",
        type: "knob",
        x: 16.7,
        y: 15.4,
        size: 16,
        description: [
          "Core V pitch in whole-octave steps (±2).",
          "its Quantize box in the context menu defeats the stepping for continuous sweeps, V and Z unquantize independently",
        ],
        tip: "set V's register first, then tune Z against it.",
        diagrams: [
          { id: "v-freq--2", label: "-2 octaves", icon: "ChevronsDown", rotation: -135 },
          { id: "v-freq--1", label: "-1 octave", icon: "ChevronDown", rotation: -67.5 },
          { id: "v-freq-0", label: "0 oct", icon: "Minus", rotation: 0 },
          { id: "v-freq-+1", label: "+1 octave", icon: "ChevronUp", rotation: 67.5 },
          { id: "v-freq-+2", label: "+2 octaves", icon: "ChevronsUp", rotation: 135 }
        ]
      },
      {
        id: "z-freq",
        label: "z freq",
        type: "knob",
        x: 83.3,
        y: 15.4,
        size: 16,
        description: [
          "Core Z pitch in semitones (±24).",
          "its Quantize box frees this knob for continuous sweeps, independent of V.",
        ],
        tip: "start a fifth or octave from V, intervals are where sync sings.",
        diagrams: [
          { id: "z-freq--24", label: "-24 st", icon: "ChevronsDown", rotation: -135 },
          { id: "z-freq--12", label: "-12 st", icon: "ChevronDown", rotation: -67.5 },
          { id: "z-freq-0", label: "0 st", icon: "Minus", rotation: 0 },
          { id: "z-freq-+7", label: "+7 st (fifth)", icon: "ChevronUp", rotation: 39 },
          { id: "z-freq-+24", label: "+24 st", icon: "ChevronsUp", rotation: 135 }
        ]
      },
      {
        id: "v-fine",
        label: "v fine tune",
        type: "knob",
        x: 28.9,
        y: 36.2,
        size: 12,
        description: "Core V fine tune, ±20 cents.",
        tip: "a few cents between V and Z gives slow chorus-like beating, no patching needed.",
      },
      {
        id: "z-fine",
        label: "z fine tune",
        type: "knob",
        x: 70.9,
        y: 36.2,
        size: 12,
        description: "Core Z fine tune, ±20 cents.",
        tip: "the FINE CV inputs are scaled for delicate vibrato.",
      },
      {
        id: "v-shape",
        label: "v shape",
        type: "knob",
        x: 11.2,
        y: 45.7,
        size: 14,
        description: [
          "sweeps the sigmoid: sawtooth to square-like in the first half, then ever sharper past square.",
          "the voice engine has the most to work with near the middle.",
        ],
        tip: "if FORMANT DEP. seems quiet, raise Shape toward middle, a bare saw gives the engine nothing to bend.",
      },
      {
        id: "z-shape",
        label: "z shape",
        type: "knob",
        x: 88.6,
        y: 44.4,
        size: 14,
        description: "Core Z's sigmoid sweep, same behavior as V, fully independent.",
        tip: "shape V and Z differently, then sweep the crossfade between two characters.",
      },
      {
        id: "xfade",
        label: "crossfade",
        type: "knob",
        x: 50.0,
        y: 45.0,
        size: 18,
        description: [
          "proportional mix of Core V and Core Z.",
          "equal power (default) holds loudness steady; stereo swap pans V hard left and Z hard right, trading places as you sweep.",
        ],
        tip: "modulate this with a slow LFO in stereo swap, the cores pass through each other.",
      },
      {
        id: "xsync",
        label: "xsync",
        type: "switch",
        x: 28.9,
        y: 50.8,
        size: 9,
        description: "Core V hard-resets Core Z's phase each cycle; sweeping Z's pitch then gives tearing harmonic sweeps.",
        tip: "classic hard sync: V anchors, Z sweeps.",
        diagrams: [
          { id: "xsync-off", label: "free running", icon: "Unlink", state: "down" as const },
          { id: "xsync-on", label: "v resets z", icon: "Link", state: "up" as const },
        ],
      },
      {
        id: "rev-sync",
        label: "rev. sync",
        type: "switch",
        x: 71.0,
        y: 50.6,
        size: 9,
        description: [
          "OFF: both cores run free.",
          "ON: V flips Z's direction each cycle, left and right on opposite edges.",
          "MUTUAL: Z flips V back, chaotic.",
        ],
        tip: "start at ON, then MUTUAL when decorum is no longer required.",
        diagrams: [
          { id: "rev-off", label: "off, free", icon: "Minus" },
          { id: "rev-on", label: "on, v flips z", icon: "ArrowLeftRight" },
          { id: "rev-mutual", label: "mutual, both flip", icon: "Shuffle" },
        ],
      },
      {
        id: "rev-chance",
        label: "rev. chance",
        type: "knob",
        x: 70.0,
        y: 60.5,
        size: 12,
        description: [
          "100% lands every flip on schedule; lower values make each flip probabilistic.",
          "an internal guard keeps 100% stable in MUTUAL mode.",
        ],
        tip: "sweep 60–100% with MUTUAL engaged, the signature live move.",
      },
      {
        id: "rev-ch-atten",
        label: "rev. ch. atten.",
        type: "knob",
        x: 30.0,
        y: 60.5,
        size: 11,
        description: "bipolar attenuverter for REV. CH. CV: ±100 percentage points over 0–10 V, clamped to 0–100%.",
        tip: "patch stepped random here and every voice rolls its own dice.",
      },
      {
        id: "formant-depth",
        label: "formant dep.",
        type: "knob",
        x: 11.1,
        y: 74.7,
        size: 14,
        description: [
          "how far the voice engine bends the curve each cycle, zero is frozen and traditional.",
          "the lower quarter stays subtle; the voice clears its throat from the midpoint up.",
        ],
        tip: "pitch-locked, so every transposed note keeps its voice.",
      },
      {
        id: "formant-ratio",
        label: "formant ratio",
        type: "knob",
        x: 33.7,
        y: 74.7,
        size: 14,
        description: [
          "modulator speed as a multiple of pitch: ×0.5, ×1, ×1.5, ×2, ×3, ×4, ×5, ×7.",
          "low ratios give vowels and brass, high ones turn metallic; ×0.5 adds a growling octave-down.",
        ],
        tip: "start at ×2 for vocal shimmer, step up to turn vowels into bells.",
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 68.9,
        y: 75.4,
        size: 14,
        description: [
          "mono-to-wide, 0–200%: 0% is mono, 100% natural stereo.",
          "past center the channels' motion drifts out of phase, at 200% the formants sweep in opposition.",
        ],
        tip: "mono-safe at any setting; extreme settings add a touch of saturation by design.",
      },
      {
        id: "asymmetry",
        label: "asymmetry",
        type: "knob",
        x: 88.6,
        y: 74.7,
        size: 14,
        description: [
          "skews wave symmetry, pouring missing even harmonics into hollow odd-only tones: brass, reeds, voice.",
          "strongest at high Shape, nearly inaudible at low; in PWM mode it skews the modulation trajectory instead.",
        ],
        tip: "sweep up from zero at high Shape: woodwind becomes brass section.",
      },
      {
        id: "v-fine-atten",
        label: "v fine cv atten.",
        type: "knob",
        x: 11.1,
        y: 30.0,
        size: 10,
        description: "attenuverter for V FINE CV, scaled for vibrato.",
        tip: "keep it low, ±20 cents needs little CV.",
      },
      {
        id: "z-fine-atten",
        label: "z fine cv atten.",
        type: "knob",
        x: 88.6,
        y: 30.0,
        size: 10,
        description: "attenuverter for Z FINE CV.",
        tip: "opposite-polarity vibrato on V and Z widens the image without WIDTH.",
      },
      {
        id: "v-shape-atten",
        label: "v shape cv atten.",
        type: "knob",
        x: 11.1,
        y: 60.5,
        size: 10,
        description: "attenuverter for V SHAPE CV.",
        tip: "audio-rate modulation welcome, start small.",
      },
      {
        id: "z-shape-atten",
        label: "z shape cv atten.",
        type: "knob",
        x: 88.6,
        y: 60.5,
        size: 10,
        description: "attenuverter for Z SHAPE CV.",
        tip: "envelope here with XSYNC on is the classic sync sweep.",
      },
      {
        id: "xfade-atten",
        label: "crossfade cv atten.",
        type: "knob",
        x: 50.0,
        y: 60.5,
        size: 10,
        description: "attenuverter for CROSSFADE CV.",
        tip: "slow sine here in stereo swap mode is the big ensemble move.",
      },
      {
        id: "xfade-cv",
        label: "crossfade cv",
        type: "jack",
        x: 50.0,
        y: 69.7,
        size: 9,
        description: "CV input for the master mix, scaled by the attenuverter above.",
        tip: "polyphonic, each voice can sit between V and Z.",
      },
      {
        id: "rev-ch-cv",
        label: "rev. ch. cv",
        type: "jack",
        x: 50.0,
        y: 78.7,
        size: 9,
        description: "0–10 V input for flip chance, scaled by REV. CH. ATTEN.; polyphonic, each voice rolls independently.",
        tip: "an LFO here automates the 60–100% sweep.",
        voltageRange: "0–10V"
      },
      {
        id: "v-oct-v",
        label: "v/oct (v)",
        type: "jack",
        x: 8.9,
        y: 86.8,
        size: 9,
        description: "1 V/oct pitch input for Core V; the widest cable patched anywhere sets the voice count (up to 16).",
        tip: "a mono cable broadcasts to every voice.",
        voltageRange: "1V/OCT"
      },
      {
        id: "v-fine-cv",
        label: "fine cv (v)",
        type: "jack",
        x: 21.1,
        y: 86.8,
        size: 9,
        description: "CV input for V fine tune.",
        tip: "pairs with the hex attenuverter by V FREQ.",
      },
      {
        id: "v-shape-cv",
        label: "shape cv (v)",
        type: "jack",
        x: 32.6,
        y: 86.8,
        size: 9,
        description: "CV input for V's sigmoid shape; audio rate welcome.",
        tip: "patch the right output back here for chaotic feedback.",
      },
      {
        id: "out-l",
        label: "+ out (left)",
        type: "jack",
        x: 44.1,
        y: 86.8,
        size: 9,
        description: "left master output (brass jacks); use alone for mono, or set WIDTH to 0% for true mono collapse.",
        tip: "all voices sum onto both outputs.",
        voltageRange: "±5V"
      },
      {
        id: "out-r",
        label: "− out (right)",
        type: "jack",
        x: 55.6,
        y: 86.8,
        size: 9,
        description: "right master output; same channel count as left.",
        tip: "at WIDTH 200% the outputs carry opposing formant motion.",
        voltageRange: "±5V"
      },
      {
        id: "v-oct-z",
        label: "v/oct (z)",
        type: "jack",
        x: 67.8,
        y: 86.8,
        size: 9,
        description: [
          "1 V/oct pitch input for Core Z, normalized to the V input.",
          "per-voice: uncovered channels follow their V counterparts.",
        ],
        tip: "two chord sequences into V and Z pair by channel; sync reacts within each pair.",
        voltageRange: "1V/OCT"
      },
      {
        id: "z-fine-cv",
        label: "fine cv (z)",
        type: "jack",
        x: 79.3,
        y: 86.8,
        size: 9,
        description: "CV input for Z fine tune.",
        tip: "slow independent LFOs on V and Z fine make the ensemble breathe.",
      },
      {
        id: "z-shape-cv",
        label: "shape cv (z)",
        type: "jack",
        x: 90.7,
        y: 86.8,
        size: 9,
        description: "CV input for Z's sigmoid shape; audio rate welcome.",
        tip: "with XSYNC on, an envelope here is the classic tearing sweep.",
      }
    ],
    contextMenu: [
      {
        id: "quantize-v",
        group: "settings",
        label: "quantize: v oscillator",
        kind: "toggle",
        description: "On by default: V FREQ snaps to octaves. Off gives continuous sweeps on V alone."
      },
      {
        id: "quantize-z",
        group: "settings",
        label: "quantize: z oscillator",
        kind: "toggle",
        description: "On by default: Z FREQ snaps to semitones. Independent of V."
      },
      {
        id: "oscilloscope-display",
        group: "settings",
        label: "oscilloscope display",
        kind: "choice",
        values: ["lissajous (x-y)", "waveform (triggered)"],
        description: [
          "lissajous (default): left vs. right, diagonal is mono, ellipse is stereo, cloud is wide",
          "waveform: triggered left trace with right ghosted behind"
        ]
      },
      {
        id: "oscilloscope-theme",
        group: "settings",
        label: "oscilloscope theme",
        kind: "choice",
        values: ["phosphor", "ice", "solar", "amber"],
        description: [
          "phosphor: vintage-CRT green",
          "ice: cyan and blue-white",
          "solar: amber-red",
          "amber: classic-terminal amber, shared across shapetaker modules or per-module"
        ]
      },
      {
        id: "waveform-mode",
        group: "settings",
        label: "waveform",
        kind: "choice",
        values: ["sigmoid saw", "pwm"],
        description: [
          "sigmoid saw: the morphing sigmoid; all voice controls work as labeled",
          "pwm: band-limited pulse, Shape sets width (5–95%), DEP. applies pitch-locked PWM, ASYMMETRY skews its trajectory"
        ]
      },
      {
        id: "crossfade-curve",
        group: "settings",
        label: "crossfade curve",
        kind: "choice",
        values: ["equal power", "stereo swap"],
        description: [
          "equal power: centered blend, steady volume",
          "stereo swap: V starts hard left, Z hard right; sweeping trades them across the field"
        ]
      },
      {
        id: "oversampling",
        group: "settings",
        label: "oversampling",
        kind: "choice",
        values: ["1x (off)", "2x", "4x", "8x"],
        description: [
          "4× default, clean under sync and audio-rate shape modulation",
          "8× for MUTUAL sync or aggressive shape CV at high pitch; 1× for lowest CPU"
        ]
      },
      {
        id: "vintage",
        group: "character",
        label: "vintage",
        kind: "slider",
        description: [
          "one macro for analog imperfection: thermal drift, per-voice tolerances, crosstalk, bus saturation",
          "50% is factory intent; below cleans toward digital, full clockwise is a failing power supply"
        ]
      },
      {
        id: "oscillator-noise",
        group: "character",
        label: "oscillator noise",
        kind: "slider",
        description: "Hardware-like noise floor plus phase jitter that softens edges, vintage VCO instability."
      }
    ],
    manual: [
      {
        title: "the voice engine",
        body: "An audio-rate modulator locked to each oscillator's pitch bends the sigmoid from within. DEP. sets depth, RATIO speed as a musical multiple of pitch, ASYMMETRY adds even harmonics, and WIDTH pushes the channels' motion out of phase, opposing formant sweeps at 200%."
      },
      {
        title: "sigmoid oscillators",
        body: "V and Z build their wave around a sigmoid, a sawtooth whose edge reshapes from gentle ramp to razor. V snaps to octaves, Z to semitones, each with ±20-cent fine tune; Z normalizes to V per voice, up to 16 voices."
      },
      {
        title: "reverse sync and chance",
        body: "XSYNC is hard sync: V resets Z each cycle. REV. SYNC flips Z's direction (ON) or both directions (MUTUAL); CHANCE makes flips probabilistic, automatable per voice via REV. CH. CV."
      }
    ],
    suggestedPatches: [
      {
        id: "harmonic-stereo-drift",
        title: "harmonic stereo drift",
        description: "Two oscillator cores tuned a fifth apart, with a slow LFO sweeping the crossfade between them to animate the stereo field from V to Z and back.",
        difficulty: "beginner",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "keyboard",
            label: "Keyboard",
            sublabel: "or Sequencer",
            x: 20, y: 55, width: 140, height: 100,
            ports: [
              { id: "voct-out", label: "V/Oct", side: "right", offsetY: 78 }
            ]
          },
          {
            id: "lfo",
            label: "LFO",
            sublabel: "0.1–0.3 Hz",
            x: 20, y: 175, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 73, icon: "triangle" }
            ]
          },
          {
            id: "clairaudient",
            label: "Clairaudient",
            x: 200, y: 20, width: 170, height: 240,
            settings: [
              { label: "V Freq", value: "0 oct" },
              { label: "Z Freq", value: "+7 st" }
            ],
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "xfade-cv", label: "XFADE CV", side: "left", offsetY: 150 },
              { id: "left-out",  label: "+ Out (L)",  side: "right", offsetY: 80 },
              { id: "right-out", label: "− Out (R)", side: "right", offsetY: 110 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            sublabel: "or Interface",
            x: 410, y: 55, width: 140, height: 110,
            ports: [
              { id: "left-in",  label: "Left In",  side: "left", offsetY: 76 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 96 }
            ]
          }
        ],
        cables: [
          {
            id: "pitch-v",
            fromNode: "keyboard", fromPort: "voct-out",
            toNode: "clairaudient", toPort: "voct-v",
            color: "#5ec2ab"
          },
          {
            id: "lfo-xfade",
            fromNode: "lfo", fromPort: "out",
            toNode: "clairaudient", toPort: "xfade-cv",
            color: "#a78bfa"
          },
          {
            id: "audio-left",
            fromNode: "clairaudient", fromPort: "left-out",
            toNode: "mixer", toPort: "left-in",
            color: "#D7B56D"
          },
          {
            id: "audio-right",
            fromNode: "clairaudient", fromPort: "right-out",
            toNode: "mixer", toPort: "right-in",
            color: "#D7B56D"
          }
        ],
        steps: [
          {
            instruction: "Connect your keyboard or sequencer's V/Oct output to V/OCT V.",
            detail: "One cable tunes both cores, the Z input is normalized to V per voice. Set Z FREQ to +7 semitones (a perfect fifth) for a harmonic relationship.",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Connect a slow LFO to the XFADE CV jack (center column).",
            detail: "A sine or triangle at 0.1–0.3 Hz makes the blend breathe between the two cores. Trim the depth with the hex attenuverter directly above the jack.",
            cableIds: ["lfo-xfade"]
          },
          {
            instruction: "Connect the + and − outputs to your mixer's left and right channels.",
            detail: "For a more dramatic image, set Crossfade Curve to 'stereo swap' in the context menu, V and Z will trade places across the field as the LFO sweeps.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "brass-seance",
        title: "brass séance",
        description: "An envelope pushes both Shape inputs so every note swells from hollow woodwind into a full brass section as the voice engine finds its even harmonics.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "keyboard",
            label: "Keyboard",
            sublabel: "V/Oct + Gate",
            x: 20, y: 55, width: 140, height: 100,
            ports: [
              { id: "voct-out", label: "V/Oct", side: "right", offsetY: 68 },
              { id: "gate-out", label: "Gate", side: "right", offsetY: 88 }
            ]
          },
          {
            id: "adsr",
            label: "ADSR",
            sublabel: "slow attack",
            x: 20, y: 175, width: 140, height: 90,
            ports: [
              { id: "gate-in", label: "Gate", side: "left", offsetY: 60 },
              { id: "env-out", label: "Env", side: "right", offsetY: 73 }
            ]
          },
          {
            id: "clairaudient",
            label: "Clairaudient",
            x: 200, y: 20, width: 170, height: 240,
            settings: [
              { label: "V + Z Shape", value: "~85%" },
              { label: "Formant Dep.", value: "50%" },
              { label: "Formant Ratio", value: "×2" },
              { label: "Asymmetry", value: "sweep 0→60%" }
            ],
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "v-shape-cv", label: "V Shape CV", side: "left", offsetY: 140 },
              { id: "z-shape-cv", label: "Z Shape CV", side: "left", offsetY: 170 },
              { id: "left-out",  label: "+ Out (L)",  side: "right", offsetY: 80 },
              { id: "right-out", label: "− Out (R)", side: "right", offsetY: 110 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 410, y: 55, width: 140, height: 110,
            ports: [
              { id: "left-in",  label: "Left In",  side: "left", offsetY: 76 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 96 }
            ]
          }
        ],
        cables: [
          {
            id: "pitch-v",
            fromNode: "keyboard", fromPort: "voct-out",
            toNode: "clairaudient", toPort: "voct-v",
            color: "#5ec2ab"
          },
          {
            id: "gate-adsr",
            fromNode: "keyboard", fromPort: "gate-out",
            toNode: "adsr", toPort: "gate-in",
            color: "#68b7c8"
          },
          {
            id: "env-v-shape",
            fromNode: "adsr", fromPort: "env-out",
            toNode: "clairaudient", toPort: "v-shape-cv",
            color: "#a78bfa"
          },
          {
            id: "env-z-shape",
            fromNode: "adsr", fromPort: "env-out",
            toNode: "clairaudient", toPort: "z-shape-cv",
            color: "#a78bfa"
          },
          {
            id: "audio-left",
            fromNode: "clairaudient", fromPort: "left-out",
            toNode: "mixer", toPort: "left-in",
            color: "#D7B56D"
          },
          {
            id: "audio-right",
            fromNode: "clairaudient", fromPort: "right-out",
            toNode: "mixer", toPort: "right-in",
            color: "#D7B56D"
          }
        ],
        steps: [
          {
            instruction: "Connect the keyboard's V/Oct to V/OCT V, and its Gate to the ADSR.",
            detail: "Z follows V through internal normalization. Give the ADSR a slow attack (~200 ms) and a medium release.",
            cableIds: ["pitch-v", "gate-adsr"]
          },
          {
            instruction: "Send the envelope to V SHAPE CV.",
            detail: "Set both SHAPE knobs around 85% so the wave sits in its most symmetric, square-like zone, that's where ASYMMETRY has the most even harmonics to pour in.",
            cableIds: ["env-v-shape"]
          },
          {
            instruction: "Mult the envelope to Z SHAPE CV as well.",
            detail: "Both cores now open together on each note. Trim each side's response with the hex attenuverters beside the SHAPE knobs.",
            cableIds: ["env-z-shape"]
          },
          {
            instruction: "Connect the outputs and slowly sweep ASYMMETRY up from zero.",
            detail: "With FORMANT DEP. at 50% and RATIO at ×2, the tone transforms from hollow chiptune to reedy, brassy speech as the even harmonics arrive. Every note now swells into a voice.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "broken-radio",
        title: "the broken radio",
        description: "MUTUAL reverse sync with a stepped-random source rolling the dice on every flip, the two cores lurch between locked snarling and staggering collapse, spread 200% wide.",
        difficulty: "advanced",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "keyboard",
            label: "Sequencer",
            sublabel: "or Keyboard",
            x: 20, y: 55, width: 140, height: 100,
            ports: [
              { id: "voct-out", label: "V/Oct", side: "right", offsetY: 78 }
            ]
          },
          {
            id: "random",
            label: "Random",
            sublabel: "S&H / stepped",
            x: 20, y: 175, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 73, icon: "square" }
            ]
          },
          {
            id: "clairaudient",
            label: "Clairaudient",
            x: 200, y: 20, width: 170, height: 240,
            settings: [
              { label: "Z Freq", value: "+7 st" },
              { label: "Rev. Sync", value: "MUTUAL" },
              { label: "Rev. Chance", value: "80%" },
              { label: "Width", value: "200%" }
            ],
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "rev-ch-cv", label: "Rev. Ch. CV", side: "left", offsetY: 170 },
              { id: "left-out",  label: "+ Out (L)",  side: "right", offsetY: 80 },
              { id: "right-out", label: "− Out (R)", side: "right", offsetY: 110 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 410, y: 55, width: 140, height: 110,
            ports: [
              { id: "left-in",  label: "Left In",  side: "left", offsetY: 76 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 96 }
            ]
          }
        ],
        cables: [
          {
            id: "pitch-v",
            fromNode: "keyboard", fromPort: "voct-out",
            toNode: "clairaudient", toPort: "voct-v",
            color: "#5ec2ab"
          },
          {
            id: "random-chance",
            fromNode: "random", fromPort: "out",
            toNode: "clairaudient", toPort: "rev-ch-cv",
            color: "#ec4899"
          },
          {
            id: "audio-left",
            fromNode: "clairaudient", fromPort: "left-out",
            toNode: "mixer", toPort: "left-in",
            color: "#D7B56D"
          },
          {
            id: "audio-right",
            fromNode: "clairaudient", fromPort: "right-out",
            toNode: "mixer", toPort: "right-in",
            color: "#D7B56D"
          }
        ],
        steps: [
          {
            instruction: "Patch a pitch source into V/OCT V and detune Z a fifth up (+7).",
            detail: "Flip REV. SYNC to its MUTUAL position, the two cores now shove each other's playback direction around. At CHANCE 100% this chaos is fully deterministic.",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Patch a stepped-random source into REV. CH. CV.",
            detail: "Set REV. CH. ATTEN. slightly negative so random steps subtract from the 80% CHANCE setting. Each polyphonic voice rolls its own dice, flips loosen, lurch, and stagger.",
            cableIds: ["random-chance"]
          },
          {
            instruction: "Connect both outputs and turn WIDTH to 200%.",
            detail: "The left and right copies of Z flip on opposite edges of V's cycle, so the wreckage spreads across the entire stereo field. Ride CHANCE between 60% and 100% by hand, that sweep is the module's signature live move.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "massive-stereo-ensemble",
        title: "massive stereo ensemble",
        description: "Stereo-swap crossfading, aged Vintage character, and two independent slow LFOs combine into an exceptionally wide, organic ensemble, one module sounding like a section.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "keyboard",
            label: "Keyboard",
            sublabel: "or Sequencer",
            x: 20, y: 55, width: 140, height: 100,
            ports: [
              { id: "voct-out", label: "V/Oct", side: "right", offsetY: 78 }
            ]
          },
          {
            id: "dual-lfo",
            label: "Dual LFO",
            sublabel: "two slow, unsynced",
            x: 20, y: 175, width: 140, height: 90,
            ports: [
              { id: "sine-out", label: "Sine", side: "right", offsetY: 60, icon: "sine" },
              { id: "tri-out", label: "Tri", side: "right", offsetY: 80, icon: "triangle" }
            ]
          },
          {
            id: "clairaudient",
            label: "Clairaudient",
            x: 200, y: 20, width: 170, height: 240,
            settings: [
              { label: "Crossfade Curve", value: "stereo swap" },
              { label: "Vintage", value: "~70%" },
              { label: "Width", value: "150%" }
            ],
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "z-fine-cv", label: "Z Fine CV", side: "left", offsetY: 140 },
              { id: "xfade-cv", label: "XFADE CV", side: "left", offsetY: 170 },
              { id: "left-out",  label: "+ Out (L)",  side: "right", offsetY: 80 },
              { id: "right-out", label: "− Out (R)", side: "right", offsetY: 110 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 410, y: 55, width: 140, height: 110,
            ports: [
              { id: "left-in",  label: "Left In",  side: "left", offsetY: 76 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 96 }
            ]
          }
        ],
        cables: [
          {
            id: "pitch-v",
            fromNode: "keyboard", fromPort: "voct-out",
            toNode: "clairaudient", toPort: "voct-v",
            color: "#5ec2ab"
          },
          {
            id: "sine-xfade",
            fromNode: "dual-lfo", fromPort: "sine-out",
            toNode: "clairaudient", toPort: "xfade-cv",
            color: "#a78bfa"
          },
          {
            id: "tri-fine",
            fromNode: "dual-lfo", fromPort: "tri-out",
            toNode: "clairaudient", toPort: "z-fine-cv",
            color: "#ec4899"
          },
          {
            id: "audio-left",
            fromNode: "clairaudient", fromPort: "left-out",
            toNode: "mixer", toPort: "left-in",
            color: "#D7B56D"
          },
          {
            id: "audio-right",
            fromNode: "clairaudient", fromPort: "right-out",
            toNode: "mixer", toPort: "right-in",
            color: "#D7B56D"
          }
        ],
        steps: [
          {
            instruction: "Patch your pitch source into V/OCT V.",
            detail: "In the context menu, set Crossfade Curve to 'stereo swap' and raise Vintage to about 70%, thermal drift, per-voice tolerances, and crosstalk age the module into an old ensemble machine.",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Send a slow sine to XFADE CV.",
            detail: "In stereo swap mode the two cores transit across the field and trade places. Keep the attenuverter gentle so the motion stays tidal rather than seasick.",
            cableIds: ["sine-xfade"]
          },
          {
            instruction: "Send a slow triangle, unsynced, different rate, to Z FINE CV.",
            detail: "Z drifts a few cents against V, beating slowly. Independent LFO rates keep the two motions from ever aligning.",
            cableIds: ["tri-fine"]
          },
          {
            instruction: "Connect both outputs and set WIDTH to 150%.",
            detail: "Beyond 100%, the voice engine's motion in the two channels drives out of phase, combined with the drift and swap, the result is an exceptionally wide, organic ensemble.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "lopsided-pwm-throb",
        title: "lopsided pwm throb",
        description: "PWM mode with a skewed modulation trajectory, the pulse lingers narrow and snaps through wide, turning even shimmer into a rhythmic, dub-flavored lean.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "sequencer",
            label: "Sequencer",
            sublabel: "bass line",
            x: 20, y: 55, width: 140, height: 100,
            ports: [
              { id: "cv-out", label: "Pitch CV", side: "right", offsetY: 78 }
            ]
          },
          {
            id: "lfo",
            label: "LFO",
            sublabel: "very slow",
            x: 20, y: 175, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 73, icon: "sine" }
            ]
          },
          {
            id: "clairaudient",
            label: "Clairaudient",
            x: 200, y: 20, width: 170, height: 240,
            settings: [
              { label: "Waveform", value: "PWM" },
              { label: "Shape", value: "~40%" },
              { label: "Formant Dep.", value: "60%" },
              { label: "Formant Ratio", value: "×1" },
              { label: "Asymmetry", value: "70%" }
            ],
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "v-shape-cv", label: "V Shape CV", side: "left", offsetY: 150 },
              { id: "left-out",  label: "+ Out (L)",  side: "right", offsetY: 80 },
              { id: "right-out", label: "− Out (R)", side: "right", offsetY: 110 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 410, y: 55, width: 140, height: 110,
            ports: [
              { id: "left-in",  label: "Left In",  side: "left", offsetY: 76 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 96 }
            ]
          }
        ],
        cables: [
          {
            id: "seq-pitch",
            fromNode: "sequencer", fromPort: "cv-out",
            toNode: "clairaudient", toPort: "voct-v",
            color: "#5ec2ab"
          },
          {
            id: "lfo-shape",
            fromNode: "lfo", fromPort: "out",
            toNode: "clairaudient", toPort: "v-shape-cv",
            color: "#a78bfa"
          },
          {
            id: "audio-left",
            fromNode: "clairaudient", fromPort: "left-out",
            toNode: "mixer", toPort: "left-in",
            color: "#D7B56D"
          },
          {
            id: "audio-right",
            fromNode: "clairaudient", fromPort: "right-out",
            toNode: "mixer", toPort: "right-in",
            color: "#D7B56D"
          }
        ],
        steps: [
          {
            instruction: "Switch Waveform to PWM in the context menu, then patch the sequencer into V/OCT V.",
            detail: "In PWM mode, Shape sets the static pulse width (5–95% duty) and FORMANT DEP. becomes pitch-locked pulse-width modulation. Set Shape around 40%, DEPTH to 60%, RATIO to ×1.",
            cableIds: ["seq-pitch"]
          },
          {
            instruction: "Send a very slow LFO to V SHAPE CV.",
            detail: "Shape CV now sweeps the base duty cycle underneath the voice engine's PWM, two layers of pulse motion at very different speeds.",
            cableIds: ["lfo-shape"]
          },
          {
            instruction: "Connect the outputs, then sweep ASYMMETRY upward.",
            detail: "ASYMMETRY skews the modulation's trajectory: the pulse lingers on its narrow side and snaps through its wide side. The even shimmer becomes a lopsided, dub-flavored throb, push WIDTH past 100% to lean it between the speakers.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "self-patched-chaos",
        title: "self-patched chaos",
        description: "The module modulates itself: the right output feeds back into its own shape input at audio rate while reverse sync tears at the result. No other modules required.",
        difficulty: "advanced",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "clairaudient",
            label: "Clairaudient",
            x: 200, y: 20, width: 170, height: 240,
            settings: [
              { label: "Z Freq", value: "−12 st" },
              { label: "Rev. Sync", value: "ON → MUTUAL" },
              { label: "V Shape Atten.", value: "start ±15%" }
            ],
            ports: [
              { id: "v-shape-cv", label: "V Shape CV", side: "left", offsetY: 140 },
              { id: "left-out",  label: "+ Out (L)",  side: "right", offsetY: 80 },
              { id: "right-out", label: "− Out (R)", side: "right", offsetY: 110 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 410, y: 55, width: 140, height: 110,
            ports: [
              { id: "in", label: "Input", side: "left", offsetY: 76 }
            ]
          }
        ],
        cables: [
          {
            id: "feedback",
            fromNode: "clairaudient", fromPort: "right-out",
            toNode: "clairaudient", toPort: "v-shape-cv",
            color: "#ec4899"
          },
          {
            id: "audio-out",
            fromNode: "clairaudient", fromPort: "left-out",
            toNode: "mixer", toPort: "in",
            color: "#D7B56D"
          }
        ],
        steps: [
          {
            instruction: "Patch the − output back into V SHAPE CV.",
            detail: "The right channel now bends V's sigmoid at audio rate. Start with the V Shape attenuverter barely open (±15%), the feedback ranges from gentle growl to total wavebreak.",
            cableIds: ["feedback"]
          },
          {
            instruction: "Take the + output to your mixer and flip REV. SYNC on.",
            detail: "With Z an octave down, each of V's cycles now flips Z's direction while Z's output is shaping V, the loop folds in on itself. Raise FORMANT DEP. and the voice engine joins the argument.",
            cableIds: ["audio-out"]
          },
          {
            instruction: "Graduate to MUTUAL and ride REV. CHANCE around 70%.",
            detail: "The flips turn probabilistic and the feedback staggers unpredictably. The crossfade knob is now your mix control between the clean V core and the wreckage, perform it.",
            cableIds: ["feedback", "audio-out"]
          }
        ]
      }
    ],
    typeplate: {
      unit: "UNIT 00218",
      type: "XFADE STEREO OSCILLATOR",
      alt: "VECTOR CALIBRATED",
    },
  },
  {
    slug: "transmutation",
    name: "transmutation",
    subtitle: "dual 64-step polyphonic chord sequencer with chord packs mapped to twelve alchemical symbol buttons, groove templates, and four variation slots",
    summary: "Two independent 64-step sequencers emit up to six voices of polyphonic chords each. Chord packs map rich voicings across twelve symbol buttons, while sequence B can derive chord tones or scale melodies from A.",
    category: "vcv rack module",
    status: "chord sequencer",
    accent: "#7f58a9",
    accentSoft: "rgba(127, 88, 169, 0.2)",
    icon: Sparkles,
    hp: 40,
    panelImage: {
      src: "/modules/transmutation/panel-v4.webp",
      width: 3000,
      height: 1900,
      alt: "transmutation vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "dual sequencers",
        body: "A and B each run up to 64 steps with independent length, transport, and 6-voice polyphonic CV/gate outputs. B can play its own steps, extract chord tones from A, or generate scale melodies in key."
      },
      {
        title: "macros and variations",
        body: "Space/Energy, Motion, and Humanize steer voicing density, harmonic volatility, and timing slop. Four variation slots store complete A/B sequences with macro states."
      },
      {
        title: "groove and display",
        body: "Steps micro-shift ±20 ticks by dragging, or shape globally with swing and shuffle presets. The Spooky TV display tracks occupancy, playheads, and timing deviation."
      }
    ]
  },
  {
    slug: "chiaroscuro",
    name: "chiaroscuro",
    subtitle: "16-voice stereo vca in front of a five-headed distortion core, with level-following contrast, stereo tilt, and a four-mode sidechain",
    summary: "A polyphonic stereo VCA feeding five switchable distortion topologies. VCA sets the clean level, DIST opens the algorithm, DRIVE pushes into it, MIX blends, and the wet path is level-matched continuously so dry to ruined never has to mean quiet to loud.",
    category: "vcv rack module",
    status: "vca + distortion",
    accent: "#D7B56D",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: SlidersHorizontal,
    hp: 14,
    panelImage: {
      src: "/modules/chiaroscuro/panel-v5.webp",
      width: 1050,
      height: 1900,
      alt: "chiaroscuro vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 01411",
      type: "SIGNAL AMPLIFIER",
      alt: "PRE-BIASED CENTER",
    },
    controls: [
      {
        id: "gain-jewel",
        label: "gain jewel",
        type: "meter",
        x: 14.8,
        y: 14.8,
        size: 10,
        description: [
          "brightness follows the highest VCA gain across voices, up to unity",
          "above unity it shifts white, up to 2× Linear, 4× Exponential",
          "dims while Duck Level sidechain ducks; color follows the display theme",
        ],
        tip: "white means above unity, into the soft knee.",
      },
      {
        id: "vca",
        label: "vca",
        type: "knob",
        x: 50.0,
        y: 13.9,
        size: 22,
        description: [
          "resting gain, silence to unity. Factory setting is closed, silence from a new module is expected",
          "VCA CV adds at 10 V per unit; combined value clamps to 0–2× before the response curve",
          "linear through ordinary levels, soft knee above ±8 V, ceiling near ±11.7 V",
        ],
        tip: "start at noon with DIST, DRIVE, MIX at zero, the clean VCA to judge against.",
      },
      {
        id: "dist-jewel",
        label: "distortion jewel",
        type: "meter",
        x: 85.2,
        y: 14.8,
        size: 10,
        description: [
          "color identifies TYPE; brightness combines DIST, DRIVE, MIX, with a faint glow when any is raised",
          "values shown are post-sidechain, in Enhancement mode it stays dark between hits",
        ],
        tip: "dark with a patched sidechain means the trigger hasn't arrived yet.",
      },
      {
        id: "link",
        label: "l/r link",
        type: "switch",
        x: 14.8,
        y: 26.8,
        size: 12,
        description: [
          "off: R IN feeds right (L normalled to R only while R is unpatched)",
          "link: left feeds both, even with right patched",
        ],
        tip: "normalization runs one direction, an R-only patch leaves L silent.",
        diagrams: [
          { id: "link-off", label: "independent", icon: "Unlink", state: "down" },
          { id: "link-on", label: "l feeds both", icon: "Link", state: "up" },
        ],
      },
      {
        id: "type",
        label: "type",
        type: "knob",
        x: 50.0,
        y: 26.8,
        size: 18,
        description: [
          "hard clip: narrowing-knee rail clipper, saturates low, sharp and confrontational high",
          "tube sat: two asymmetric stages with sag; even harmonics and compression",
          "wave fold: reflective folder, rounded to sharp tips, several folds at top",
          "bit crush: dithered bit reduction into jittered sample hold, near-clean to coarse grind",
          "ring mod: internal carrier swept ~20 Hz–2 kHz by DIST, morphing sine → triangle → square",
          "TYPE changes crossfade over 12 ms, manual or CV, no dropout",
        ],
        tip: "sweep it live, the crossfade makes TYPE a performance control.",
        diagrams: [
          { id: "type-clip", label: "hard clip", icon: "Square", rotation: -135 },
          { id: "type-tube", label: "tube sat", icon: "Spline", rotation: -67.5 },
          { id: "type-fold", label: "wave fold", icon: "Activity", rotation: 0 },
          { id: "type-crush", label: "bit crush", icon: "Grid3x3", rotation: 67.5 },
          { id: "type-ring", label: "ring mod", icon: "Circle", rotation: 135 },
        ],
      },
      {
        id: "response",
        label: "lin / exp",
        type: "switch",
        x: 85.2,
        y: 26.8,
        size: 12,
        description: [
          "lin: knob plus CV is the gain",
          "exp: that value squared, sharper envelopes, CV boost to 4×",
        ],
        tip: "EXP with Tube Sat and a fast envelope bites on loud attacks before the wet path opens.",
        diagrams: [
          { id: "resp-lin", label: "linear", icon: "Minus", state: "down" },
          { id: "resp-exp", label: "exponential", icon: "Zap", state: "up" },
        ],
      },
      {
        id: "dist",
        label: "dist",
        type: "knob",
        x: 14.8,
        y: 38.5,
        size: 17,
        description: [
          "opens the algorithm and governs intensity, fold count, bit depth, ring carrier",
          "at zero (or MIX at zero) the engines bypass and reset on re-engage",
          "in Enhancement sidechain mode this is a maximum, not a fixed amount",
        ],
        tip: "DIST is what the circuit does; DRIVE is how hard you hit it.",
      },
      {
        id: "drive",
        label: "drive",
        type: "knob",
        x: 50.0,
        y: 43.4,
        size: 17,
        description: "pre-gain on the wet path only, how hard the VCA signal strikes the circuit.",
        tip: "modulate DRIVE on a polyphonic Wave Fold chord, each voice owns its fold state.",
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 85.2,
        y: 38.5,
        size: 17,
        description: [
          "crossfades clean VCA output to the level-matched wet signal",
          "adaptive makeup tracks both paths per voice and side, closing the clean/driven gain gap",
          "in Enhancement mode MIX stays at least 80% wet",
        ],
        tip: "algorithms can still feel louder through spectra alone, character, not a level bug.",
      },
      {
        id: "dist-atten",
        label: "dist cv attenuverter",
        type: "knob",
        x: 14.8,
        y: 52.9,
        size: 13,
        description: "bipolar scaling for DIST CV: 0–10 V adds the full range at full positive, subtracts it reversed.",
        tip: "negative scaling with a rising envelope cleans the tail as the note decays.",
      },
      {
        id: "drive-atten",
        label: "drive cv attenuverter",
        type: "knob",
        x: 50.0,
        y: 57.0,
        size: 13,
        description: "bipolar scaling for DRIVE CV, same 0–10 V convention.",
        tip: "a little positive drive from velocity makes a patch feel played.",
      },
      {
        id: "mix-atten",
        label: "mix cv attenuverter",
        type: "knob",
        x: 85.2,
        y: 52.9,
        size: 13,
        description: "bipolar scaling for MIX CV.",
        tip: "modulate MIX for a wet/dry pulse that never changes the dirt's character.",
      },
      {
        id: "contrast",
        label: "contrast",
        type: "knob",
        x: 32.4,
        y: 65.4,
        size: 13,
        description: [
          "ties distortion depth to signal level; centered is off",
          "clockwise: loud passages dirty, quiet ones clean",
          "counter-clockwise: notes grit up as they decay, clean up when played hard",
          "added on top of DIST, per voice, one quiet chord note can break up while the rest stay clear",
        ],
        tip: "dirt that fades in: DIST low, MIX high, CONTRAST counter-clockwise.",
        diagrams: [
          { id: "contrast-ccw", label: "quiet gets dirty", icon: "ChevronDown", rotation: -135 },
          { id: "contrast-off", label: "off", icon: "Minus", rotation: 0 },
          { id: "contrast-cw", label: "loud gets dirty", icon: "ChevronUp", rotation: 135 },
        ],
      },
      {
        id: "tilt",
        label: "tilt",
        type: "knob",
        x: 67.6,
        y: 65.4,
        size: 13,
        description: [
          "splits distortion depth across sides, up to half the DIST range; centered is off",
          "the one genuinely stereo control, everything before it is identical left and right",
        ],
        tip: "wide from mono: signal into L IN, R empty, turn TILT. Fold and Crush spread hardest.",
        diagrams: [
          { id: "tilt-l", label: "left dirtier", icon: "ChevronsDown", rotation: -135 },
          { id: "tilt-off", label: "centered", icon: "Minus", rotation: 0 },
          { id: "tilt-r", label: "right dirtier", icon: "ChevronsUp", rotation: 135 },
        ],
      },
      {
        id: "dist-cv",
        label: "dist cv",
        type: "jack",
        x: 14.8,
        y: 68.9,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "global DIST modulation through its attenuverter; first channel only, applied to every voice.",
        tip: "in Direct Control sidechain mode the sidechain envelope replaces this input.",
      },
      {
        id: "mix-cv",
        label: "mix cv",
        type: "jack",
        x: 85.2,
        y: 68.9,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "global wet/dry modulation through its attenuverter; first channel only.",
        tip: "a square LFO here hard-switches clean and ruined at equal loudness.",
      },
      {
        id: "type-cv",
        label: "type cv",
        type: "jack",
        x: 14.8,
        y: 79.0,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "added to the switch position, 0–10 V traverses all five types from the first; crossfaded like manual moves.",
        tip: "stepped random here is a different circuit on every note.",
      },
      {
        id: "contrast-cv",
        label: "contrast cv",
        type: "jack",
        x: 32.4,
        y: 79.0,
        size: 12,
        voltageRange: "±10 V · mono",
        description: "global bipolar CONTRAST control, ±10 V full range, no attenuverter; first channel only.",
        tip: "a slow bipolar LFO swings between compressor-like and expander-like dirt.",
      },
      {
        id: "drive-cv",
        label: "drive cv",
        type: "jack",
        x: 50.2,
        y: 79.0,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "global DRIVE modulation through its attenuverter; first channel only.",
        tip: "velocity here with the attenuverter at a quarter is the classic move.",
      },
      {
        id: "tilt-cv",
        label: "tilt cv",
        type: "jack",
        x: 67.6,
        y: 79.0,
        size: 12,
        voltageRange: "±10 V · mono",
        description: "global bipolar TILT control, ±10 V full swing, added to the knob.",
        tip: "a slow triangle pans the distortion without moving the dry signal.",
      },
      {
        id: "sidechain",
        label: "sidechain",
        type: "jack",
        x: 85.2,
        y: 79.0,
        size: 12,
        voltageRange: "audio or env · mono",
        description: [
          "global detection input: measures swing from zero, so ±5 V audio and 0–10 V envelopes both reach full scale",
          "smoothed by a 10 ms / 200 ms follower; Sidechain Mode decides what it does",
        ],
        tip: "kick-opened destruction: Hard Clip or Bit Crush, DIST and DRIVE high, Enhancement mode, kick here.",
      },
      {
        id: "in-l",
        label: "l in",
        type: "jack",
        x: 14.8,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly ≤16",
        description: "polyphonic audio input, normalled to R when R is unpatched. Widest audio input sets voice count (≤16); CV creates no voices.",
        tip: "mono here broadcasts across a wider polyphonic right side.",
      },
      {
        id: "in-r",
        label: "r in",
        type: "jack",
        x: 32.4,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly ≤16",
        description: "polyphonic right input. No reverse normalization, R-only patches leave L silent.",
        tip: "patch only for true stereo sources; otherwise let L feed both.",
      },
      {
        id: "vca-cv",
        label: "gain (vca cv)",
        type: "jack",
        x: 49.9,
        y: 89.1,
        size: 12,
        voltageRange: "0–10 V · poly",
        description: "polyphonic amplitude control, 10 V per unit, added to the knob; each voice reads its matching channel.",
        tip: "full knob plus +10 V reaches 2× Linear, 4× Exponential, the soft knee is part of the sound up there.",
      },
      {
        id: "out-l",
        label: "l out",
        type: "jack",
        x: 67.6,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly",
        description: "polyphonic left output, same channel count as inputs.",
        tip: "the ±8 V soft knee sits last, it catches coupled peaks from any algorithm.",
      },
      {
        id: "out-r",
        label: "r out",
        type: "jack",
        x: 85.2,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly",
        description: "polyphonic right output.",
        tip: "TILT off and R empty means L and R are identical.",
      },
    ],
    contextMenu: [
      {
        id: "oversampling",
        group: "oversampling",
        label: "oversampling",
        kind: "choice",
        values: ["1x", "2x", "4x", "8x (high quality)"],
        description: [
          "4× factory setting; higher cuts foldback at more CPU",
          "also tonal: Wave Fold changes most (lower rates keep more aliasing energy), Ring Mod modestly, check here when a recalled patch seems brighter or thicker"
        ]
      },
      {
        id: "sidechain-enhancement",
        group: "sidechain mode",
        label: "enhancement (trigger)",
        kind: "choice",
        description: "Sidechain envelope scales DIST and DRIVE from zero to their knob/CV settings; MIX stays ≥80% so triggered distortion stays audible."
      },
      {
        id: "sidechain-ducking",
        group: "sidechain mode",
        label: "ducking (inverse)",
        kind: "choice",
        description: "Hot sidechain reduces DIST and partly backs off DRIVE, clears dense effects around kicks or accents."
      },
      {
        id: "sidechain-direct",
        group: "sidechain mode",
        label: "direct control",
        kind: "choice",
        description: "The sidechain envelope replaces DIST and its CV. DRIVE and MIX continue to work normally."
      },
      {
        id: "sidechain-duck-level",
        group: "sidechain mode",
        label: "duck level (classic)",
        kind: "choice",
        description: "Classic ducking: hot sidechain turns the VCA down to about a tenth, like a VCA in front of a dirt box. The gain jewel dims as it ducks."
      },
      {
        id: "display-theme",
        group: "display theme",
        label: "display theme",
        kind: "choice",
        values: ["follow shapetaker theme", "local color"],
        description: "Follow the shared Shapetaker theme or choose a local color for the gain jewel. The distortion jewel always shows the TYPE color."
      }
    ],
    manual: [
      {
        title: "vca and distortion core",
        body: "VCA sets resting gain, silence to unity, with VCA CV adding 10 V per unit and LIN/EXP squaring the curve for sharper envelopes and up to 4× boost. Behind it TYPE picks one of five algorithms, DIST opens the circuit, DRIVE sets hit strength, and MIX crossfades to a level-matched wet path. Type changes crossfade over 12 ms, so live switching stays continuous."
      },
      {
        title: "contrast and tilt",
        body: "CONTRAST ties depth to signal level: clockwise dirties loud passages, counter-clockwise grits up decaying notes. Added on top of DIST per voice, so one quiet chord note can break up while the rest stay clear. TILT splits depth across sides by up to half the DIST range, the one genuinely stereo control."
      },
      {
        title: "sidechain and polyphony",
        body: "SIDECHAIN takes audio or envelope with nothing to set, smoothed by a 10 ms / 200 ms follower. Four modes: Enhancement reveals on hits, Ducking clears around them, Direct Control hands DIST to the envelope, Duck Level turns the VCA down. 16 voices follow the audio inputs; VCA is per voice while distortion and sidechain are global, but every voice and side keeps its own engine and makeup tracker."
      }
    ],
    suggestedPatches: [
      {
        id: "kick-opened-destruction",
        title: "kick-opened destruction",
        description: "Enhancement mode keeps the wet circuit clean between hits and breaks it open around every kick. A polyphonic envelope articulates the chord through the VCA at the same time.",
        difficulty: "beginner",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "poly-osc",
            label: "Poly Oscillator",
            sublabel: "chord",
            x: 20, y: 20, width: 140, height: 80,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 62, icon: "saw" }
            ]
          },
          {
            id: "env",
            label: "Poly Envelope",
            x: 20, y: 110, width: 140, height: 70,
            ports: [
              { id: "out", label: "Env", side: "right", offsetY: 52 }
            ]
          },
          {
            id: "kick",
            label: "Kick",
            sublabel: "or its envelope",
            x: 20, y: 190, width: 140, height: 80,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 62 }
            ]
          },
          {
            id: "chiaroscuro",
            label: "Chiaroscuro",
            x: 200, y: 20, width: 180, height: 240,
            settings: [
              { label: "Type", value: "Bit Crush" },
              { label: "Dist / Drive", value: "70% / 60%" },
              { label: "Sidechain", value: "Enhancement" }
            ],
            ports: [
              { id: "in-l", label: "L In", side: "left", offsetY: 62 },
              { id: "vca-cv", label: "VCA CV", side: "left", offsetY: 132 },
              { id: "sidechain", label: "Sidechain", side: "left", offsetY: 202 },
              { id: "out-l", label: "L Out", side: "right", offsetY: 62 },
              { id: "out-r", label: "R Out", side: "right", offsetY: 92 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 420, y: 30, width: 140, height: 110,
            ports: [
              { id: "left-in", label: "Left In", side: "left", offsetY: 62 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 92 }
            ]
          }
        ],
        cables: [
          { id: "audio", fromNode: "poly-osc", fromPort: "out", toNode: "chiaroscuro", toPort: "in-l", color: "#D7B56D" },
          { id: "vca", fromNode: "env", fromPort: "out", toNode: "chiaroscuro", toPort: "vca-cv", color: "#5ec2ab" },
          { id: "sc", fromNode: "kick", fromPort: "out", toNode: "chiaroscuro", toPort: "sidechain", color: "#a78bfa" },
          { id: "out-l", fromNode: "chiaroscuro", fromPort: "out-l", toNode: "mixer", toPort: "left-in", color: "#D7B56D" },
          { id: "out-r", fromNode: "chiaroscuro", fromPort: "out-r", toNode: "mixer", toPort: "right-in", color: "#D7B56D" }
        ],
        steps: [
          {
            instruction: "Patch a polyphonic chord into L IN and its envelope into VCA CV.",
            detail: "Leave R IN empty so L feeds both sides. Each voice reads its own CV channel, so the envelope articulates every note of the chord separately. Raise VCA to noon.",
            cableIds: ["audio", "vca"]
          },
          {
            instruction: "Choose Bit Crush, raise DIST and DRIVE, and set Sidechain Mode to Enhancement.",
            detail: "With Enhancement selected, DIST and DRIVE become maxima, nothing happens until the sidechain arrives. MIX is held to at least 80% wet so the effect is unmistakable when it does.",
            cableIds: []
          },
          {
            instruction: "Patch the kick (or its envelope) into SIDECHAIN and take L and R OUT.",
            detail: "The chord stays clean between hits and shatters around each one. Turn TILT off-center to have the destruction lean to one side of the field.",
            cableIds: ["sc", "out-l", "out-r"]
          }
        ]
      }
    ]
  },
  {
    slug: "evocation",
    name: "evocation",
    subtitle: "draw one voltage by hand, then let four polyphonic playheads remember it differently, with a classic adsr mode on the same panel",
    summary: "The touch strip records up to five seconds of vertical motion as a 0–10 V contour. Four lanes read that contour with independent speed, phase, loop direction, loop window, inversion, clock fit, and range. Flip MODE and the same lanes carry one polyphonic ADSR.",
    category: "vcv rack module",
    status: "gesture envelope",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Activity,
    hp: 20,
    panelImage: {
      src: "/modules/evocation/panel-v4.webp",
      width: 1500,
      height: 1900,
      alt: "evocation vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 09921",
      type: "GESTURE ENV GEN",
      alt: "CAPACITIVE CONJURING",
    },
    controls: [
      {
        id: "touch-strip",
        label: "touch strip",
        type: "meter",
        x: 20.2,
        y: 39.6,
        size: 29,
        description: [
          "gesture mode: hold and move vertically, high records 10 V, low 0 V; time advances while held. Release to finish; recording stops after five seconds",
          "captured at up to 960 samples/s and rebuilt into an interpolation table; saved with the patch",
          "a new recording stops playback and replaces the gesture",
          "adsr mode: horizontal sets stage time, vertical sets contour (or Sustain level). Editing never fires the envelope",
        ],
        tip: "a quick flick is a valid gesture, the fastest hands make the shortest envelopes.",
      },
      {
        id: "oled",
        label: "oled display",
        type: "meter",
        x: 20.2,
        y: 84.1,
        size: 31,
        description: [
          "shows the stored gesture, the selected lane's speed, phase, loop, and clock fit, plus polyphonic playheads",
          "looping lanes show draggable start/end markers for the loop window",
          "click the top-center timing capsule to cycle clock fit; MEAS CLK shows while learning",
          "phosphor color follows the shared theme or a local setting",
        ],
        tip: "narrow the markers around a textured fragment and raise SPEED, a bank of LFOs.",
      },
      {
        id: "speed",
        label: "speed",
        type: "knob",
        x: 50.1,
        y: 13.8,
        size: 13,
        description: [
          "gesture: free playback of the selected lane, 0.05×–8× (factory 1×, 2×, 4×, 8×)",
          "adsr: selected stage time, Attack/Release 1 ms–5 s, Decay 1 ms–2 s, Sustain 0–100% level",
          "clock-fitted lanes ignore this knob until returned to Free",
        ],
        tip: "select a lane first, the knob edits whichever button is lit.",
      },
      {
        id: "trim-lead",
        label: "trim lead",
        type: "switch",
        x: 69.1,
        y: 10.4,
        size: 8,
        description: "removes a quiet opening: below 1 V for 25 ms counts as silence, 12 ms of activity confirms the cut; hysteresis defeats noise spikes. NO TRIM with no usable gesture.",
        tip: "trim before setting clock fit, it changes the free-running duration.",
      },
      {
        id: "phase",
        label: "phase",
        type: "knob",
        x: 88.0,
        y: 13.8,
        size: 13,
        description: [
          "gesture: offsets the selected lane through one turn of the gesture or loop window",
          "adsr: logarithmic below center, linear at center, exponential above; Sustain has no contour",
          "phase never delays the trigger, it shifts which point is sampled",
        ],
        tip: "four clock-fitted lanes at four phases turn one line into a tempo-locked canon.",
      },
      {
        id: "trim-tail",
        label: "trim tail",
        type: "switch",
        x: 69.1,
        y: 21.2,
        size: 8,
        description: "removes quiet after the final active point, adding a return to 0 V where needed.",
        tip: "with both trims, LOOP Forward wraps with no dead air.",
      },
      {
        id: "invert",
        label: "invert",
        type: "switch",
        x: 47.2,
        y: 29.5,
        size: 9,
        description: [
          "touch pad reversing the selected lane's range: 0–10 V becomes 10–0 V, −5/+5 V changes sign",
          "shared, selecting another lane recalls its stored state and lamp",
        ],
        tip: "in ADSR mode invert lane 4 alone: one gate, three rising and one falling destination.",
        diagrams: [
          { id: "inv-off", label: "normal", icon: "ChevronUp", state: "down" },
          { id: "inv-on", label: "inverted", icon: "ChevronDown", state: "up" },
        ],
      },
      {
        id: "mode",
        label: "mode",
        type: "switch",
        x: 69.1,
        y: 31.8,
        size: 8,
        description: [
          "gesture: one contour read four ways; lane buttons select the edited lane",
          "adsr: one polyphonic ADSR copied to all outputs; lane buttons select stages",
          "gestures survive the round trip; Recollect idles in ADSR mode but keeps its memories",
        ],
        tip: "gesture is one memory read four ways, ADSR one envelope mapped four ways.",
        diagrams: [
          { id: "mode-gesture", label: "gesture", icon: "Spline", state: "down" },
          { id: "mode-adsr", label: "adsr", icon: "Activity", state: "up" },
        ],
      },
      {
        id: "loop",
        label: "loop",
        type: "switch",
        x: 90.8,
        y: 29.5,
        size: 9,
        description: [
          "gesture: Off → Forward → Reverse → Ping-Pong → Off per lane",
          "forward wraps start to end, reverse end to start; ping-pong fires EOC only after a full round trip",
          "adsr: Off/On cycle flag, one lane's LOOP retriggers the shared envelope",
        ],
        tip: "loop windows plus high speed reach audio rate, small windows become waveforms.",
        diagrams: [
          { id: "loop-off", label: "off", icon: "Minus" },
          { id: "loop-fwd", label: "forward", icon: "ArrowRight" },
          { id: "loop-rev", label: "reverse", icon: "RefreshCw" },
          { id: "loop-pp", label: "ping-pong", icon: "Repeat" },
        ],
      },
      {
        id: "clock-in",
        label: "clock",
        type: "jack",
        x: 47.2,
        y: 41.3,
        size: 8.5,
        voltageRange: "clock · mono",
        description: [
          "tempo only, never triggers. Four rising edges set the beat; near-simultaneous pulses ignored, small drift smoothed, big jumps re-acquire",
          "lanes then fit to 1/4–4 beats: whole gesture with LOOP off, the window in Forward/Reverse, each leg in Ping-Pong",
        ],
        tip: "patch the clock before switching lanes to fitted, until a period exists, lanes keep free speed.",
      },
      {
        id: "gate-in",
        label: "gate",
        type: "jack",
        x: 61.8,
        y: 41.3,
        size: 8.5,
        voltageRange: "gate · poly",
        description: [
          "gesture: rising starts playback; falling glides to 0 V, slower from higher levels",
          "adsr: rising attacks, held sustains, falling releases",
          "with both Trigger and Gate patched, Trigger wins",
        ],
        tip: "polyphonic gates set output width, held wide through releases so downstream voices don't collapse.",
      },
      {
        id: "trigger-btn",
        label: "manual trigger",
        type: "switch",
        x: 76.3,
        y: 41.3,
        size: 8.5,
        description: "fires every lane: wider patched channel count with poly cables, one voice with neither. Follows the context-menu trigger behavior.",
        tip: "draw, release, press, the fastest way to audition a take.",
      },
      {
        id: "trigger-in",
        label: "trigger",
        type: "jack",
        x: 90.8,
        y: 41.3,
        size: 8.5,
        voltageRange: "trigger · poly",
        description: [
          "gesture: each edge restarts its voice at the gesture start or loop edge; restarted lanes glide 12 ms",
          "keep active loops running protects traversing loops; one-shots, idle loops, and releases still restart",
          "adsr: one-shot to Sustain, then auto-release, no held gate needed",
        ],
        tip: "polyphonic triggers give every voice four playheads, up to 64 at once.",
      },
      {
        id: "lane-1",
        label: "lane 1 / attack",
        type: "switch",
        x: 47.2,
        y: 51.9,
        size: 9,
        description: "selects lane 1 for SPEED, PHASE, LOOP, INVERT (factory 1×); Attack in ADSR mode. Amber lamp shows the selected running lane.",
        tip: "lane 1 is also the lane Recollect mirrors.",
      },
      {
        id: "lane-2",
        label: "lane 2 / decay",
        type: "switch",
        x: 61.8,
        y: 51.9,
        size: 9,
        description: "selects lane 2 (factory 2×); Decay in ADSR mode, 1 ms–2 s.",
        tip: "leave factory speeds first, 1×/2×/4×/8× is one gesture at four scales.",
      },
      {
        id: "lane-3",
        label: "lane 3 / sustain",
        type: "switch",
        x: 76.3,
        y: 51.9,
        size: 9,
        description: "selects lane 3 (factory 4×); Sustain in ADSR mode, SPEED or strip height sets level.",
        tip: "fit lanes to 1/2, 1, 2, 4 beats and this is the two-bar voice.",
      },
      {
        id: "lane-4",
        label: "lane 4 / release",
        type: "switch",
        x: 90.8,
        y: 51.9,
        size: 9,
        description: "selects lane 4 (factory 8×); Release in ADSR mode, 1 ms–5 s.",
        tip: "send the fastest lane to timbre or pan; the others carry the slow shape.",
      },
      {
        id: "phase-cv-1",
        label: "phase cv 1",
        type: "jack",
        x: 47.2,
        y: 61.2,
        size: 8.5,
        voltageRange: "10 V = 1 turn · poly",
        description: "polyphonic lane-1 phase modulation: 10 V adds one turn and wraps, so bipolar is welcome; smoothed per voice, active even when clock-fitted.",
        tip: "a slow sawtooth here scans a looping window like wavetable position.",
      },
      {
        id: "phase-cv-2",
        label: "phase cv 2",
        type: "jack",
        x: 61.8,
        y: 61.2,
        size: 8.5,
        voltageRange: "10 V = 1 turn · poly",
        description: "polyphonic phase modulation for lane 2.",
        tip: "the same LFO into two phase inputs with different attenuation keeps the lanes related but never aligned.",
      },
      {
        id: "phase-cv-3",
        label: "phase cv 3",
        type: "jack",
        x: 76.3,
        y: 61.2,
        size: 8.5,
        voltageRange: "10 V = 1 turn · poly",
        description: "polyphonic phase modulation for lane 3.",
        tip: "per-voice random offsets here spread a chord's envelopes so no two voices peak together.",
      },
      {
        id: "phase-cv-4",
        label: "phase cv 4",
        type: "jack",
        x: 90.8,
        y: 61.2,
        size: 8.5,
        voltageRange: "10 V = 1 turn · poly",
        description: "polyphonic phase modulation for lane 4.",
        tip: "phase CV on the fastest lane at audio rate is phase modulation of a hand-drawn waveform.",
      },
      {
        id: "eoc-1",
        label: "eoc 1",
        type: "jack",
        x: 47.2,
        y: 70.6,
        size: 8.5,
        voltageRange: "1 ms · 10 V pulse",
        description: "1 ms, 10 V pulse at one-shot completion or the loop boundary; Ping-Pong fires only after a full round trip.",
        tip: "patch EOC 1 into TRIGGER for a self-retriggering gesture.",
      },
      {
        id: "eoc-2",
        label: "eoc 2",
        type: "jack",
        x: 61.8,
        y: 70.6,
        size: 8.5,
        voltageRange: "1 ms · 10 V pulse",
        description: "end-of-cycle pulse for lane 2.",
        tip: "with lane 2 at 2× this fires twice per lane-1 cycle, a free clock divider.",
      },
      {
        id: "eoc-3",
        label: "eoc 3",
        type: "jack",
        x: 76.3,
        y: 70.6,
        size: 8.5,
        voltageRange: "1 ms · 10 V pulse",
        description: "end-of-cycle pulse for lane 3.",
        tip: "use it to advance a sequencer every time the 4× lane completes.",
      },
      {
        id: "eoc-4",
        label: "eoc 4",
        type: "jack",
        x: 90.8,
        y: 70.6,
        size: 8.5,
        voltageRange: "1 ms · 10 V pulse",
        description: "end-of-cycle pulse for lane 4.",
        tip: "the fastest EOC is the busiest trigger source on the panel.",
      },
      {
        id: "gate-out-1",
        label: "gate 1",
        type: "jack",
        x: 47.2,
        y: 79.9,
        size: 8.5,
        voltageRange: "10 V while active · poly",
        description: "10 V while lane 1 (or the ADSR voice) is active, per voice.",
        tip: "open a VCA with the gate and shape it with the envelope from the same lane.",
      },
      {
        id: "gate-out-2",
        label: "gate 2",
        type: "jack",
        x: 61.8,
        y: 79.9,
        size: 8.5,
        voltageRange: "10 V while active · poly",
        description: "activity gate for lane 2.",
        tip: "a looping lane's gate stays high, use EOC instead when you need an edge.",
      },
      {
        id: "gate-out-3",
        label: "gate 3",
        type: "jack",
        x: 76.3,
        y: 79.9,
        size: 8.5,
        voltageRange: "10 V while active · poly",
        description: "activity gate for lane 3.",
        tip: "gate lengths shrink with speed, four gates of four lengths from one trigger.",
      },
      {
        id: "gate-out-4",
        label: "gate 4",
        type: "jack",
        x: 90.8,
        y: 79.9,
        size: 8.5,
        voltageRange: "10 V while active · poly",
        description: "activity gate for lane 4.",
        tip: "the shortest gate on the panel, ideal for a pluck VCA.",
      },
      {
        id: "env-out-1",
        label: "envelope 1",
        type: "jack",
        x: 47.2,
        y: 89.3,
        size: 8.5,
        voltageRange: "0–10 V · poly",
        description: "lane 1's contour. Factory 0–10 V; context menu offers 0–5 V or ±5 V per lane, plus Invert and peak normalization. Idle outputs hold ≥1 channel at 0 V once a gesture exists.",
        tip: "patch the four envelopes to timbre, pan, cutoff, and amplitude for one gesture unfolding at four scales.",
      },
      {
        id: "env-out-2",
        label: "envelope 2",
        type: "jack",
        x: 61.8,
        y: 89.3,
        size: 8.5,
        voltageRange: "0–10 V · poly",
        description: "lane 2's contour with its own range, invert, and normalization settings.",
        tip: "set this one to 0–5 V for destinations that expect a smaller swing.",
      },
      {
        id: "env-out-3",
        label: "envelope 3",
        type: "jack",
        x: 76.3,
        y: 89.3,
        size: 8.5,
        voltageRange: "0–10 V · poly",
        description: "lane 3's contour.",
        tip: "bipolar range here turns the gesture into a pan or pitch-bend curve.",
      },
      {
        id: "env-out-4",
        label: "envelope 4",
        type: "jack",
        x: 90.8,
        y: 89.3,
        size: 8.5,
        voltageRange: "0–10 V · poly",
        description: "lane 4's contour. In ADSR mode all outputs share the shape with their own range and invert.",
        tip: "four mappings of one ADSR: 0–10, 0–5, bipolar, inverted, one gate, four compatible destinations.",
      },
    ],
    contextMenu: [
      {
        id: "mode-gesture",
        group: "mode",
        label: "gesture mode",
        kind: "choice",
        description: "Menu equivalent of the panel switch: one contour, four playheads with independent speed, phase, loop, window, inversion, clock fit, range."
      },
      {
        id: "mode-adsr",
        group: "mode",
        label: "adsr mode",
        kind: "choice",
        description: "One polyphonic ADSR to all outputs. Gesture preserved; Recollect idles without losing memories."
      },
      {
        id: "trigger-behavior",
        group: "gesture trigger behavior",
        label: "gesture trigger behavior",
        kind: "choice",
        values: ["restart active loops", "keep active loops running"],
        description: [
          "restart active loops: every trigger restarts every lane (default)",
          "keep active loops running: traversing loops are left alone; one-shots, idle loops, and releases still restart. Gate rising unaffected"
        ]
      },
      {
        id: "clock-fit",
        group: "clock fit",
        label: "clock fit · per envelope",
        kind: "choice",
        values: ["free", "1/4 beat", "1/2 beat", "1 beat", "2 beats", "4 beats"],
        description: "Free or a beat division per Gesture lane. Fitted lanes ignore Speed until Free; Phase stays active. The OLED timing capsule cycles the same setting."
      },
      {
        id: "output-ranges",
        group: "output voltage ranges",
        label: "output voltage ranges · per lane",
        kind: "choice",
        values: ["0–10 V", "0–5 V", "−5 to +5 V"],
        description: "Range per Envelope output. Invert reverses whichever is selected."
      },
      {
        id: "normalize-peak",
        group: "gesture",
        label: "normalize gesture peak",
        kind: "toggle",
        description: "Scales the gesture against its peak reference without rewriting it. With Recollect, the reference follows the selected endpoint or A/B peaks."
      },
      {
        id: "display-theme",
        group: "display theme",
        label: "display theme",
        kind: "choice",
        values: ["follow shapetaker theme", "phosphor", "lunar", "solar", "amber"],
        description: "OLED phosphor color, shared theme or local; Recollect's screen follows too."
      },
      {
        id: "quantize-adsr-phase",
        group: "compatibility",
        label: "quantize adsr phase cv",
        kind: "toggle",
        description: "Saved for compatibility; currently no effect, ADSR contour CV is not in the signal path."
      }
    ],
    manual: [
      {
        title: "gesture memory",
        body: "The strip records height against time, five seconds max at up to 960 samples/s, rebuilt into an interpolation table. Trims remove silence at either end. Four lanes read one contour with independent SPEED (0.05×–8×), PHASE, loop windows, INVERT, clock fit, and range, up to 64 playheads at once."
      },
      {
        title: "triggers, gates, clock",
        body: "TRIGGER restarts voices at boundaries (or spares traversing loops); GATE starts on rising, glides to 0 V on falling; with both patched, Trigger wins. CLOCK only learns tempo from four edges so lanes can fit 1/4–4 beats; fitted lanes ignore Speed until Free."
      },
      {
        title: "adsr mode and recollect",
        body: "In ADSR the lane buttons select stages; SPEED sets time or level, PHASE bends contour log-to-exp, the strip edits both. All outputs share the shape with independent range and invert. Recollect to the right morphs two stored memories; Evocation keeps recording, triggers, clock fit, windows, and polyphony."
      }
    ],
    suggestedPatches: [
      {
        id: "four-speeds-one-hand",
        title: "four speeds from one hand",
        description: "Record a slow rise and fall, leave the lanes at 1×, 2×, 4×, and 8×, and send them to four destinations. One gesture unfolds at four scales from a single trigger.",
        difficulty: "beginner",
        viewBox: "0 0 620 300",
        nodes: [
          {
            id: "seq",
            label: "Sequencer",
            sublabel: "gate + v/oct",
            x: 20, y: 90, width: 140, height: 100,
            ports: [
              { id: "gate", label: "Gate", side: "right", offsetY: 78, icon: "square" }
            ]
          },
          {
            id: "evocation",
            label: "Evocation",
            x: 200, y: 20, width: 180, height: 260,
            settings: [
              { label: "Mode", value: "Gesture" },
              { label: "Speeds", value: "1× 2× 4× 8×" }
            ],
            ports: [
              { id: "trigger", label: "Trigger", side: "left", offsetY: 80 },
              { id: "env1", label: "Env 1", side: "right", offsetY: 70 },
              { id: "env2", label: "Env 2", side: "right", offsetY: 120 },
              { id: "env3", label: "Env 3", side: "right", offsetY: 170 },
              { id: "env4", label: "Env 4", side: "right", offsetY: 220 }
            ]
          },
          {
            id: "voice",
            label: "Voice",
            sublabel: "filter + vca + pan",
            x: 420, y: 20, width: 160, height: 260,
            ports: [
              { id: "cutoff", label: "Cutoff", side: "left", offsetY: 70 },
              { id: "timbre", label: "Timbre", side: "left", offsetY: 120 },
              { id: "pan", label: "Pan", side: "left", offsetY: 170 },
              { id: "vca", label: "VCA", side: "left", offsetY: 220 }
            ]
          }
        ],
        cables: [
          { id: "trig", fromNode: "seq", fromPort: "gate", toNode: "evocation", toPort: "trigger", color: "#5ec2ab" },
          { id: "e1", fromNode: "evocation", fromPort: "env1", toNode: "voice", toPort: "vca", color: "#68B7C8" },
          { id: "e2", fromNode: "evocation", fromPort: "env2", toNode: "voice", toPort: "cutoff", color: "#68B7C8" },
          { id: "e3", fromNode: "evocation", fromPort: "env3", toNode: "voice", toPort: "pan", color: "#a78bfa" },
          { id: "e4", fromNode: "evocation", fromPort: "env4", toNode: "voice", toPort: "timbre", color: "#a78bfa" }
        ],
        steps: [
          {
            instruction: "Draw a slow rise and fall on the touch strip, then press TRIM LEAD and TRIM TAIL.",
            detail: "Hold, move up, move down, release. Trimming removes any hesitation at the start and dead air at the end so the four lanes wrap cleanly.",
            cableIds: []
          },
          {
            instruction: "Patch your sequencer's gate into TRIGGER.",
            detail: "Every rising edge restarts all four lanes at the start of the gesture. A polyphonic gate gives every voice its own set of playheads.",
            cableIds: ["trig"]
          },
          {
            instruction: "Send the slowest lane to amplitude and the faster lanes to cutoff, pan, and timbre.",
            detail: "Lane 1 at 1× is the whole shape; lanes 2–4 replay it two, four, and eight times inside that shape. Set lane 3 to −5 to +5 V in the context menu so pan swings both ways.",
            cableIds: ["e1", "e2", "e3", "e4"]
          }
        ]
      }
    ]
  },
  {
    slug: "recollect",
    name: "recollect",
    subtitle: "two persistent gesture memories for evocation, separate non-destructive transforms, continuous a/b morphing, and three dedicated outputs",
    summary: "A 10 HP expander that sits immediately to Evocation's right. Each completed recording lands in memory A or B; Reverse, Mirror, Smooth, Simplify, and Normalize reshape the selected memory without touching the take, and MORPH crossfades continuously between the two results.",
    category: "vcv rack module",
    status: "gesture expander",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Shuffle,
    hp: 10,
    panelImage: {
      src: "/modules/recollect/panel-v3.webp",
      width: 750,
      height: 1900,
      alt: "recollect vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "oled",
        label: "oled display",
        type: "meter",
        x: 50.0,
        y: 19.1,
        size: 62,
        description: [
          "reads AWAITING EVOCATION until linked, Recollect must sit immediately to Evocation's right",
          "A draws in theme color, B in amber; the result curve blends between them with MORPH",
          "A/B weights show crossfade amounts (empty dimmed); REC A/B shows the next destination, padlocked when protected; the bottom line summarizes transforms",
          "a brief RAW overlay after transform changes compares the raw take, visual only, CV updates immediately",
        ],
        tip: "watch the A/B weights while turning MORPH, they show whether both memories are populated.",
      },
      {
        id: "smooth",
        label: "smooth",
        type: "knob",
        x: 25.0,
        y: 40.1,
        size: 27,
        description: "symmetrical low-pass smoothing of the selected memory, softens jitter without shifting timing. Applied after Reverse/Mirror, before Simplify/Normalize.",
        tip: "a little Smooth keeps the intent and drops the tremor.",
      },
      {
        id: "simplify",
        label: "simplify",
        type: "knob",
        x: 75.0,
        y: 40.1,
        size: 27,
        description: "replaces detail with fewer straight-line segments. Low values preserve the hand; high values reveal the geometry.",
        tip: "push it far and a scribble becomes a staircase, the gesture as a stepped sequence.",
      },
      {
        id: "morph",
        label: "morph",
        type: "knob",
        x: 50.0,
        y: 57.2,
        size: 27,
        description: [
          "0% is transformed A, 100% transformed B; positions crossfade continuously by normalized phase",
          "with both memories, durations interpolate too, changing Evocation's base length; clock fit overrides per lane",
          "with one memory, it supplies the result across the range",
        ],
        tip: "record a rising A and falling B, Mirror B, then sweep, opposites become family.",
      },
      {
        id: "select-a",
        label: "rec a",
        type: "switch",
        x: 17.3,
        y: 64.8,
        size: 15,
        description: [
          "selects A for the next Evocation recording and for the transform controls",
          "selecting never overwrites. With alternation on (default), a take selects B after; locked A refuses capture and doesn't advance",
          "trimming a fresh take counts as an edit, it updates the receiving memory without advancing",
        ],
        tip: "lock a keeper in A, experiment in B, morph toward A as anchor.",
      },
      {
        id: "select-b",
        label: "rec b",
        type: "switch",
        x: 80.0,
        y: 64.8,
        size: 15,
        description: "selects B for capture and editing, same rules as A. If both are empty at first attach, Evocation's gesture is adopted into the selected memory.",
        tip: "call and response: leave alternation on, record twice, never touch Recollect.",
      },
      {
        id: "reverse",
        label: "reverse",
        type: "switch",
        x: 17.3,
        y: 76.9,
        size: 15,
        description: "flips the selected memory in time before playback and morph, independent of Evocation's loop travel. First in transform order.",
        tip: "reverse only B and MORPH crossfades a gesture with its retrograde.",
      },
      {
        id: "mirror",
        label: "palindrome (mirror)",
        type: "switch",
        x: 48.6,
        y: 76.9,
        size: 15,
        description: "panel label PALINDROME: flips the selected memory's amplitude in 0–1. Applying to one memory changes the path between them, not just the output.",
        tip: "toggle while listening to turn resemblance back into opposition.",
      },
      {
        id: "normalize",
        label: "normalize",
        type: "switch",
        x: 80.0,
        y: 76.9,
        size: 15,
        description: "scales the transformed memory so its peak reaches 1.0. Last in order: Reverse → Mirror → Smooth → Simplify → Normalize.",
        tip: "normalize both so MORPH sweeps shape, not loudness.",
      },
      {
        id: "a-out",
        label: "a out",
        type: "jack",
        x: 12.8,
        y: 89.4,
        size: 16,
        voltageRange: "0–10 V · poly",
        description: "the transformed A gesture as fixed 0–10 V, following Evocation lane 1's voices, speed, phase, window, direction, and clock fit. Ignores lane range/Invert/normalization; inactive during gate-release glide.",
        tip: "A OUT, MORPH OUT, B OUT to three timbral controls from one trigger.",
      },
      {
        id: "morph-out",
        label: "morph out",
        type: "jack",
        x: 37.6,
        y: 89.4,
        size: 16,
        voltageRange: "0–10 V · poly",
        description: "the current A/B morph as fixed 0–10 V following lane 1. Falls back to whichever memory exists; empty endpoints output 0 V.",
        tip: "Evocation's Envelope outputs already carry the morph per lane, this is the plain reference copy.",
      },
      {
        id: "morph-cv",
        label: "morph cv",
        type: "jack",
        x: 62.4,
        y: 89.4,
        size: 16,
        voltageRange: "10 V = full range · mono",
        description: "adds to MORPH at 10 V full range, clamped at endpoints; first channel only. Centered MORPH plus ±5 V scans all-A to all-B.",
        tip: "a slow LFO here breathes the contour between two hands.",
      },
      {
        id: "b-out",
        label: "b out",
        type: "jack",
        x: 87.2,
        y: 89.4,
        size: 16,
        voltageRange: "0–10 V · poly",
        description: "the transformed B gesture, same lane-1 following and fixed 0–10 V as A OUT.",
        tip: "with B reversed, A and B OUT are a gesture and its retrograde on one playhead.",
      },
    ],
    contextMenu: [
      {
        id: "record-target",
        group: "record target",
        label: "record target",
        kind: "choice",
        values: ["memory a", "memory b", "alternate a/b after each capture"],
        description: "Where the next recording lands, with alternation on (default) or off. Each take selects the other memory after."
      },
      {
        id: "write-protect",
        group: "write protect",
        label: "memory write protection",
        kind: "choice",
        values: ["lock a", "lock b"],
        description: "Lock A or B independently. Locks refuse capture, clear, copy, and swap (OLED reports LOCKED); transforms stay editable."
      },
      {
        id: "capture-current",
        group: "capture",
        label: "capture evocation gesture",
        kind: "choice",
        values: ["into a", "into b"],
        description: "Copy Evocation's current raw gesture into A or B immediately."
      },
      {
        id: "memory-ops",
        group: "memory operations",
        label: "memory operations",
        kind: "choice",
        values: ["copy a to b", "copy b to a", "swap a and b", "clear a", "clear b"],
        description: "Writes into locked destinations refused; swap needs both unlocked. Capturing into an occupied memory keeps its transforms."
      },
      {
        id: "reset-transforms",
        group: "transforms",
        label: "reset selected transforms",
        kind: "toggle",
        description: "Return the selected memory's transforms to neutral, for fresh takes that should play unaltered."
      }
    ],
    manual: [
      {
        title: "memories and capture",
        body: "A and B choose where Evocation recordings land and which memory transforms edit. Selecting never overwrites; alternation selects the other side after each take. Trims are edits, not takes. Locks refuse capture, clear, copy, and swap but leave transforms editable. If both are empty at first connection, Evocation's gesture is adopted."
      },
      {
        title: "transforms and morph",
        body: "Transforms apply to the selected memory in order Reverse → Mirror → Smooth → Simplify → Normalize, leaving raw takes intact. MORPH crossfades results by phase position and interpolates durations, changing Evocation's base length unless clock fit holds. Morph CV adds 10 V full range from its first channel."
      },
      {
        title: "outputs and evocation",
        body: "With ≥1 valid memory, Evocation plays the morphed contour through its four lanes. A/MORPH/B OUT are fixed 0–10 V polyphonic views following lane 1. Removing Recollect returns Evocation to its local recording; reconnecting restores memories, transforms, locks, and Morph, all saved with the patch."
      }
    ],
    suggestedPatches: [
      {
        id: "endpoints-and-argument",
        title: "endpoints plus their argument",
        description: "Two recorded gestures and the voltage-controlled path between them, all from one Evocation trigger. A OUT and B OUT drive two timbral controls while a slow LFO on MORPH CV drags the third between them.",
        difficulty: "intermediate",
        viewBox: "0 0 700 300",
        nodes: [
          {
            id: "clock",
            label: "Clock",
            x: 20, y: 30, width: 130, height: 80,
            ports: [
              { id: "trig", label: "Trig", side: "right", offsetY: 62, icon: "square" }
            ]
          },
          {
            id: "lfo",
            label: "LFO",
            sublabel: "0.05 Hz · ±5 V",
            x: 20, y: 190, width: 130, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 72, icon: "sine" }
            ]
          },
          {
            id: "evocation",
            label: "Evocation",
            x: 190, y: 20, width: 140, height: 260,
            settings: [
              { label: "Mode", value: "Gesture" }
            ],
            ports: [
              { id: "trigger", label: "Trigger", side: "left", offsetY: 62 }
            ]
          },
          {
            id: "recollect",
            label: "Recollect",
            sublabel: "expander · right of Evocation",
            x: 340, y: 20, width: 150, height: 260,
            settings: [
              { label: "Morph", value: "50%" },
              { label: "Mirror B", value: "on" }
            ],
            ports: [
              { id: "morph-cv", label: "Morph CV", side: "left", offsetY: 222 },
              { id: "a-out", label: "A Out", side: "right", offsetY: 80 },
              { id: "morph-out", label: "Morph Out", side: "right", offsetY: 140 },
              { id: "b-out", label: "B Out", side: "right", offsetY: 200 }
            ]
          },
          {
            id: "voice",
            label: "Voice",
            x: 540, y: 20, width: 140, height: 260,
            ports: [
              { id: "cutoff", label: "Cutoff", side: "left", offsetY: 80 },
              { id: "wave", label: "Wave", side: "left", offsetY: 140 },
              { id: "fm", label: "FM Amt", side: "left", offsetY: 200 }
            ]
          }
        ],
        cables: [
          { id: "trig", fromNode: "clock", fromPort: "trig", toNode: "evocation", toPort: "trigger", color: "#5ec2ab" },
          { id: "lfo-morph", fromNode: "lfo", fromPort: "out", toNode: "recollect", toPort: "morph-cv", color: "#a78bfa" },
          { id: "a", fromNode: "recollect", fromPort: "a-out", toNode: "voice", toPort: "cutoff", color: "#68B7C8" },
          { id: "m", fromNode: "recollect", fromPort: "morph-out", toNode: "voice", toPort: "wave", color: "#D7B56D" },
          { id: "b", fromNode: "recollect", fromPort: "b-out", toNode: "voice", toPort: "fm", color: "#68B7C8" }
        ],
        steps: [
          {
            instruction: "With Recollect immediately to Evocation's right, record two gestures back to back.",
            detail: "Leave Alternate after each capture on. The first take lands in A, the second in B, and the selector returns to A. Press MIRROR with B selected so the two contours pull in opposite directions.",
            cableIds: ["trig"]
          },
          {
            instruction: "Patch A OUT, MORPH OUT, and B OUT to three controls on one voice.",
            detail: "All three are fixed 0–10 V views following Evocation lane 1, so they share one playhead: the two source gestures and the path between them arrive together on every trigger.",
            cableIds: ["a", "m", "b"]
          },
          {
            instruction: "Patch a slow bipolar LFO into MORPH CV with the knob centered.",
            detail: "±5 V scans from all A to all B. MORPH OUT now drifts between the two hands while A OUT and B OUT stay fixed at the endpoints.",
            cableIds: ["lfo-morph"]
          }
        ]
      }
    ]
  },
  {
    slug: "involution",
    name: "involution",
    subtitle: "two liquid 6-pole filters orbiting one lorenz strange attractor, with spread, cross-coupling, and four routing topologies",
    summary: "Two morphable filters that move from a deep 6-pole lowpass through resonant bandpass to highpass. SPREAD pulls their cutoffs apart, COUPLE circulates one lane into the other, and a Lorenz attractor supplies motion that never quite repeats.",
    category: "vcv rack module",
    status: "dual chaotic filter",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Filter,
    hp: 18,
    panelImage: {
      src: "/modules/involution/panel-v5.webp",
      width: 1350,
      height: 1900,
      alt: "involution vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 01557",
      type: "HARMONIC REDUCTION",
    },
    controls: [
      {
        id: "crt",
        label: "crt field display",
        type: "meter",
        x: 50.0,
        y: 43.6,
        size: 50,
        description: [
          "one view of the whole field: COUPLE twists the orbit, SPREAD separates its bands, FORM reshapes it, routing changes direction",
          "click to freeze the field; click again to release. Also pauses while FREEZE GATE is high",
          "theme and particle rendering live in the context menu; never touch audio",
        ],
        tip: "freeze a voicing you like; release when you want the room to breathe.",
      },
      {
        id: "cutoff-a",
        label: "cutoff a",
        type: "knob",
        x: 23.2,
        y: 17.5,
        size: 20,
        description: [
          "base cutoff 20 Hz–20.5 kHz, with extra travel in the musical midrange",
          "factory position is fully open, turn down before raising resonance",
          "voice 1 exact; voices 2–16 get fixed ±1.5-semitone offsets so chord peaks don't stack",
        ],
        tip: "with LINK CUTOFF, this drives both lanes and SPREAD is the only separation.",
      },
      {
        id: "cutoff-b",
        label: "cutoff b",
        type: "knob",
        x: 76.8,
        y: 17.5,
        size: 20,
        description: "base cutoff for B, same range and curve as A; independent unless linked.",
        tip: "B an octave above A with zero SPREAD is a classic stereo tilt.",
      },
      {
        id: "link-cutoff",
        label: "link cutoff",
        type: "switch",
        x: 50.0,
        y: 11.7,
        size: 9,
        description: [
          "independent: each knob moves its own lane",
          "linked: engaging copies A to B first; then either knob moves both",
        ],
        tip: "link, then SPREAD is your only stereo separation.",
        diagrams: [
          { id: "link-cut-off", label: "independent", icon: "Unlink", state: "down" },
          { id: "link-cut-on", label: "linked", icon: "Link", state: "up" },
        ],
      },
      {
        id: "link-resonance",
        label: "link resonance",
        type: "switch",
        x: 50.0,
        y: 22.2,
        size: 9,
        description: "same as LINK CUTOFF for the RESONANCE knobs, A copies to B on engage, then they track.",
        tip: "link resonance but not cutoff for differently tuned peaks at equal intensity.",
        diagrams: [
          { id: "link-res-off", label: "independent", icon: "Unlink", state: "down" },
          { id: "link-res-on", label: "linked", icon: "Link", state: "up" },
        ],
      },
      {
        id: "cutoff-a-atten",
        label: "cutoff a cv attenuverter",
        type: "knob",
        x: 10.9,
        y: 33.1,
        size: 10,
        description: [
          "normal: bipolar CUTOFF A CV scaling, full means 10 V spans the range",
          "1V/oct mode: tracking amount and direction, +1 an octave per volt, −1 reverse",
        ],
        tip: "for played resonance, enable 1V/oct tracking and turn fully clockwise; the knob becomes base tuning.",
      },
      {
        id: "cutoff-a-cv",
        label: "cutoff a cv",
        type: "jack",
        x: 31.1,
        y: 33.4,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic cutoff modulation for A via its attenuverter. Mono broadcasts; narrower poly holds its last channel for remaining voices.",
        tip: "audio rate works, though fastest edges are softened.",
      },
      {
        id: "cutoff-b-cv",
        label: "cutoff b cv",
        type: "jack",
        x: 68.9,
        y: 33.4,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic cutoff modulation for B via its attenuverter; independent 1V/oct tracking available.",
        tip: "one pitch CV into both inputs with opposite signs tracks the lanes in contrary motion.",
      },
      {
        id: "cutoff-b-atten",
        label: "cutoff b cv attenuverter",
        type: "knob",
        x: 89.1,
        y: 33.1,
        size: 10,
        description: "bipolar CUTOFF B CV scaling, or tracking amount/direction with B 1V/oct enabled.",
        tip: "mirror A's attenuverter for symmetric motion; invert it for open-one-side/close-the-other.",
      },
      {
        id: "resonance-a",
        label: "resonance a",
        type: "knob",
        x: 14.5,
        y: 49.4,
        size: 13,
        description: [
          "ladder-style resonant feedback for A; the top range crosses into stabilized self-oscillation",
          "in Liquid, resonant energy blooms the cutoff up then pulls it back, the seeking-and-settling the module is named for",
        ],
        tip: "raise resonance before COUPLE, coupling needs audible peaks.",
      },
      {
        id: "resonance-b",
        label: "resonance b",
        type: "knob",
        x: 85.5,
        y: 49.4,
        size: 13,
        description: "resonant feedback for B; independent unless LINK RESONANCE is engaged.",
        tip: "coupled bell: both resonances high, short impulse in, SPREAD tunes the ringing peaks.",
      },
      {
        id: "resonance-a-cv",
        label: "resonance a cv",
        type: "jack",
        x: 32.2,
        y: 54.9,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic resonance modulation for A. Full positive: +10 V adds 1.0, the whole panel range; negative subtracts.",
        tip: "per-voice envelopes here bloom each note's own peak instead of swelling the chord.",
      },
      {
        id: "resonance-b-cv",
        label: "resonance b cv",
        type: "jack",
        x: 67.8,
        y: 54.9,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic resonance modulation for B, same scaling as A.",
        tip: "modulate only B in Mid/Side and the sides shimmer while the center stays.",
      },
      {
        id: "resonance-a-atten",
        label: "resonance a cv attenuverter",
        type: "knob",
        x: 14.5,
        y: 63.5,
        size: 10,
        description: "bipolar scaling for RESONANCE A CV.",
        tip: "small negative amounts from an envelope calm each attack's peak and bloom the tail.",
      },
      {
        id: "resonance-b-atten",
        label: "resonance b cv attenuverter",
        type: "knob",
        x: 85.5,
        y: 63.5,
        size: 10,
        description: "bipolar scaling for RESONANCE B CV.",
        tip: "opposite signs on the two attenuverters trade intensity between lanes under one modulator.",
      },
      {
        id: "spread-cv",
        label: "spread cv",
        type: "jack",
        x: 32.2,
        y: 64.0,
        size: 9,
        voltageRange: "0–10 V · mono",
        description: "shared A/B separation, 10 V adds the full three-octave spread atop the knob. Global: first channel only.",
        tip: "a slow triangle breathes the cutoffs apart and together with neither lane moving alone.",
      },
      {
        id: "freeze-gate",
        label: "freeze gate",
        type: "jack",
        x: 67.8,
        y: 64.0,
        size: 9,
        voltageRange: "gate ≥ 1 V",
        description: "pauses both attractors while ≥1 V. A hold, not a reset, the field resumes exactly where it stopped. Independent of the CRT click latch.",
        tip: "gate from a sequencer so chaos moves only between phrases.",
      },
      {
        id: "chaos-rate",
        label: "chaos rate",
        type: "knob",
        x: 50.0,
        y: 65.6,
        size: 11,
        description: [
          "Lorenz speed 0.01–10 Hz, shared by both lanes and every voice",
          "voice 4+ invert their axis, so big chords never march as one block",
        ],
        tip: "below 0.1 Hz is weather; above 2 Hz it sounds like a modulation source.",
      },
      {
        id: "couple",
        label: "couple",
        type: "knob",
        x: 14.5,
        y: 76.4,
        size: 13,
        description: [
          "feeds A's previous output into B and B into A through a saturated, bounded return",
          "low values tie stereo movement together; high values circulate harmonics and controlled instability",
          "active in every routing, serial and cross-coupling coexist",
        ],
        tip: "raise slowly with both resonances high, the lanes answer each other in the last third.",
      },
      {
        id: "spread",
        label: "spread",
        type: "knob",
        x: 38.2,
        y: 76.4,
        size: 13,
        description: [
          "lowers A and raises B equally; at maximum the cutoffs sit three octaves apart",
          "a small per-voice offset remains so chord peaks never stack",
        ],
        tip: "with cutoffs linked, SPREAD is the whole stereo image, spectral widening, not spatial.",
      },
      {
        id: "chaos-depth",
        label: "chaos depth",
        type: "knob",
        x: 61.8,
        y: 76.4,
        size: 13,
        description: [
          "scales Lorenz motion; A and B get different axes for cutoff, a third handles the rest where allowed",
          "Chaos Destination decides what moves: cutoff, cutoff plus opposing resonance, or the full field with Form and Couple",
        ],
        tip: "start with Cutoff only, the full field is glorious but easy to overdo.",
      },
      {
        id: "form",
        label: "form",
        type: "knob",
        x: 85.5,
        y: 76.4,
        size: 13,
        description: [
          "0%: 6-pole lowpass",
          "50%: resonant bandpass",
          "100%: 2-pole highpass",
          "the cascade and resonance run at every position, one instrument, not three modes",
          "with Opposed Form, B moves backward, LP vs HP at the ends, meeting at bandpass",
        ],
        tip: "opposing vowels: Opposed Form on, FORM near center, slow Form CV.",
        diagrams: [
          { id: "form-lp", label: "6-pole lowpass", icon: "ChevronDown", rotation: -135 },
          { id: "form-bp", label: "bandpass", icon: "Activity", rotation: 0 },
          { id: "form-hp", label: "2-pole highpass", icon: "ChevronUp", rotation: 135 },
        ],
      },
      {
        id: "audio-a-in",
        label: "a in",
        type: "jack",
        x: 9.8,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic audio input for A. A lone input normals to both lanes; mono broadcasts across the other input's voice count.",
        tip: "leave B IN empty for true stereo filtering of mono, SPREAD and chaos image it.",
      },
      {
        id: "audio-b-in",
        label: "b in",
        type: "jack",
        x: 21.3,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic audio input for B. Wider audio input sets channel count (≤16); CV alone creates no voices.",
        tip: "in Mid/Side, feed a true stereo pair: A filters mid, B filters side.",
      },
      {
        id: "couple-cv",
        label: "couple cv",
        type: "jack",
        x: 32.8,
        y: 89.1,
        size: 9,
        voltageRange: "0–10 V · poly",
        description: "adds to COUPLE at 10 V full range, per voice.",
        tip: "per-voice velocity here rings hard-played notes into each other.",
      },
      {
        id: "chaos-depth-cv",
        label: "chaos depth cv",
        type: "jack",
        x: 44.3,
        y: 89.1,
        size: 9,
        voltageRange: "0–10 V · poly",
        description: "adds to CHAOS DEPTH at 10 V full range, per voice.",
        tip: "gate from a slow LFO to alternate still and roaming.",
      },
      {
        id: "chaos-rate-cv",
        label: "chaos rate cv",
        type: "jack",
        x: 55.7,
        y: 89.1,
        size: 9,
        voltageRange: "0.5 Hz/V · mono",
        description: "shared attractor speed, +0.5 Hz per volt from the first channel, clamped to 0.01–10 Hz.",
        tip: "a brief positive pulse whips the attractor into a new orbit region.",
      },
      {
        id: "form-cv",
        label: "form cv",
        type: "jack",
        x: 67.2,
        y: 89.1,
        size: 9,
        voltageRange: "0–10 V · poly",
        description: "adds to FORM at 10 V full travel, per voice; Opposed Form preserved under CV.",
        tip: "per-voice envelopes sweep each note lowpass-to-bandpass on its own timeline.",
      },
      {
        id: "audio-a-out",
        label: "a out",
        type: "jack",
        x: 78.7,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic lane-A output. Linear to ±8 V, bending toward ±12 V; a module guard catches coupled peaks past ±10 V.",
        tip: "in Mid/Side this is already the decoded left channel, no external decoder needed.",
      },
      {
        id: "audio-b-out",
        label: "b out",
        type: "jack",
        x: 90.2,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic lane-B output, same channel count as inputs.",
        tip: "serial routing lands here, A into B means this jack carries the cascade.",
      },
    ],
    contextMenu: [
      {
        id: "screen-theme",
        group: "screen",
        label: "screen theme",
        kind: "choice",
        values: ["follow shapetaker theme", "local phosphor color"],
        description: "Shared Shapetaker theme or a local CRT phosphor. Rendering only, audio never changes."
      },
      {
        id: "screen-particles",
        group: "screen",
        label: "screen particles",
        kind: "choice",
        values: ["bloom (brighter, flickering)", "stable (steadier, softer)"],
        description: [
          "bloom: brighter, deliberately flickering at hot points",
          "stable: clamps those points for a steadier, softer image"
        ]
      },
      {
        id: "filter-routing",
        group: "filter routing",
        label: "filter routing",
        kind: "choice",
        values: ["parallel stereo", "serial a into b", "serial b into a", "mid / side"],
        description: [
          "parallel stereo: A and B process independently",
          "serial a into b: A's output feeds B's input",
          "serial b into a: the reverse cascade",
          "mid / side: A filters mid, B filters side, decoded back to A/B. COUPLE stays active everywhere"
        ]
      },
      {
        id: "opposed-form",
        group: "filter routing",
        label: "opposed form (reverse b)",
        kind: "toggle",
        description: "A follows FORM while B moves backward, LP vs HP at the ends, bandpass in the center. Form CV and full-field chaos preserve it."
      },
      {
        id: "chaos-destination",
        group: "chaos",
        label: "chaos destination",
        kind: "choice",
        values: ["cutoff", "cutoff + resonance", "full filter field"],
        description: [
          "cutoff: only the two cutoffs move",
          "cutoff + resonance: adds opposing resonance from the third axis",
          "full filter field: plus subtler Form and Couple motion"
        ]
      },
      {
        id: "freeze-chaos",
        group: "chaos",
        label: "freeze chaos field",
        kind: "toggle",
        description: "Menu equivalent of clicking the CRT, latches both attractors until released."
      },
      {
        id: "filter-character",
        group: "filter character",
        label: "filter character",
        kind: "choice",
        values: ["still", "liquid", "volatile"],
        description: [
          "still: no level-dependent movement; filter, resonance, saturation, chaos remain",
          "liquid: transients breathe cutoff up, resonant blooms pull it back",
          "volatile: exaggerated breath, bloom, and sweep grip"
        ]
      },
      {
        id: "tracking-a",
        group: "cutoff cv mode",
        label: "filter a 1v/oct tracking",
        kind: "toggle",
        description: "CUTOFF A CV becomes pitch tracking. Attenuverter is amount and direction: +1 an octave per volt, −1 reverse."
      },
      {
        id: "tracking-b",
        group: "cutoff cv mode",
        label: "filter b 1v/oct tracking",
        kind: "toggle",
        description: "Same pitch-tracking mode for CUTOFF B CV, independent of A."
      }
    ],
    manual: [
      {
        title: "liquid filters",
        body: "Each lane cascades three 2-pole stages at 4× oversampling with ladder-style resonance, driven into asymmetric saturation while the low end stays out of the feedback loop. FORM crossfades real responses inside that core, 6-pole LP, resonant BP, 2-pole HP, with the cascade always running. In Liquid, transients breathe cutoff up and resonant blooms pull it back."
      },
      {
        title: "the lorenz field",
        body: "A Lorenz attractor gives three non-repeating signals: separate axes for A/B cutoff, a third for resonance, Form, and Couple where permitted. DEPTH scales motion, RATE runs 0.01–10 Hz, a slower attractor adds drift. Click the CRT or hold FREEZE GATE to latch, a hold, never a reset."
      },
      {
        title: "spread, couple, routing",
        body: "SPREAD separates A and B up to three octaves. COUPLE circulates each lane's output into the other through a saturated return, active in every topology: parallel, serial either way, or Mid/Side. 16 voices follow the audio; cutoff, resonance, Couple, Depth, Form CV are per voice, Rate/Spread/Freeze global."
      }
    ],
    suggestedPatches: [
      {
        id: "coupled-bell",
        title: "the coupled bell",
        description: "A short trigger as audio, both resonances high, and COUPLE raised until the two ringing peaks answer each other. SPREAD tunes the interval; a little chaos keeps each strike from resolving like the last.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "trigger",
            label: "Trigger",
            sublabel: "or short click",
            x: 20, y: 40, width: 140, height: 90,
            ports: [
              { id: "out", label: "Trig", side: "right", offsetY: 70, icon: "square" }
            ]
          },
          {
            id: "lfo",
            label: "LFO",
            sublabel: "0.05 Hz triangle",
            x: 20, y: 160, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 70, icon: "triangle" }
            ]
          },
          {
            id: "involution",
            label: "Involution",
            x: 200, y: 20, width: 180, height: 240,
            settings: [
              { label: "Resonance A/B", value: "80%" },
              { label: "Couple", value: "60%" },
              { label: "Chaos Depth", value: "15%" }
            ],
            ports: [
              { id: "a-in", label: "A In", side: "left", offsetY: 70 },
              { id: "spread-cv", label: "Spread CV", side: "left", offsetY: 190 },
              { id: "a-out", label: "A Out", side: "right", offsetY: 70 },
              { id: "b-out", label: "B Out", side: "right", offsetY: 100 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            sublabel: "or Interface",
            x: 420, y: 40, width: 140, height: 110,
            ports: [
              { id: "left-in", label: "Left In", side: "left", offsetY: 70 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 100 }
            ]
          }
        ],
        cables: [
          { id: "trig-audio", fromNode: "trigger", fromPort: "out", toNode: "involution", toPort: "a-in", color: "#5ec2ab" },
          { id: "lfo-spread", fromNode: "lfo", fromPort: "out", toNode: "involution", toPort: "spread-cv", color: "#a78bfa" },
          { id: "out-l", fromNode: "involution", fromPort: "a-out", toNode: "mixer", toPort: "left-in", color: "#D7B56D" },
          { id: "out-r", fromNode: "involution", fromPort: "b-out", toNode: "mixer", toPort: "right-in", color: "#D7B56D" }
        ],
        steps: [
          {
            instruction: "Patch a trigger or short click into A IN and leave B IN empty.",
            detail: "The single input is normalled to both lanes. Turn both CUTOFF knobs down to around 10 o'clock and raise both RESONANCE knobs until each strike rings.",
            cableIds: ["trig-audio"]
          },
          {
            instruction: "Raise COUPLE slowly until the two peaks start pulling on each other.",
            detail: "Around 60% the lanes begin answering one another. Add a small amount of CHAOS DEPTH with Chaos Destination set to Cutoff so no two strikes resolve identically.",
            cableIds: []
          },
          {
            instruction: "Patch a slow LFO into SPREAD CV and take A OUT and B OUT as a stereo pair.",
            detail: "SPREAD tunes the interval between the two ringing peaks; a triangle at 0.05 Hz drifts that interval through the piece without either lane moving on its own.",
            cableIds: ["lfo-spread", "out-l", "out-r"]
          }
        ]
      }
    ]
  },
  {
    slug: "specula",
    name: "specula",
    subtitle: "dual peak meter with vu scales and mechanical needle ballistics, polyphonic detection, transparent pass-through",
    summary: "Two watchful needles with the inertia of a real movement: 15 ms rise, 450 ms fall, calibrated so a full-scale ±10 V signal reaches the red edge at +3 VU. Every input sample and every polyphonic channel is copied straight to the matching output.",
    category: "vcv rack module",
    status: "vu meter",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Gauge,
    hp: 10,
    panelImage: {
      src: "/modules/specula/panel-v5.webp",
      width: 750,
      height: 1900,
      alt: "specula vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 07843",
      type: "VU METER",
      alt: "CALIBRATED",
    },
    controls: [
      {
        id: "left-meter",
        label: "left meter",
        type: "meter",
        x: 50.0,
        y: 25.9,
        size: 72,
        description: [
          "dial spans −20 to +3 VU; detector reads absolute peak with ±10 V as full scale",
          "0 VU is −3 dBFS (~7.08 V peak), +3 VU is 0 dBFS at the red edge; ±5 V audio reads ~−3 VU",
          "needle rises in 15 ms, falls in 450 ms, fast for transients, slow enough to read",
        ],
        tip: "the red half is the final 3 dB, if it lives there, your interface is about to clip.",
      },
      {
        id: "right-meter",
        label: "right meter",
        type: "meter",
        x: 50.0,
        y: 63.0,
        size: 72,
        description: [
          "same scale and ballistics as left, evaluated independently, no L-to-R normalization",
          "with poly cables the needle follows the hottest channel",
          "dial illumination (factory 62%) is artwork only",
        ],
        tip: "insert into a poly cable to confirm a voice crosses threshold, though not which one.",
      },
      {
        id: "left-in",
        label: "l in",
        type: "jack",
        x: 18.3,
        y: 89.1,
        size: 16,
        voltageRange: "any · poly ≤16",
        description: "independent mono/poly input for the left meter. Absolute-magnitude detection, so slow CV and negative swings meter too.",
        tip: "unpatched input gives zero channels at the output, not a silent mono cable.",
      },
      {
        id: "right-in",
        label: "r in",
        type: "jack",
        x: 40.1,
        y: 89.1,
        size: 16,
        voltageRange: "any · poly ≤16",
        description: "independent input for the right meter. No normalization, patching only L leaves R dark.",
        tip: "meter a bipolar LFO to watch excursion without a scope.",
      },
      {
        id: "left-out",
        label: "l out",
        type: "jack",
        x: 62.0,
        y: 89.1,
        size: 16,
        voltageRange: "= input",
        description: "exact per-sample copy of L IN, all channels. No filtering, gain, saturation, or delay.",
        tip: "place before your interface module so the red half means what it says.",
      },
      {
        id: "right-out",
        label: "r out",
        type: "jack",
        x: 83.8,
        y: 89.1,
        size: 16,
        voltageRange: "= input",
        description: "exact per-sample copy of R IN, channel count preserved.",
        tip: "bit-transparent, safe on a recording bus.",
      },
    ],
    contextMenu: [
      {
        id: "screen-brightness",
        group: "meter display",
        label: "screen brightness",
        kind: "slider",
        description: "Dial illumination, factory 62%. Artwork only, needle and signal untouched."
      }
    ],
    manual: [
      {
        title: "scale and calibration",
        body: "Dials span −20 to +3 VU against Rack's ±10 V full scale: 0 VU is −3 dBFS (~7.08 V peak), +3 VU is 0 dBFS at the red edge, ±5 V sits near −3 VU. The final 3 dB fill the red half, so headroom reads at a glance."
      },
      {
        title: "ballistics",
        body: "A peak detector feeds a mechanical-style smoother: 15 ms rise, 450 ms fall. Peak-oriented metering with vintage motion, not standards RMS VU, equal-peak sine and transient can look different."
      },
      {
        title: "polyphony and pass-through",
        body: "Each side takes ≤16 channels and shows the largest absolute voltage. Outputs copy inputs exactly; sides fully independent, no normalization, gain, or delay."
      }
    ]
  },
  {
    slug: "utility-panel",
    name: "utility panel",
    subtitle: "a blank panel that knows when the gap is the wrong size, resizable from 2 to 64 hp, with auto-fit to its neighbors",
    summary: "Fills the unused space between modules without a drawer full of fixed-width blanks. Drag either edge to resize in whole-HP steps, or double-click to fit the surrounding gap. The leather grain stays at a consistent scale and the width is saved with the patch.",
    category: "vcv rack module",
    status: "resizable blank",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Square,
    hp: 2,
    panelImage: {
      src: "/modules/utility-panel/panel-v3.webp",
      width: 150,
      height: 1900,
      alt: "utility panel vcv rack module at its 2 hp starting width"
    },
    media: {},
    controls: [
      {
        id: "edge-handles",
        label: "edge handles",
        type: "switch",
        x: 50.0,
        y: 30.0,
        size: 90,
        description: [
          "a strip along each edge is the resize handle: right moves the right boundary, left moves the left",
          "width rounds to whole HP, clamped 2–64 HP",
          "Rack still owns collision, an overlapping size reverts",
        ],
        tip: "grab the edge nearest the module you want anchored.",
      },
      {
        id: "panel-body",
        label: "panel body",
        type: "meter",
        x: 50.0,
        y: 55.0,
        size: 90,
        description: [
          "double-click the body or an edge to auto-fit: nearest module left and right, snap to the left boundary, fill the gap",
          "the rack edge (x = 0) counts as a left boundary; an open right side leaves the panel unchanged",
          "leather tiles at fixed density; screws stay centered",
        ],
        tip: "rearranged the row? double-click the blank to re-measure.",
      },
      {
        id: "placement",
        label: "placement behavior",
        type: "meter",
        x: 50.0,
        y: 80.0,
        size: 90,
        description: [
          "new instances enter at 2 HP and expand into a bounded same-row gap within a few frames",
          "panels loaded from a patch restore saved width and never auto-fit",
          "only same-row neighbors count",
        ],
        tip: "drop it in the hole first, add modules beside it, double-click to size.",
      },
    ],
    contextMenu: [
      {
        id: "fit-gap",
        group: "sizing",
        label: "fit to surrounding gap",
        kind: "toggle",
        description: "Same measurement as new-panel placement: nearest modules left and right, whole-HP rounding, 64 HP cap."
      }
    ],
    manual: [
      {
        title: "resizing",
        body: "Drag either edge: right moves the right boundary, left the left. Whole-HP rounding, 2–64. Overlapping sizes revert, Rack keeps collision checking."
      },
      {
        title: "auto-fit",
        body: "Double-click or choose Fit to surrounding gap: nearest module each side, snap left, fill the gap. Rack edge counts left; open right side leaves width unchanged."
      },
      {
        title: "recall and appearance",
        body: "Fresh panels start 2 HP and auto-fit once; restored panels keep saved width. Leather tiles at fixed density; screws stay centered."
      }
    ]
  },
  {
    slug: "incantation",
    name: "incantation",
    subtitle: "eight-band resonant filter array with a 24-pattern animation sequencer, envelope morphing, and analog-modeled drive",
    summary: "Eight resonant bands, each gated by its own envelope and sequenced by selectable rhythmic patterns. A dynamic resonator rather than a static equalizer, it gives any source motion and vocalic character, and folds a mono input into a bouncing stereo field.",
    category: "vcv rack module",
    status: "resonant filter array",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Layers,
    hp: 20,
    panelImage: {
      src: "/modules/incantation/panel-v5.webp",
      width: 1500,
      height: 1900,
      alt: "incantation vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "drive",
        label: "drive",
        type: "knob",
        x: 11.7,
        y: 12.5,
        size: 12,
        description: [
          "input gain before the array plus saturation after it, past center adds harmonics and compression without smearing bands",
          "0–200%, center is unity",
        ],
        tip: "center to start; past noon with High Q sounds like a circuit.",
      },
      {
        id: "bank",
        label: "bank",
        type: "switch",
        x: 30.9,
        y: 16.0,
        size: 8,
        description: "pattern bank A or B, 12 patterns each. Pattern 1 in both is static. Never overrides sweep mode.",
        tip: "flip banks mid-phrase for a different rhythm at the same rate.",
        diagrams: [
          { id: "bank-a", label: "bank a", icon: "Circle", state: "down" },
          { id: "bank-b", label: "bank b", icon: "Grid3x3", state: "up" },
        ],
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 50.0,
        y: 12.5,
        size: 12,
        description: "dry/wet blend. The wet path carries makeup gain so gated bands stand level with bypass.",
        tip: "start at 100% to hear the array, back off for parallel vowels.",
      },
      {
        id: "tap",
        label: "tap tempo",
        type: "switch",
        x: 69.1,
        y: 16.0,
        size: 9,
        description: "tap twice+ to set tempo; lamp blinks the rate. Stays until Rate moves or Rate CV arrives. Clear in the context menu.",
        tip: "tap with the track, then leave Rate alone.",
      },
      {
        id: "output",
        label: "output",
        type: "knob",
        x: 88.3,
        y: 12.5,
        size: 12,
        description: "final makeup gain, 0–200%. Output limiting prevents harsh clipping under extreme Drive and High Q.",
        tip: "trim here for the same color at lower level.",
      },
      {
        id: "rate",
        label: "rate",
        type: "knob",
        x: 11.7,
        y: 28.8,
        size: 12,
        description: [
          "animation speed 0.08–4.0 Hz; each revolution advances eight steps",
          "in Internal LFO mode the sweep speed follows too",
        ],
        tip: "below 0.3 Hz reads as slow vowels; above 2 Hz becomes tremolo.",
      },
      {
        id: "freq",
        label: "freq voicing",
        type: "switch",
        x: 30.9,
        y: 30.7,
        size: 8,
        description: [
          "mids: eight bandpass, 200 Hz–3.4 kHz, guitars, synths, articulation",
          "bass: band 1 a 110 Hz lowpass guarding the fundamental, bands 2–8 to 1.8 kHz, bass and drums",
        ],
        tip: "BASS with a drum loop keeps the kick while the top bounces.",
        diagrams: [
          { id: "freq-bass", label: "bass", icon: "ChevronsDown", state: "down" },
          { id: "freq-mids", label: "mids", icon: "Waves", state: "up" },
        ],
      },
      {
        id: "pattern",
        label: "pattern",
        type: "knob",
        x: 50.0,
        y: 28.8,
        size: 12,
        description: "12-position switch for patterns in the active bank. Position 1 is static, a fixed bank or eight externally sequenced bands.",
        tip: "external sequencing: pattern 1, sliders at zero, gates into the FILTER CV inputs.",
        diagrams: [
          { id: "pat-1", label: "1 · static", icon: "Minus", rotation: -135 },
          { id: "pat-mid", label: "2–11 · animated", icon: "Activity", rotation: 0 },
          { id: "pat-12", label: "12", icon: "Grid3x3", rotation: 135 },
        ],
      },
      {
        id: "lfo-switch",
        label: "sweep mode",
        type: "switch",
        x: 69.1,
        y: 30.7,
        size: 8,
        description: [
          "internal lfo: a sine sweeps all bands together, phaser-like; speed follows Rate, LFO/SWEEP CV trims it",
          "external sweep: internal oscillator stops; CV at the jack shifts the bank directly, unpatched means no sweep",
        ],
        tip: "external sweep with an envelope opens a vowel on every hit.",
        diagrams: [
          { id: "sweep-ext", label: "external sweep", icon: "ArrowRight", state: "down" },
          { id: "sweep-int", label: "internal lfo", icon: "Waves", state: "up" },
        ],
      },
      {
        id: "envelope",
        label: "envelope",
        type: "knob",
        x: 88.3,
        y: 28.8,
        size: 12,
        description: [
          "0–4: sharp attack, choppy decay",
          "5: attack equals decay, tremolo crossfades",
          "6–10: slow swell, abrupt decay, like reversed audio",
        ],
        tip: "7 for backwards pads; 2 when the pattern should read as rhythm.",
        diagrams: [
          { id: "env-choppy", label: "choppy", icon: "Zap", rotation: -135 },
          { id: "env-tremolo", label: "tremolo", icon: "Waves", rotation: 0 },
          { id: "env-swell", label: "reverse swell", icon: "ChevronUp", rotation: 135 },
        ],
      },
      { id: "fader-1", label: "filter 1", type: "knob", x: 9.8, y: 54.9, size: 7, description: "maximum level of band 1, the lowest, a 110 Hz lowpass in BASS. Caps glow with band activity.", tip: "the context menu sets all sliders to 0%, 50%, 100%, or random in one move." },
      { id: "fader-2", label: "filter 2", type: "knob", x: 21.3, y: 54.9, size: 7, description: "maximum level of band 2. Even bands pan right in mono-to-stereo operation.", tip: "pull the even bands down for a lopsided image." },
      { id: "fader-3", label: "filter 3", type: "knob", x: 32.8, y: 54.9, size: 7, description: "maximum level of band 3 (odd, left in mono-to-stereo).", tip: "odd bands high, even bands low: the animation leans left." },
      { id: "fader-4", label: "filter 4", type: "knob", x: 44.3, y: 54.9, size: 7, description: "maximum level of band 4.", tip: "the middle bands carry most of the vowel." },
      { id: "fader-5", label: "filter 5", type: "knob", x: 55.7, y: 54.9, size: 7, description: "maximum level of band 5.", tip: "a single band at full with the rest at zero is a resonant ping under any pattern." },
      { id: "fader-6", label: "filter 6", type: "knob", x: 67.2, y: 54.9, size: 7, description: "maximum level of band 6.", tip: "High Q narrows every band, revisit the sliders after switching it on." },
      { id: "fader-7", label: "filter 7", type: "knob", x: 78.7, y: 54.9, size: 7, description: "maximum level of band 7.", tip: "the upper bands are where MIDS voicing gets its sibilance." },
      { id: "fader-8", label: "filter 8", type: "knob", x: 90.2, y: 54.9, size: 7, description: "maximum level of band 8, 3.4 kHz MIDS, 1.8 kHz BASS.", tip: "roll it back on bright sources before reaching for Drive." },
      { id: "filter-cv-1", label: "filter 1 cv", type: "jack", x: 9.8, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 1, added to its slider. The context menu bypasses all eight at once.", tip: "external envelopes here replace internal patterns when Pattern is 1." },
      { id: "filter-cv-2", label: "filter 2 cv", type: "jack", x: 21.3, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 2.", tip: "a Euclidean gate per band is a rhythm no internal pattern has." },
      { id: "filter-cv-3", label: "filter 3 cv", type: "jack", x: 32.8, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 3.", tip: "negative CV pulls a band below its slider, useful for carving a hole on the beat." },
      { id: "filter-cv-4", label: "filter 4 cv", type: "jack", x: 44.3, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 4.", tip: "one LFO into two neighboring bands, one inverted, hands the vowel back and forth." },
      { id: "filter-cv-5", label: "filter 5 cv", type: "jack", x: 55.7, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 5.", tip: "sample-and-hold here scatters the resonance on every step." },
      { id: "filter-cv-6", label: "filter 6 cv", type: "jack", x: 67.2, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 6.", tip: "slow ramps across the eight inputs make a formant sweep the patterns cannot." },
      { id: "filter-cv-7", label: "filter 7 cv", type: "jack", x: 78.7, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 7.", tip: "gate the top two bands from a hi-hat pattern for articulated air." },
      { id: "filter-cv-8", label: "filter 8 cv", type: "jack", x: 90.2, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 8.", tip: "Filter CV → Bypass in the context menu silences all eight jacks without unpatching." },
      { id: "in-l", label: "audio l / mono", type: "jack", x: 9.8, y: 89.1, size: 8.5, voltageRange: "audio · poly ≤16", description: "left/mono input. Patch only this and take both outs for mono-to-stereo: odd bands left, even right, animation bouncing. Poly signals process per channel in true stereo.", tip: "the signature move: left in, both outs." },
      { id: "in-r", label: "audio r", type: "jack", x: 21.3, y: 89.1, size: 8.5, voltageRange: "audio · poly ≤16", description: "right input, patch both inputs for independent per-side processing.", tip: "with R patched, odd/even panning is off; each side runs its own array." },
      { id: "env-cv", label: "envelope cv", type: "jack", x: 32.8, y: 89.1, size: 8.5, voltageRange: "cv", description: "modulates Envelope shape, choppy through tremolo to reverse swell.", tip: "an LFO here morphs the same pattern between rhythm and swell." },
      { id: "rate-cv", label: "rate cv", type: "jack", x: 44.3, y: 89.1, size: 8.5, voltageRange: "1 V/oct", description: "1V/oct rate modulation, each volt doubles the rate, scaling the knob. ±5 V sweeps five octaves from any position. Applying CV releases tapped tempo.", tip: "a sequencer step of +1 V is exactly double-time." },
      { id: "sweep-cv", label: "lfo / sweep cv", type: "jack", x: 55.7, y: 89.1, size: 8.5, voltageRange: "cv", description: "internal mode: trims sweep-oscillator rate. External mode: shifts the whole bank directly. ~2 ms smoothing keeps audio-rate input stable.", tip: "external sweep + envelope follower on the input = a talk-box that tracks dynamics." },
      { id: "mix-cv", label: "mix cv", type: "jack", x: 67.2, y: 89.1, size: 8.5, voltageRange: "cv", description: "modulates the dry/wet blend.", tip: "gate it from the pattern's own downbeat for a wet burst per bar." },
      { id: "out-l", label: "left / mono out", type: "jack", x: 78.7, y: 89.1, size: 8.5, voltageRange: "audio · poly", description: "main left output. With right unpatched, this carries the full mono bank.", tip: "mono out on its own is a classic fixed filter bank with a sequencer." },
      { id: "out-r", label: "right out", type: "jack", x: 90.2, y: 89.1, size: 8.5, voltageRange: "audio · poly", description: "patching selects stereo topology without folding poly to mono, both outputs stay polyphonic.", tip: "patch even on mono sources: that enables the odd/even panning." },
    ],
    contextMenu: [
      {
        id: "resonance",
        group: "filter resonance",
        label: "filter resonance",
        kind: "choice",
        values: ["normal", "high q"],
        description: "High Q narrows the bands for sharper resonances, pinging and pronounced vowels."
      },
      {
        id: "filter-cv",
        group: "filter cv",
        label: "filter cv",
        kind: "choice",
        values: ["active", "bypass"],
        description: "Ignore all patched Filter CV cables without unpatching."
      },
      {
        id: "level-presets",
        group: "filter level presets",
        label: "filter level presets",
        kind: "choice",
        values: ["set all faders to 0%", "set all faders to 50%", "set all faders to 100%", "randomize filters"],
        description: "Set all eight sliders at once, or scatter them randomly."
      },
      {
        id: "clear-tap",
        group: "tap tempo",
        label: "clear tap tempo",
        kind: "toggle",
        description: "Clear the tap-tempo clock; control returns to the Rate knob."
      },
      {
        id: "screen-theme",
        group: "screen theme",
        label: "screen theme",
        kind: "choice",
        values: ["amber", "phosphor", "and the shared shapetaker themes"],
        description: "Slider-cap and rate-lamp illumination color."
      }
    ],
    manual: [
      {
        title: "the filter array",
        body: "Eight state-variable filters. MIDS: bandpass 200 Hz–3.4 kHz; BASS: band 1 a 110 Hz lowpass guarding the fundamental, rest to 1.8 kHz. Sliders set max amplitude, ±5 V CV per band. Drive gains before the array and saturates after, so harmonics arrive without smearing bands."
      },
      {
        title: "animation sequencer",
        body: "24 patterns across A/B animate band VCAs at 0.08–4 Hz, with tap tempo and 1V/oct rate CV. Pattern 1 is static. Envelope morphs gates from choppy through tremolo to reverse swells. Internal LFO sweeps all bands phaser-like; External Sweep hands that to CV."
      },
      {
        title: "stereo imaging",
        body: "Left in, both outs: odd bands left, even right, animation bouncing across the field. Right in gives true stereo with independent arrays. ≤16 polyphonic channels per side, processed separately; both outputs stay polyphonic."
      }
    ],
    suggestedPatches: [
      {
        id: "bouncing-vowels",
        title: "bouncing vowels",
        description: "A mono pad into the left input, both outputs out, and an envelope follower sweeping the bank in External Sweep mode. The pattern bounces the vowels across the field while dynamics move the formant.",
        difficulty: "beginner",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "pad",
            label: "Pad Voice",
            sublabel: "mono",
            x: 20, y: 40, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 70, icon: "saw" }
            ]
          },
          {
            id: "follower",
            label: "Envelope Follower",
            x: 20, y: 160, width: 140, height: 90,
            ports: [
              { id: "out", label: "Env", side: "right", offsetY: 70 }
            ]
          },
          {
            id: "incantation",
            label: "Incantation",
            x: 200, y: 20, width: 180, height: 240,
            settings: [
              { label: "Freq", value: "MIDS" },
              { label: "Pattern", value: "bank A · 3" },
              { label: "Sweep", value: "External" }
            ],
            ports: [
              { id: "in-l", label: "L / Mono In", side: "left", offsetY: 70 },
              { id: "sweep-cv", label: "LFO / Sweep CV", side: "left", offsetY: 190 },
              { id: "out-l", label: "L Out", side: "right", offsetY: 70 },
              { id: "out-r", label: "R Out", side: "right", offsetY: 100 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 420, y: 40, width: 140, height: 110,
            ports: [
              { id: "left-in", label: "Left In", side: "left", offsetY: 70 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 100 }
            ]
          }
        ],
        cables: [
          { id: "audio", fromNode: "pad", fromPort: "out", toNode: "incantation", toPort: "in-l", color: "#D7B56D" },
          { id: "sweep", fromNode: "follower", fromPort: "out", toNode: "incantation", toPort: "sweep-cv", color: "#a78bfa" },
          { id: "out-l", fromNode: "incantation", fromPort: "out-l", toNode: "mixer", toPort: "left-in", color: "#5ec2ab" },
          { id: "out-r", fromNode: "incantation", fromPort: "out-r", toNode: "mixer", toPort: "right-in", color: "#5ec2ab" }
        ],
        steps: [
          {
            instruction: "Patch the pad into AUDIO L / MONO only, set MIX to 100%, and raise all eight sliders.",
            detail: "Leave the right input empty, that is what enables odd-left, even-right routing. Choose MIDS and an animated pattern in bank A, then set Rate around 0.5 Hz.",
            cableIds: ["audio"]
          },
          {
            instruction: "Take both outputs to your mixer as a stereo pair.",
            detail: "Patching the right output selects the stereo topology. The animation now hands the vowels back and forth across the field.",
            cableIds: ["out-l", "out-r"]
          },
          {
            instruction: "Flip Sweep Mode to External and patch an envelope follower into LFO / SWEEP CV.",
            detail: "The internal sine stops and the follower shifts the whole bank up on loud passages and back down as the pad decays, a formant that tracks dynamics. Nudge Envelope toward 7 for swells.",
            cableIds: ["sweep"]
          }
        ]
      }
    ]
  },
  {
    slug: "torsion",
    name: "torsion",
    subtitle: "cz-inspired phase distortion oscillator, five warp shapes, dual lines with cross-mod and ring mod, a six-stage rate/level dcw envelope, sub, and bbd chorus",
    summary: "Phase distortion in the CZ tradition, expanded for the modular world. The carrier is always a pure sine; every harmonic comes from warping its phase under a six-stage envelope whose stages are true rate/level pairs. Two lines with five ratios, bidirectional sync, feedback, and a bucket-brigade chorus finish the voice.",
    category: "vcv rack module",
    status: "phase distortion osc",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Waves,
    hp: 20,
    panelImage: {
      src: "/modules/torsion/panel-v5.webp",
      width: 1500,
      height: 1900,
      alt: "torsion vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 03190",
      type: "PHASE ABBERATION",
    },
    controls: [
      { id: "coarse", label: "octave", type: "knob", x: 11.5, y: 14.8, size: 13, description: "coarse pitch in whole octaves, ±2, atop the V/OCT input.", tip: "drop an octave and raise SUB for the bass the CZ was famous for.",
        diagrams: [
          { id: "oct--2", label: "−2 oct", icon: "ChevronsDown", rotation: -135 },
          { id: "oct-0", label: "0", icon: "Minus", rotation: 0 },
          { id: "oct-+2", label: "+2 oct", icon: "ChevronsUp", rotation: 135 },
        ] },
      { id: "sub", label: "sub level", type: "knob", x: 33.1, y: 14.8, size: 13, description: "sub-oscillator level under line A, 0–200%.", tip: "a little sub anchors a resonant warp that would float." },
      { id: "symmetry", label: "symmetry", type: "knob", x: 54.7, y: 14.8, size: 13, description: "biases the distortion curve. 50% neutral; either side warps harmonics in opposite directions.", tip: "off-center symmetry on Resonant is the difference between filter sweep and vowel." },
      { id: "sync", label: "bidirectional sync", type: "switch", x: 72.4, y: 14.8, size: 9, description: [
          "off: both lines free-run",
          "a resets b: B restarts each A cycle, locked harmonics at integer ratios, repeating contours at 3:2 or with Detune",
          "b resets a: the reverse",
        ], tip: "sync plus 3:2 plus DCW envelope is the classic scream.",
        diagrams: [
          { id: "sync-off", label: "off", icon: "Minus" },
          { id: "sync-ab", label: "a resets b", icon: "ArrowRight" },
          { id: "sync-ba", label: "b resets a", icon: "RefreshCw" },
        ] },
      { id: "detune", label: "detune", type: "knob", x: 88.5, y: 14.8, size: 13, description: "up to 20 cents upward tuning on line B around its ratio.", tip: "5–8 cents at 1:1 is chorus without the chorus." },
      { id: "line-a-warp", label: "line a warp", type: "knob", x: 18.8, y: 28.2, size: 12, description: [
          "single sine: the classic phase-distortion curve",
          "resonant: resonant-filter sweep with synthetic peaks",
          "double sine: hollow, square-like",
          "saw pulse: biting, brass-like hybrid",
          "pulse: sharp narrow pulses for leads",
        ], tip: "the carrier stays pure sine, every harmonic is the warp.",
        diagrams: [
          { id: "wa-sine", label: "single sine", icon: "Waves", rotation: -135 },
          { id: "wa-res", label: "resonant", icon: "Activity", rotation: -67.5 },
          { id: "wa-dbl", label: "double sine", icon: "Repeat", rotation: 0 },
          { id: "wa-sawp", label: "saw pulse", icon: "Zap", rotation: 67.5 },
          { id: "wa-pulse", label: "pulse", icon: "Square", rotation: 135 },
        ] },
      { id: "line-b-warp", label: "line b warp", type: "knob", x: 50.0, y: 28.2, size: 12, description: "same five shapes, independent for line B.", tip: "resonant A plus pulse B with cross phase mod is a bell that bites." },
      { id: "line-b-ratio", label: "line b ratio", type: "switch", x: 72.4, y: 27.5, size: 9, description: "B relative to A: 1:2, 1:1, 3:2 (fifth), 2:1, 3:1 (octave+fifth).", tip: "3:2 with sync is where the CZ lineage lives.",
        diagrams: [
          { id: "ratio-12", label: "1:2", icon: "ChevronsDown" },
          { id: "ratio-11", label: "1:1", icon: "Minus" },
          { id: "ratio-32", label: "3:2", icon: "ChevronUp" },
          { id: "ratio-21", label: "2:1", icon: "ChevronsUp" },
          { id: "ratio-31", label: "3:1", icon: "Plus" },
        ] },
      { id: "stage-rate", label: "stage rate", type: "knob", x: 88.5, y: 30.2, size: 13, description: "master envelope speed, ×0.25–×4. Design shape with sliders; perform duration here. Its CV input gives envelope-time tracking in one cable.", tip: "key-follow shortens the envelope as pitch rises, like the hardware." },
      { id: "torsion", label: "torsion", type: "knob", x: 11.5, y: 45.9, size: 13, description: "phase-distortion depth, how far the DCW envelope warps the sine. Fixed lines still follow knob and CV; only envelope movement bypasses.", tip: "at zero you get a sine whatever the envelope does." },
      { id: "level-1", label: "stage 1 level", type: "knob", x: 25.6, y: 44.0, size: 8, description: "stage 1 target level. The envelope interpolates between stages; sliders glow with activity.", tip: "stage 1 high, 2 low, 3 high is the two-peak brass attack." },
      { id: "level-2", label: "stage 2 level", type: "knob", x: 35.4, y: 44.0, size: 8, description: "target level of stage 2.", tip: "a dip here after a high stage 1 is the CZ 'wow'." },
      { id: "level-3", label: "stage 3 level", type: "knob", x: 45.1, y: 44.0, size: 8, description: "target level of stage 3.", tip: "the default sustain stage, hold it where the body of the note should sit." },
      { id: "level-4", label: "stage 4 level", type: "knob", x: 54.9, y: 44.0, size: 8, description: "target level of stage 4.", tip: "stages between the sustain and end stage become a sculpted, multi-segment release." },
      { id: "level-5", label: "stage 5 level", type: "knob", x: 64.6, y: 44.0, size: 8, description: "target level of stage 5.", tip: "a rise here during release gives a note that blooms as it leaves." },
      { id: "level-6", label: "stage 6 level", type: "knob", x: 74.4, y: 44.0, size: 8, description: "target level of stage 6, the end stage by default.", tip: "set End stage earlier in the context menu to use fewer stages." },
      { id: "feedback", label: "feedback", type: "knob", x: 88.5, y: 45.9, size: 13, description: "output fed back into oscillator phase for tearing overtones. Source (clean oscillators or final output) in the context menu.", tip: "if aliasing shows, raise Oversampling before taming the knob." },
      { id: "torsion-atten", label: "torsion cv attenuverter", type: "knob", x: 11.5, y: 59.7, size: 10, description: "bipolar scaling for TORSION CV.", tip: "negative amounts from an envelope make the note clean up as it opens." },
      { id: "feedback-atten", label: "feedback cv attenuverter", type: "knob", x: 88.5, y: 59.7, size: 10, description: "bipolar scaling for FEEDBACK CV.", tip: "velocity to feedback is the cheapest way to make hard notes tear." },
      { id: "torsion-cv", label: "torsion cv", type: "jack", x: 11.5, y: 69.8, size: 9, voltageRange: "cv", description: "modulates distortion depth through its attenuverter, atop knob and envelope.", tip: "an LFO here under a slow envelope wobbles inside the contour." },
      { id: "rate-1", label: "stage 1 rate", type: "knob", x: 25.6, y: 70.5, size: 8, description: "stage 1 speed, ×0.125 at bottom through ×1 center to ×8 top. True rate/level pairs, as on hardware.", tip: "fast stage 1 into slow stage 2 is pluck-then-bloom." },
      { id: "rate-2", label: "stage 2 rate", type: "knob", x: 35.4, y: 70.5, size: 8, description: "speed of stage 2.", tip: "slow it right down for the swell after the attack." },
      { id: "rate-3", label: "stage 3 rate", type: "knob", x: 45.1, y: 70.5, size: 8, description: "speed of stage 3.", tip: "with Loop on, the rates from stage 1 to the sustain stage set the cycle's rhythm." },
      { id: "rate-4", label: "stage 4 rate", type: "knob", x: 54.9, y: 70.5, size: 8, description: "speed of stage 4.", tip: "a stuttering fall: alternate fast and slow rates through the release stages." },
      { id: "rate-5", label: "stage 5 rate", type: "knob", x: 64.6, y: 70.5, size: 8, description: "speed of stage 5.", tip: "rates below center lengthen the tail without touching STAGE RATE." },
      { id: "rate-6", label: "stage 6 rate", type: "knob", x: 74.4, y: 70.5, size: 8, description: "speed of stage 6.", tip: "very fast final stages can click, the click suppressor helps, but sharp warps still snap." },
      { id: "osc-interaction", label: "oscillator interaction", type: "switch", x: 11.5, y: 78.6, size: 9, description: [
          "independent: A and B run autonomously, mix at output",
          "cross phase mod: mutual phase modulation, bell-like or chaotic",
          "b dcw follows a: A's output modulates B's depth",
          "ring mod: the lines multiply, metallic sums and differences",
        ], tip: "cross phase mod with heavy feedback wants 8× oversampling.",
        diagrams: [
          { id: "int-ind", label: "independent", icon: "Minus" },
          { id: "int-xpm", label: "cross phase mod", icon: "Shuffle" },
          { id: "int-dcw", label: "b dcw follows a", icon: "ArrowRight" },
          { id: "int-ring", label: "ring mod", icon: "Circle" },
        ] },
      { id: "feedback-cv", label: "feedback cv", type: "jack", x: 88.5, y: 69.8, size: 9, voltageRange: "cv", description: "modulates feedback through its attenuverter.", tip: "gate from EDGE for feedback that tears only during the attack." },
      { id: "chorus", label: "chorus", type: "switch", x: 88.5, y: 78.6, size: 9, description: "bucket-brigade style chorus, widening MAIN L/R with movement.", tip: "off for bass, on for everything the CZ did with chorus.",
        diagrams: [
          { id: "chorus-off", label: "off", icon: "Minus", state: "down" },
          { id: "chorus-on", label: "on", icon: "Waves", state: "up" },
        ] },
      { id: "voct", label: "v/oct", type: "jack", x: 10.9, y: 89.1, size: 9, voltageRange: "1 V/oct", description: "pitch tracking for both lines and sub.", tip: "key follow also scales DCW depth and envelope time from this pitch." },
      { id: "gate", label: "gate", type: "jack", x: 24.4, y: 89.1, size: 9, voltageRange: "gate", description: "drives the DCW envelope: advances to sustain while high, holds, walks sustain-to-end on release. With Loop on, cycles stage 1 to sustain while held.", tip: "sustain = end is classic hold-and-release; sustain before end is multi-segment release." },
      { id: "stage-trig", label: "stage trig", type: "jack", x: 37.2, y: 89.1, size: 9, voltageRange: "trigger", description: "with no Gate, fires the envelope one-shot. With Gate, a trigger while high restarts it; Gate keeps sustain/release.", tip: "trigger with nothing at Gate and Loop on is a free-running shape LFO." },
      { id: "stage-rate-cv", label: "stage rate cv", type: "jack", x: 50.0, y: 89.1, size: 9, voltageRange: "cv", description: "modulates overall envelope speed.", tip: "velocity here: hard notes faster, soft notes slower." },
      { id: "main-l", label: "main l", type: "jack", x: 62.8, y: 89.1, size: 9, voltageRange: "audio", description: "left audio output. Chorus on gives wide stereo; off, both sides identical.", tip: "use alone for mono bass." },
      { id: "main-r", label: "main r", type: "jack", x: 75.7, y: 89.1, size: 9, voltageRange: "audio", description: "right audio output.", tip: "the chorus's stereo offset lives between these two jacks." },
      { id: "edge", label: "edge", type: "jack", x: 88.5, y: 89.1, size: 9, voltageRange: "0–10 V", description: "the DCW envelope as 0–10 V for external modulation.", tip: "send to a filter so the outside follows the same six stages." },
    ],
    contextMenu: [
      { id: "sustain-stage", group: "envelope", label: "sustain stage", kind: "choice", values: ["stage 1", "stage 2", "stage 3", "stage 4", "stage 5", "stage 6"], description: "The stage a held gate parks on; stages after it become the release path." },
      { id: "end-stage", group: "envelope", label: "end stage", kind: "choice", values: ["stage 1", "stage 2", "stage 3", "stage 4", "stage 5", "stage 6"], description: "Where the sequence finishes. Set early for fewer stages; equal to sustain for classic hold-and-release." },
      { id: "loop", group: "envelope", label: "loop", kind: "toggle", description: "Gate loops stage 1 to sustain while held. Nothing at Gate/Trig cycles the full sequence as a shape LFO." },
      { id: "dcw-relationship", group: "phase distortion", label: "dcw relationship", kind: "choice", values: ["parallel, both follow envelope", "opposed, b follows inverted envelope", "a envelope / b fixed", "a fixed / b envelope"], description: "How the contour splits across lines. Fixed lines still follow knob, CV, key follow, velocity, only envelope movement bypasses." },
      { id: "key-follow", group: "phase distortion", label: "key follow (depth + envelope time)", kind: "toggle", description: "Pitch scales depth and envelope time, as hardware, higher notes brighter and shorter." },
      { id: "velocity", group: "phase distortion", label: "velocity sensitivity (depth)", kind: "toggle", description: "Gate level scales distortion depth." },
      { id: "oversampling", group: "engine", label: "oversampling", kind: "choice", values: ["1x", "2x", "4x", "8x"], description: "New modules default 4×. Raise when feedback or cross phase mod aliases." },
      { id: "feedback-source", group: "engine", label: "feedback source", kind: "choice", values: ["classic (output)", "clean (oscillators)"], description: "Feedback from the final output (Classic, default) or the clean pre-chorus oscillators." },
      { id: "phase-reset", group: "engine", label: "reset oscillator phases on gate/trig", kind: "toggle", description: "Off: oscillators run while envelopes idle. On: every attack starts from the same phase." },
      { id: "vintage", group: "engine", label: "vintage drift/noise/bleed", kind: "toggle", description: "On: gentle drift plus faint hiss and clock-bleed while idle. Off: digital silence." },
      { id: "theme", group: "theme", label: "slider light theme", kind: "choice", values: ["global shapetaker theme", "local color"], description: "Illuminated slider color. Presets leave it alone." }
    ],
    manual: [
      {
        title: "phase distortion engine",
        body: "DCW warps the phase of a pure sine under TORSION; every harmonic is the warp itself. Five shapes per line, single sine, resonant, double sine, saw pulse, pulse, with SYMMETRY biasing the curve. DCW Relationship splits the envelope across lines, opposes it, or fixes one line at current depth."
      },
      {
        title: "six-stage dcw envelope",
        body: "Six level sliders set targets, six rate sliders set speeds ×0.125–×8, STAGE RATE scales all. Gate holds at sustain and walks to end on release; Stage Trig one-shots; Loop cycles. The envelope appears at EDGE and on the illuminated sliders."
      },
      {
        title: "lines, sync, character",
        body: "Line B at 1:2–3:1 to A with ≤20 cents Detune; either line can reset the other. Interaction: independent, cross phase mod, B-follows-A, or ring mod. Sub oscillator, switchable feedback source, vintage drift/noise, bucket-brigade chorus. 25 factory presets: keys, pads, bass, leads, bells."
      }
    ],
    suggestedPatches: [
      {
        id: "cz-brass",
        title: "synth brass, cz style",
        description: "Resonant warp on A, a fifth above on B with sync, and a two-peak envelope from the stage sliders. Velocity into TORSION CV makes hard notes brighter.",
        difficulty: "beginner",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "keys",
            label: "Keyboard",
            sublabel: "or sequencer",
            x: 20, y: 40, width: 140, height: 120,
            ports: [
              { id: "voct", label: "V/Oct", side: "right", offsetY: 62 },
              { id: "gate", label: "Gate", side: "right", offsetY: 92, icon: "square" }
            ]
          },
          {
            id: "torsion",
            label: "Torsion",
            x: 200, y: 20, width: 180, height: 240,
            settings: [
              { label: "Warp A / B", value: "Resonant / Saw Pulse" },
              { label: "B ratio · sync", value: "3:2 · A resets B" },
              { label: "Chorus", value: "on" }
            ],
            ports: [
              { id: "voct", label: "V/Oct", side: "left", offsetY: 62 },
              { id: "gate", label: "Gate", side: "left", offsetY: 92 },
              { id: "main-l", label: "Main L", side: "right", offsetY: 62 },
              { id: "main-r", label: "Main R", side: "right", offsetY: 92 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 420, y: 40, width: 140, height: 110,
            ports: [
              { id: "left-in", label: "Left In", side: "left", offsetY: 62 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 92 }
            ]
          }
        ],
        cables: [
          { id: "pitch", fromNode: "keys", fromPort: "voct", toNode: "torsion", toPort: "voct", color: "#5ec2ab" },
          { id: "gate", fromNode: "keys", fromPort: "gate", toNode: "torsion", toPort: "gate", color: "#a78bfa" },
          { id: "out-l", fromNode: "torsion", fromPort: "main-l", toNode: "mixer", toPort: "left-in", color: "#D7B56D" },
          { id: "out-r", fromNode: "torsion", fromPort: "main-r", toNode: "mixer", toPort: "right-in", color: "#D7B56D" }
        ],
        steps: [
          {
            instruction: "Patch V/Oct and Gate, set LINE A WARP to Resonant and LINE B WARP to Saw Pulse.",
            detail: "Set the ratio toggle to 3:2 and Sync to A resets B. Raise TORSION to about 60% and SUB LEVEL to a quarter.",
            cableIds: ["pitch", "gate"]
          },
          {
            instruction: "Shape the envelope: stage 1 high, stage 2 low, stage 3 medium, stages 4–6 falling to zero.",
            detail: "Give stage 1 a fast rate and stage 2 a slow one for the two-peak brass wow. Leave sustain at stage 3 and end at stage 6 so the release walks three stages down.",
            cableIds: []
          },
          {
            instruction: "Switch CHORUS on and take MAIN L and R to your mixer.",
            detail: "The bucket-brigade chorus spreads the pair. Enable Key follow in the context menu so upper notes get shorter and brighter, as on the hardware.",
            cableIds: ["out-l", "out-r"]
          }
        ]
      }
    ]
  },
  {
    slug: "reverie",
    name: "reverie",
    subtitle: "dattorro plate reverb wrapped in five character modes, field blur, afterimage, reverse, lo-fi, and modulated",
    summary: "A finely tuned plate tank surrounded by five pre- and post-processors: shoegaze chorus and shimmer, ghostly spectral resonance with sub-octave shadows, reverse granular swells, degraded wow-and-flutter texture, and deep classic modulation. One small blend knob fades the chosen mode in without disturbing the plate.",
    category: "vcv rack module",
    status: "multi-mode reverb",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Sparkles,
    hp: 16,
    panelImage: {
      src: "/modules/reverie/panel-v5.webp",
      width: 1200,
      height: 1900,
      alt: "reverie vcv rack module panel"
    },
    media: {},
    controls: [
      { id: "mode-led", label: "mode jewel", type: "meter", x: 50.0, y: 12.2, size: 9, description: "jewel color follows the mode: teal Field Blur, purple Afterimage, amber Reverse, blue Lo-Fi, cyan Modulated.", tip: "the screens below name the two parameters for whatever color is lit." },
      { id: "decay", label: "decay", type: "knob", x: 20.8, y: 15.3, size: 23, description: "regeneration in the polyphonic Dattorro tank, short room to near-infinite. An output limiter keeps extremes from clipping.", tip: "start at 50%, long enough to hear the modes, short enough to hear the source." },
      { id: "mix", label: "mix", type: "knob", x: 79.2, y: 15.3, size: 23, description: "dry/wet balance. The dry path is uncolored below the limiter's knee, safe as an insert.", tip: "Rack bypass passes dry audio rather than muting." },
      { id: "tone", label: "tone", type: "knob", x: 50.0, y: 27.5, size: 16, description: "tank damping. Counter-clockwise absorbs highs for dark decay; clockwise opens a brilliant tail.", tip: "dark tone with long decay sits behind a mix instead of on top." },
      { id: "param-1", label: "param 1", type: "knob", x: 20.8, y: 38.7, size: 16, description: [
          "field blur · chor: stereo chorus depth and thickness on the tail",
          "afterimage · rate: in-tank modulation, a wandering, unstable image",
          "reverse · size: grain-buffer window ahead of the tank",
          "lo-fi · degd: sample crush, saturation, lowpass 18 kHz → 1.5 kHz",
          "modulated · dpth: internal tank modulation depth",
        ], tip: "the left LCD names this for the current mode; so does the context menu." },
      { id: "param-2", label: "param 2", type: "knob", x: 79.2, y: 38.7, size: 16, description: [
          "field blur · shmr: regenerative octave-up shimmer fed back into the tank",
          "afterimage · diff: spectral intensity, resonant bandpass plus octave-down shadow",
          "reverse · fdbk: plate output back into the reverse buffer, self-oscillating at max",
          "lo-fi · wow: wow and flutter like warped media",
          "modulated · tune: asymmetric post-tank chorus rates for width",
        ], tip: "SHMR past halfway with long decay is the cascading harmonic wash." },
      { id: "mode", label: "mode", type: "knob", x: 50.0, y: 44.6, size: 16, description: [
          "field blur: soft focus, stereo chorus plus regenerative shimmer",
          "afterimage: spectral resonance with sub-octave shadows",
          "reverse: reverse granular buffer ahead of the tank",
          "lo-fi: mechanical failure, crush, saturation, lowpass, wow/flutter",
          "modulated: classic deeply modulated hall/plate",
        ], tip: "mode switches instantly; ride EFFECT BLEND to fade one in instead.",
        diagrams: [
          { id: "mode-blur", label: "field blur", icon: "Waves", rotation: -135 },
          { id: "mode-after", label: "afterimage", icon: "Circle", rotation: -67.5 },
          { id: "mode-rev", label: "reverse", icon: "RefreshCw", rotation: 0 },
          { id: "mode-lofi", label: "lo-fi", icon: "Grid3x3", rotation: 67.5 },
          { id: "mode-mod", label: "modulated", icon: "Activity", rotation: 135 },
        ] },
      { id: "lcd-1", label: "param 1 screen", type: "meter", x: 30.7, y: 53.4, size: 12, description: "names the mode's first parameter (CHOR, RATE, SIZE, DEGD, DPTH) and its value.", tip: "glance here when you switch modes." },
      { id: "lcd-2", label: "param 2 screen", type: "meter", x: 69.3, y: 53.4, size: 12, description: "names the second parameter (SHMR, DIFF, FDBK, WOW, TUNE).", tip: "both screens follow the shared display theme." },
      { id: "param-1-atten", label: "param 1 cv attenuverter", type: "knob", x: 12.4, y: 57.3, size: 11, description: "attenuverter scaling and inverting PARAM 1 CV.", tip: "a small negative envelope amount cleans the mode on each attack." },
      { id: "blend", label: "effect blend", type: "knob", x: 50.0, y: 62.1, size: 12, description: [
          "master scale for the mode's parameters. Fully counter-clockwise zeroes them for a pristine plate",
          "clockwise reintroduces PARAM 1/2 settings, fading textures without losing their relationship",
        ], tip: "dial the mode in, then perform it with this one knob." },
      { id: "param-2-atten", label: "param 2 cv attenuverter", type: "knob", x: 87.6, y: 57.3, size: 11, description: "attenuverter for PARAM 2 CV.", tip: "in Reverse keep it modest, FDBK self-oscillates at the top." },
      { id: "decay-atten", label: "decay cv attenuverter", type: "knob", x: 30.7, y: 67.6, size: 11, description: "attenuverter for DECAY CV.", tip: "an inverted envelope shortens the tail on hits and blooms it between." },
      { id: "mix-atten", label: "mix cv attenuverter", type: "knob", x: 69.3, y: 67.6, size: 11, description: "attenuverter for MIX CV.", tip: "gate the mix for reverb only on held notes." },
      { id: "param-1-cv", label: "param 1 cv", type: "jack", x: 12.4, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates PARAM 1 through its attenuverter. One-pole smoothing on all params makes audio-rate CV safe.", tip: "in Lo-Fi a slow ramp here is a tape machine dying over eight bars." },
      { id: "decay-cv", label: "decay cv", type: "jack", x: 30.7, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates DECAY through its attenuverter.", tip: "sample-and-hold here gives every phrase a different room." },
      { id: "mix-cv", label: "mix cv", type: "jack", x: 69.3, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates MIX through its attenuverter.", tip: "inverted envelope follower: reverb ducks under the source, swells in gaps." },
      { id: "param-2-cv", label: "param 2 cv", type: "jack", x: 87.6, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates PARAM 2 through its attenuverter.", tip: "an LFO on SHMR in Field Blur breathes shimmer in and out." },
      { id: "delta-lens", label: "delta indicators", type: "meter", x: 50.0, y: 83.7, size: 20, description: [
          "left triangle: input level",
          "right triangle: output level",
          "top triangle: mode effect energy",
          "center: wet level and phase, pulsing stepped in Lo-Fi, sweeping in Reverse",
        ], tip: "center lit with no input means Reverse FDBK or Afterimage is self-sustaining." },
      { id: "in-l", label: "audio in l", type: "jack", x: 9.9, y: 88.4, size: 10.5, voltageRange: "audio · poly ≤16", description: "left audio input, normalled to right for mono-to-stereo. Polyphonic to 16, tank and modes instanced per voice.", tip: "a polyphonic chord here gets sixteen plates, not one." },
      { id: "in-r", label: "audio in r", type: "jack", x: 24.5, y: 88.4, size: 10.5, voltageRange: "audio · poly ≤16", description: "right audio input for true stereo sources.", tip: "leave empty for mono, normalization does the work." },
      { id: "out-l", label: "audio out l", type: "jack", x: 75.5, y: 88.4, size: 10.5, voltageRange: "audio · poly", description: "left output through a soft-knee limiter: linear below the knee, tanh above to catch resonant peaks.", tip: "nominal ±5 V dry passes bit-transparent." },
      { id: "out-r", label: "audio out r", type: "jack", x: 90.1, y: 88.4, size: 10.5, voltageRange: "audio · poly", description: "right output.", tip: "Modulated TUNE is the only left/right detune, check width here." },
    ],
    contextMenu: [
      {
        id: "current-params",
        group: "current mode parameters",
        label: "current mode parameters",
        kind: "choice",
        values: ["param 1: full name", "param 2: full name"],
        description: "Full names of the active mode's two parameters, what the dot-matrix screens abbreviate."
      }
    ],
    manual: [
      {
        title: "the tank",
        body: "A polyphonic Dattorro plate, instanced per voice to 16. DECAY runs room bursts to near-infinite; TONE damps dark or opens brilliant. Params smoothed against zipper noise, wet path DC-blocked, output limiter linear until needed."
      },
      {
        title: "five modes",
        body: "The blade selects character, the jewel shows it: Field Blur (chorus plus octave-up shimmer), Afterimage (in-tank modulation, resonant bandpass, octave-down shadow), Reverse (granular buffer ahead of the tank with plate feedback), Lo-Fi (crush, saturation, sweeping lowpass, wow/flutter), Modulated (deep internal modulation plus asymmetric post-tank chorus). The screens name PARAM 1/2 per mode."
      },
      {
        title: "effect blend and cv",
        body: "One knob scales both mode parameters: counter-clockwise is a pristine plate, clockwise fades the dialed texture back in. DECAY, MIX, and both Params take CV through attenuverters. Four delta indicators show input, output, mode energy, and wet level/phase."
      }
    ],
    suggestedPatches: [
      {
        id: "breathing-shimmer",
        title: "breathing shimmer",
        description: "Field Blur with the shimmer under a slow LFO and the whole mode faded in and out with EFFECT BLEND. A pad becomes a wash that inhales octave-up harmonics and exhales a plain plate.",
        difficulty: "beginner",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "pad",
            label: "Pad Voice",
            x: 20, y: 40, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 70 }
            ]
          },
          {
            id: "lfo",
            label: "LFO",
            sublabel: "0.08 Hz sine",
            x: 20, y: 160, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 70, icon: "sine" }
            ]
          },
          {
            id: "reverie",
            label: "Reverie",
            x: 200, y: 20, width: 180, height: 240,
            settings: [
              { label: "Mode", value: "Field Blur" },
              { label: "Decay / Tone", value: "65% / 55%" },
              { label: "Param 2 (SHMR)", value: "60%" }
            ],
            ports: [
              { id: "in-l", label: "In L", side: "left", offsetY: 70 },
              { id: "p2-cv", label: "Param 2 CV", side: "left", offsetY: 190 },
              { id: "out-l", label: "Out L", side: "right", offsetY: 70 },
              { id: "out-r", label: "Out R", side: "right", offsetY: 100 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 420, y: 40, width: 140, height: 110,
            ports: [
              { id: "left-in", label: "Left In", side: "left", offsetY: 70 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 100 }
            ]
          }
        ],
        cables: [
          { id: "audio", fromNode: "pad", fromPort: "out", toNode: "reverie", toPort: "in-l", color: "#D7B56D" },
          { id: "lfo", fromNode: "lfo", fromPort: "out", toNode: "reverie", toPort: "p2-cv", color: "#a78bfa" },
          { id: "out-l", fromNode: "reverie", fromPort: "out-l", toNode: "mixer", toPort: "left-in", color: "#68B7C8" },
          { id: "out-r", fromNode: "reverie", fromPort: "out-r", toNode: "mixer", toPort: "right-in", color: "#68B7C8" }
        ],
        steps: [
          {
            instruction: "Patch the pad into IN L only, select Field Blur, and set DECAY to 65%, TONE to 55%, MIX to 50%.",
            detail: "The left input is normalled to the right, so a mono pad becomes a stereo plate. The jewel turns teal and the screens read CHOR and SHMR.",
            cableIds: ["audio"]
          },
          {
            instruction: "Set PARAM 2 (SHMR) to about 60% and patch a very slow LFO into PARAM 2 CV.",
            detail: "Turn the attenuverter to about half. The octave-up regeneration now rises and falls over twelve seconds or so, the tail inhales harmonics and lets them go.",
            cableIds: ["lfo"]
          },
          {
            instruction: "Take the outputs, then ride EFFECT BLEND by hand.",
            detail: "Fully counter-clockwise is the bare plate; clockwise brings the chorus and shimmer back in at the settings you dialed. One knob performs the whole mode.",
            cableIds: ["out-l", "out-r"]
          }
        ]
      }
    ]
  },
  {
    slug: "tessellation",
    name: "tessellation",
    subtitle: "three stereo delay lines with golden-ratio subdivisions, vintage voicing modes, and a circulating cross-feedback network",
    summary: "A rhythmic polytap delay where line 1 is the master timebase and lines 2 and 3 follow in musical, or irrational golden-ratio, subdivisions. Three voicings per line, a global modulation LFO, kill switches that keep recording while muted, and X-FEED to turn the whole module into one circulating wash.",
    category: "vcv rack module",
    status: "triple delay",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Layers,
    hp: 26,
    panelImage: {
      src: "/modules/tessellation/panel-v5.webp",
      width: 1950,
      height: 1900,
      alt: "tessellation vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 06667",
      type: "TRIPLE DELAY",
    },
    controls: [
      { id: "time-1", label: "time 1", type: "knob", x: 11.9, y: 15.6, size: 11, description: "master timebase, 20 ms–1.6 s. Knob, TAP TEMPO, or EXT CLK IN.", tip: "everything else measures against this knob." },
      { id: "voice-1", label: "voice 1", type: "switch", x: 24.6, y: 15.6, size: 6.5, description: [
          "24/96 (up): pristine full-bandwidth digital",
          "adm (center): delta-modulation compander grit, soft drive, compressed, saturated",
          "12-bit (down): SDD-style converters with pre-emphasis, dither, stepped conversion, DAC filter",
        ], tip: "factory ships line 1 clean, 2 ADM, 3 12-bit, three eras stacked.",
        diagrams: [
          { id: "v1-2496", label: "24/96", icon: "Minus" },
          { id: "v1-adm", label: "adm", icon: "Activity" },
          { id: "v1-12", label: "12-bit", icon: "Grid3x3" },
        ] },
      { id: "mix-1", label: "mix 1", type: "knob", x: 37.3, y: 15.6, size: 9.5, description: "line 1's wet/dry balance. The jewel by the kill row shows output level.", tip: "mix is per line, quiet line 3 under loud line 1 is a rhythm, not a wash." },
      { id: "repeats-1", label: "repeats 1", type: "knob", x: 54.5, y: 15.6, size: 9.5, description: "line-1 feedback. High settings approach unity; bright TONE can exceed it into the soft limiters.", tip: "REPEATS CV moves all three lines at once." },
      { id: "tone-1", label: "tone 1", type: "knob", x: 71.7, y: 15.6, size: 9.5, description: "tilt filter inside line 1's loop. Center flat, CCW darkens, CW boosts highs, in-loop boost pushes past unity into saturated wash. 18 Hz rumble filter keeps DC out when self-oscillating.", tip: "dark on 1, bright on 3: repeats age in different directions." },
      { id: "tap", label: "tap tempo", type: "switch", x: 83.9, y: 15.6, size: 7, description: "momentary tap for line-1 master tempo. Lamp blinks master phase, also monitors external clock.", tip: "tap the downbeats; subdivided lines follow." },
      { id: "ext-clk", label: "ext clk in", type: "jack", x: 92.7, y: 15.6, size: 6.5, voltageRange: "clock", description: "overrides line-1 timebase with external clock; lines 2/3 keep their subdivisions.", tip: "clock from your sequencer and golden ratios lock to the song." },
      { id: "time-2", label: "time 2", type: "knob", x: 11.9, y: 35.0, size: 11, description: "line-2 time. Free: plain 20 ms–1.6 s. Subdivided: 0.5×–2× trim on the factor. Golden: sweeps φ⁻², φ⁻¹, unity, φ, φ².", tip: "in Golden, park between detents for repeats that never land." },
      { id: "voice-2", label: "voice 2", type: "switch", x: 24.6, y: 35.0, size: 6.5, description: "24/96, ADM, or 12-bit for line 2.", tip: "different voices per line before raising X-FEED, circulation picks up all three.",
        diagrams: [
          { id: "v2-2496", label: "24/96", icon: "Minus" },
          { id: "v2-adm", label: "adm", icon: "Activity" },
          { id: "v2-12", label: "12-bit", icon: "Grid3x3" },
        ] },
      { id: "mix-2", label: "mix 2", type: "knob", x: 37.3, y: 35.0, size: 9.5, description: "wet/dry for line 2.", tip: "as X-FEED rises, less dry enters lines 2/3, MIX 2 becomes circulation level." },
      { id: "repeats-2", label: "repeats 2", type: "knob", x: 54.5, y: 35.0, size: 9.5, description: "feedback for line 2.", tip: "keep below line 1's on short subdivisions, or fast taps swamp the pulse." },
      { id: "tone-2", label: "tone 2", type: "knob", x: 71.7, y: 35.0, size: 9.5, description: "tilt filter in line 2's loop.", tip: "ADM plus slightly bright tone is the early-digital-delay sound." },
      { id: "subdiv-2", label: "subdivision 2", type: "knob", x: 89.0, y: 35.0, size: 9.5, description: [
          "triplet, eighth, golden, dotted 8th, dotted quarter, free",
          "golden locks to powers of φ, irrational ratios that resist metallic combing",
          "free unlinks from line 1 entirely",
        ], tip: "golden on both lines plus X-FEED is the golden wash.",
        diagrams: [
          { id: "sd2-trip", label: "triplet", icon: "ChevronsDown", rotation: -135 },
          { id: "sd2-8", label: "eighth", icon: "ChevronDown", rotation: -81 },
          { id: "sd2-gold", label: "golden", icon: "Spline", rotation: -27 },
          { id: "sd2-d8", label: "dotted 8th", icon: "ChevronUp", rotation: 27 },
          { id: "sd2-dq", label: "dotted quarter", icon: "ChevronsUp", rotation: 81 },
          { id: "sd2-free", label: "free", icon: "Unlink", rotation: 135 },
        ] },
      { id: "time-3", label: "time 3", type: "knob", x: 11.9, y: 54.5, size: 11, description: "line-3 time, free, or 0.5×–2× trim with line 2's golden detents.", tip: "golden short on 2, golden long on 3 brackets line 1 both sides." },
      { id: "voice-3", label: "voice 3", type: "switch", x: 24.6, y: 54.5, size: 6.5, description: "24/96, ADM, or 12-bit for line 3.", tip: "12-bit on the longest line: the oldest echo sounds oldest.",
        diagrams: [
          { id: "v3-2496", label: "24/96", icon: "Minus" },
          { id: "v3-adm", label: "adm", icon: "Activity" },
          { id: "v3-12", label: "12-bit", icon: "Grid3x3" },
        ] },
      { id: "mix-3", label: "mix 3", type: "knob", x: 37.3, y: 54.5, size: 9.5, description: "wet/dry for line 3.", tip: "the third line is the one to sneak in last." },
      { id: "repeats-3", label: "repeats 3", type: "knob", x: 54.5, y: 54.5, size: 9.5, description: "feedback for line 3.", tip: "line 3 is where runaway starts, keep a finger near KILL 3." },
      { id: "tone-3", label: "tone 3", type: "knob", x: 71.7, y: 54.5, size: 9.5, description: "tilt filter in line 3's loop.", tip: "roll dark to keep 12-bit dither from piling in circulation." },
      { id: "subdiv-3", label: "subdivision 3", type: "knob", x: 89.0, y: 54.5, size: 9.5, description: "same six positions as line 2, for line 3.", tip: "dotted quarter on 3 against triplet on 2 is a polyrhythm from one tempo." },
      { id: "kill-1", label: "kill 1", type: "switch", x: 70.4, y: 66.5, size: 7, description: "latching mute for line 1, silences output and severs cross-feedback while the buffer keeps recording; release resumes seamlessly.", tip: "the panic button when the network runs away." },
      { id: "kill-2", label: "kill 2", type: "switch", x: 80.4, y: 66.5, size: 7, description: "latching mute for line 2, buffer still recording.", tip: "chop in rhythm for gated echoes that resume where they left off." },
      { id: "kill-3", label: "kill 3", type: "switch", x: 90.5, y: 66.5, size: 7, description: "latching mute for line 3.", tip: "kill 3 and 2 and circulation collapses to one line without losing the buffers." },
      { id: "xfeed", label: "x-feed", type: "knob", x: 11.9, y: 73.9, size: 9.5, description: [
          "at zero the lines process dry in parallel",
          "rising adds circular routing 1 → 2 → 3 → 1. At max, less dry enters lines 2/3, one massive circulating network",
          "the network may run past unity into its soft limiters",
        ], tip: "raise slowly with three different voicings and repeats blur into one another." },
      { id: "pingpong", label: "ping-pong", type: "switch", x: 24.6, y: 73.9, size: 6.5, description: [
          "off (up): standard stereo",
          "ping-pong (center): alternates the delayed stereo image",
          "inverted (down): phase-inverted ping-pong for wider fields",
        ], tip: "inverted with mono in is the widest this box gets.",
        diagrams: [
          { id: "pp-off", label: "off", icon: "Minus" },
          { id: "pp-on", label: "ping-pong", icon: "ArrowLeftRight" },
          { id: "pp-inv", label: "inverted", icon: "Shuffle" },
        ] },
      { id: "mod-depth", label: "mod depth", type: "knob", x: 37.3, y: 73.9, size: 9.5, description: "global LFO depth on all three delay times in ms, slight stereo offset. Chorus low, vibrato and wobble high.", tip: "a hair of depth on the 12-bit line is tape flutter." },
      { id: "mod-rate", label: "mod rate", type: "knob", x: 54.5, y: 73.9, size: 9.5, description: "global modulation LFO speed, 0.1–2.0 Hz.", tip: "very slow rates drift the golden ratios so nothing repeats exactly." },
      { id: "in-l", label: "in l", type: "jack", x: 10.2, y: 89.1, size: 6.5, voltageRange: "audio", description: "left audio input, normalled to mono alone. Disconnecting inputs clears buffers against clicks and runaway.", tip: "mono in, PING-PONG on: instant stereo." },
      { id: "in-r", label: "in r", type: "jack", x: 20.3, y: 89.1, size: 6.5, voltageRange: "audio", description: "right audio input.", tip: "patch true stereo and leave PING-PONG off to keep the original image." },
      { id: "time-1-cv", label: "time 1 cv", type: "jack", x: 30.3, y: 89.1, size: 6.5, voltageRange: "bipolar cv", description: "modulates line-1 time, and lines 2/3 through the subdivisions.", tip: "slow CV bends the grid; fast CV pitch-shifts it." },
      { id: "time-2-cv", label: "time 2 cv", type: "jack", x: 40.3, y: 89.1, size: 6.5, voltageRange: "bipolar cv", description: "modulates line-2 time independently.", tip: "an envelope here smears line 2 on every hit." },
      { id: "time-3-cv", label: "time 3 cv", type: "jack", x: 50.3, y: 89.1, size: 6.5, voltageRange: "bipolar cv", description: "modulates line-3 time independently.", tip: "random voltage here makes the longest line most unstable." },
      { id: "mod-cv", label: "mod cv", type: "jack", x: 60.4, y: 89.1, size: 6.5, voltageRange: "cv", description: "modulates global MOD DEPTH.", tip: "gate it to add flutter only on the chorus." },
      { id: "repeats-cv", label: "repeats cv", type: "jack", x: 70.4, y: 89.1, size: 6.5, voltageRange: "cv", description: "global feedback modulation for all three lines.", tip: "an envelope follower here rings loud passages longer." },
      { id: "out-l", label: "out l", type: "jack", x: 80.4, y: 89.1, size: 6.5, voltageRange: "audio", description: "left stereo output.", tip: "soft limiters sit here, runaway is loud but bounded." },
      { id: "out-r", label: "out r", type: "jack", x: 90.5, y: 89.1, size: 6.5, voltageRange: "audio", description: "right stereo output.", tip: "check inverted PING-PONG width here before committing to mono." },
    ],
    manual: [
      {
        title: "three delay lines",
        body: "Three parallel stereo lines, 20 ms–1.6 s. Line 1 is master, knob, tap, or external clock. Lines 2/3 lock via triplet, eighth, dotted, or golden subdivisions with 0.5×–2× trims, or run free. A global LFO modulates all three times with stereo offset."
      },
      {
        title: "voicing and tone",
        body: "Per line: pristine 24/96, ADM compander grit, or 12-bit vintage converters with pre-emphasis, dither, DAC filter. TONE tilts inside each loop: dark one way, high boost the other, in-loop boost pushes past unity into saturated wash, held by soft limiters and an 18 Hz rumble filter."
      },
      {
        title: "x-feed and kill",
        body: "X-FEED routes 1 → 2 → 3 → 1 into a circulating network allowed past unity. Golden subdivisions resist comb filtering. KILL switches mute and sever a line while its buffer records, so echoes resume on release, performance tools and panic buttons."
      }
    ],
    suggestedPatches: [
      {
        id: "golden-wash",
        title: "golden wash",
        description: "Golden subdivisions on lines 2 and 3, a different voice on each line, and X-FEED raised until the repeats stop being repeats. The irrational ratios keep the wash from turning metallic.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "source",
            label: "Source",
            sublabel: "plucks or chords",
            x: 20, y: 40, width: 140, height: 90,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 70 }
            ]
          },
          {
            id: "clock",
            label: "Clock",
            x: 20, y: 160, width: 140, height: 80,
            ports: [
              { id: "out", label: "Clk", side: "right", offsetY: 62, icon: "square" }
            ]
          },
          {
            id: "tessellation",
            label: "Tessellation",
            x: 200, y: 20, width: 180, height: 240,
            settings: [
              { label: "Subdiv 2 / 3", value: "Golden / Golden" },
              { label: "Voices", value: "24/96 · ADM · 12-bit" },
              { label: "X-Feed", value: "70%" }
            ],
            ports: [
              { id: "in-l", label: "In L", side: "left", offsetY: 70 },
              { id: "clk", label: "Ext Clk", side: "left", offsetY: 190 },
              { id: "out-l", label: "Out L", side: "right", offsetY: 70 },
              { id: "out-r", label: "Out R", side: "right", offsetY: 100 }
            ]
          },
          {
            id: "mixer",
            label: "Mixer",
            x: 420, y: 40, width: 140, height: 110,
            ports: [
              { id: "left-in", label: "Left In", side: "left", offsetY: 70 },
              { id: "right-in", label: "Right In", side: "left", offsetY: 100 }
            ]
          }
        ],
        cables: [
          { id: "audio", fromNode: "source", fromPort: "out", toNode: "tessellation", toPort: "in-l", color: "#D7B56D" },
          { id: "clk", fromNode: "clock", fromPort: "out", toNode: "tessellation", toPort: "clk", color: "#5ec2ab" },
          { id: "out-l", fromNode: "tessellation", fromPort: "out-l", toNode: "mixer", toPort: "left-in", color: "#8c7aa3" },
          { id: "out-r", fromNode: "tessellation", fromPort: "out-r", toNode: "mixer", toPort: "right-in", color: "#8c7aa3" }
        ],
        steps: [
          {
            instruction: "Patch a mono source into IN L, set both subdivision switches to Golden, and give each line a different voice.",
            detail: "Leave IN R empty so the input is normalled to both sides, and set PING-PONG to Ping-pong for width. 24/96 on line 1, ADM on line 2, 12-bit on line 3.",
            cableIds: ["audio"]
          },
          {
            instruction: "Clock line 1 from your sequencer and trim TIME 2 and TIME 3 to different golden detents.",
            detail: "Golden short on line 2 and golden long on line 3 bracket the master on both sides. The tap lamp shows the clock phase.",
            cableIds: ["clk"]
          },
          {
            instruction: "Raise X-FEED slowly and take the stereo outputs.",
            detail: "Around 70% the three lines circulate into one another and the irrational times keep the wash from turning metallic. Use the KILL switches to chop the network if it runs away; the buffers keep recording underneath.",
            cableIds: ["out-l", "out-r"]
          }
        ]
      }
    ]
  },
  {
    slug: "athanor",
    name: "athanor",
    subtitle: "chord-and-strum instrument modeled on the 1984 suzuki om-84 omnichord, 84 chords, a 13-position sonicstrings strip, and a 51-step chord memory",
    summary: "Twelve root buttons in circle-of-fifths order and seven quality buttons select any of the OM-84's 84 chords. A brass touch strip strums four octaves of the voicing, a divider-style organ chord holds underneath, and a melody voice tracks V/oct. Panel layout is still in flux, control positions here will move.",
    category: "vcv rack module",
    status: "chord strummer",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Music,
    hp: 24,
    panelImage: {
      src: "/modules/athanor/panel-v3.webp",
      width: 1800,
      height: 1900,
      alt: "athanor vcv rack module panel (pre-release layout)"
    },
    media: {},
    controls: [
      { id: "master", label: "master", type: "knob", x: 8.5, y: 14.0, size: 9, description: "MIX output level. Factory 72%.", tip: "STRUM and CHORD buses ignore this knob." },
      { id: "voice-1", label: "voice 1", type: "knob", x: 25.1, y: 14.0, size: 9, description: "vibrato string layer of the SonicStrings strip.", tip: "the wobbly one, the Omnichord's signature." },
      { id: "voice-2", label: "voice 2", type: "knob", x: 41.6, y: 14.0, size: 9, description: "steadier string layer.", tip: "voice 2 alone is closer to a harp; both together is the record." },
      { id: "sustain", label: "sustain", type: "knob", x: 58.2, y: 14.0, size: 9, description: "decay of all 13 ringing strip regions. SUS CV adds.", tip: "long sustain and a slow drag is the arpeggio that never resolves." },
      { id: "chord-level", label: "chord", type: "knob", x: 74.7, y: 14.0, size: 9, description: "continuous three-oscillator organ chord level.", tip: "panel-only, patch an external VCA for voltage control." },
      { id: "key-level", label: "key", type: "knob", x: 91.3, y: 14.0, size: 9, description: "monophonic melody voice level, driven by MELODY V/oct and M.GATE.", tip: "TRANSPOSE skips the melody voice, as on the OM-84." },
      { id: "roots", label: "root buttons", type: "switch", x: 51.6, y: 26.5, size: 8, description: [
          "twelve root buttons in the OM-84's circle-of-fifths order; selecting plays the chord with the active quality",
          "F♯-through-F pitch group: F♯–B fold below C, so C major voices G3/C4/E4",
          "a change fires a 5 ms TRIG pulse and updates polyphonic PITCH",
        ], tip: "with ROOT CV patched the buttons go quiet; unpatch and they wake." },
      { id: "qualities", label: "quality buttons", type: "switch", x: 50.0, y: 38.5, size: 8, description: [
          "maj · min · 7th · maj7 · min7 · dim · aug, dedicated buttons, not the OM-84's multi-button combinations",
          "sevenths and diminished keep the hardware's three-note fifth omission: C dim is A3/C4/E♭4",
          "quality persists across root changes, and vice versa",
        ], tip: "84 chords from 12 × 7, the original set as two dimensions." },
      { id: "display", label: "display", type: "meter", x: 28.6, y: 48.6, size: 14, description: "chord name, memory position, record/play status.", tip: "confirms each ENTER with the stored chord in record mode." },
      { id: "tune", label: "tune", type: "knob", x: 9.8, y: 61.5, size: 9, description: "whole instrument ±50 cents. Included in PITCH so external voices track.", tip: "the original's recessed tuning screw, as a knob." },
      { id: "transpose", label: "transpose", type: "knob", x: 25.9, y: 61.5, size: 9, description: "chord and strum ±12 semitones. Melody voice untouched, as on hardware.", tip: "down an octave for the bass-register strum." },
      { id: "mem", label: "mem", type: "switch", x: 42.9, y: 61.5, size: 8, description: "latching 51-chord memory enable. MEM on, REC off: ENTER/ADV steps through; past the last lands on a silent end, no wrap.", tip: "REPEAT in playback returns to a silent ready state." },
      { id: "rec", label: "rec", type: "switch", x: 53.7, y: 61.5, size: 8, description: "latching record. Select a chord, ENTER to store, the chord stops to confirm. ENTER with silence stores a blank. REC off arms playback silently.", tip: "REPEAT deletes and recalls the last entry for fixes." },
      { id: "repeat", label: "repeat", type: "switch", x: 65.3, y: 61.5, size: 8, description: "record: delete and recall the last entry. Playback: return to the silent ready state before entry 1.", tip: "Cancel/Omit/Skip aren't implemented, REPEAT is the whole toolkit." },
      { id: "enter", label: "enter", type: "switch", x: 77.8, y: 61.5, size: 8, description: "record: store the chord (or blank). Playback: play the first entry, then advance per press.", tip: "ADV does the same under trigger control." },
      { id: "off", label: "off", type: "switch", x: 92.2, y: 61.5, size: 8, description: "silences organ and all ringing strip voices. Any root, quality, or strip touch resumes.", tip: "the Instant Off pad, as a button." },
      { id: "strip", label: "sonicstrings strip", type: "meter", x: 50.0, y: 73.5, size: 12, description: [
          "13-position strumplate: four three-note octaves plus the first pitch of a fifth, per Suzuki's diagrams",
          "drag for rising/falling four-octave arpeggios, or touch directly. Remaps on every chord change",
          "all 13 regions ring independently under SUSTAIN",
        ], tip: "STRUM CV maps 0–10 V across regions, triggering each newly crossed, a sequencer can play the strip." },
      { id: "in-root", label: "root cv", type: "jack", x: 7.2, y: 84.3, size: 7.5, voltageRange: "1 V/oct · 0 V = C", description: "quantized root at 1 V/oct. Octaves wrap to pitch class. Buttons inactive while patched.", tip: "a quantizer chooses roots; three gates choose quality." },
      { id: "in-maj", label: "maj gate", type: "jack", x: 17.9, y: 84.3, size: 7.5, voltageRange: "gate", description: "quality gate. MAJ/MIN/7TH combinations encode all seven qualities, MAJ7, MIN7, DIM, AUG from pairs and triples. Any patched gate replaces manual selection.", tip: "three ordinary gates, no tables, no scrolling index." },
      { id: "in-min", label: "min gate", type: "jack", x: 28.6, y: 84.3, size: 7.5, voltageRange: "gate", description: "quality gate, combined with MAJ and 7TH.", tip: "MIN + 7TH is minor seventh." },
      { id: "in-7th", label: "7th gate", type: "jack", x: 39.4, y: 84.3, size: 7.5, voltageRange: "gate", description: "quality gate, combined with MAJ and MIN.", tip: "MAJ + 7TH is major seventh." },
      { id: "in-strum", label: "strum cv", type: "jack", x: 50.1, y: 84.3, size: 7.5, voltageRange: "0–10 V", description: "0–10 V across the 13 regions, triggering each newly crossed, a ramp strums, steps pick.", tip: "a slow triangle is an endless up-and-down arpeggio." },
      { id: "in-adv", label: "adv", type: "jack", x: 60.8, y: 84.3, size: 7.5, voltageRange: "trigger", description: "advances chord memory one entry per trigger in playback, like ENTER.", tip: "clock from a sequencer bar output for progressions that follow the song." },
      { id: "in-sus", label: "sus cv", type: "jack", x: 71.6, y: 84.3, size: 7.5, voltageRange: "cv", description: "additive decay control atop the SUSTAIN knob.", tip: "the one level control with a jack, the rest are panel-only." },
      { id: "in-melody", label: "melody v/oct", type: "jack", x: 82.3, y: 84.3, size: 7.5, voltageRange: "1 V/oct", description: "mono keyboard-voice pitch, unrestricted range, wider than the OM-84's C-to-G.", tip: "TUNE applies; TRANSPOSE does not." },
      { id: "in-mgate", label: "m.gate", type: "jack", x: 93.1, y: 84.3, size: 7.5, voltageRange: "gate", description: "melody-voice gate.", tip: "level is set by KEY." },
      { id: "out-mix", label: "mix", type: "jack", x: 23.2, y: 94.6, size: 7.5, voltageRange: "audio", description: "complete instrument mix under MASTER.", tip: "the mono output the original had, plus everything it didn't." },
      { id: "out-strum", label: "strum", type: "jack", x: 36.6, y: 94.6, size: 7.5, voltageRange: "audio", description: "SonicStrings bus alone.", tip: "send strum to its own reverb, keep organ dry." },
      { id: "out-chord", label: "chord", type: "jack", x: 50.0, y: 94.6, size: 7.5, voltageRange: "audio", description: "organ chord bus alone. Releases decay ~85 ms rather than cutting.", tip: "a separate bus means a separate filter for the pad." },
      { id: "out-pitch", label: "pitch", type: "jack", x: 63.4, y: 94.6, size: 7.5, voltageRange: "V/oct · 3 ch", description: "3-channel polyphonic V/oct for the voicing, TUNE included, external voices track exactly.", tip: "drive three oscillators from this plus TRIG for an external Omnichord." },
      { id: "out-trig", label: "trig", type: "jack", x: 76.8, y: 94.6, size: 7.5, voltageRange: "5 ms pulse", description: "5 ms pulse on every chord change, including memory advances.", tip: "retrigger envelopes for PITCH-driven voices." },
    ],
    contextMenu: [
      {
        id: "clear-memory",
        group: "chord memory",
        label: "clear chord memory",
        kind: "toggle",
        description: "Erases all 51 stored entries."
      }
    ],
    manual: [
      {
        title: "chord selector and direct cv",
        body: "12 roots in circle-of-fifths order × 7 qualities give the OM-84's 84 chords as two persistent dimensions. ROOT is 1 V/oct (0 V = C); MAJ/MIN/7TH gates encode qualities by combination, replacing buttons while patched. F♯-through-F pitch group with the hardware's fifth-omitting seventh/diminished voicings."
      },
      {
        title: "sonicstrings and voices",
        body: "The brass strip is a 13-position strumplate, four three-note octaves plus one, remapped per chord. VOICE 1 vibrato, VOICE 2 steady, SUSTAIN decays all 13 regions, STRUM CV plays 0–10 V. Divider-style squares, hardware-inspired filtering, gentle saturation, no Omnichord samples. CHORD holds the organ; MELODY/M.GATE drive a mono voice at KEY level."
      },
      {
        title: "chord memory",
        body: "≤51 chords, as the OM-84. MEM+REC: select, ENTER to store; the chord stops to confirm. REC off arms silent playback; ENTER/ADV plays and advances, ending silent rather than wrapping. REPEAT deletes while recording, resets while playing. The original's rhythm, drum, and auto-bass sections are absent."
      }
    ]
  },
  {
    slug: "fatebinder",
    name: "fatebinder",
    subtitle: "four euclidean-articulated lfos with a radar-screen playhead, the rhythm leans on the outputs, it never steps them",
    summary: "Four related LFOs articulated by a rhythm you can see. The radar sweep is the playhead; when it crosses a blip, that lane inhales, surges, or shifts, but the outputs stay continuous. No steps, no clicks.",
    category: "vcv rack module",
    status: "rhythmic quad lfo",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Activity,
    hp: 18,
    panelImage: {
      src: "/modules/fatebinder/panel-v4.webp",
      width: 1350,
      height: 1900,
      alt: "fatebinder vcv rack module panel"
    },
    media: {},
    controls: [],
    typeplate: {
      unit: "UNIT 03652",
      type: "RHYTHM GEN",
      alt: "FORCED ALIGNMENT",
    },
    manual: [
      {
        title: "reading the radar",
        body: "Four concentric rings are the lanes, A teal, B violet, C azure, D amber. Small stationary dots are Euclidean steps; one larger moving dot per ring is the LFO itself. The amber sweep is the playhead, one revolution per cycle."
      },
      {
        title: "articulation",
        body: "Blips never touch outputs directly, they kick slewed envelopes modulating each lane's amplitude, rate, and waveform. Intensity crossfades LFO to rhythm: zero is a pure quad LFO; raised, every hit breathes harder. Memory sets how long articulations linger."
      },
      {
        title: "scenes and outputs",
        body: "Six scenes, Tide, Pulse, Drift, Teeth, Eclipse, Fracture, set blip behaviour and lane rate ratios. A–D are correlated motions; TRIG and ACCENT make the rhythm patchable. Bind rerolls the pattern; Freeze holds the sweep mid-breath."
      }
    ]
  },
  {
    slug: "chimera",
    name: "chimera",
    subtitle: "four-channel polyphonic performance mixer with clock-synced phrase looping, dual morphing effect busses, and a glue bus compressor",
    summary: "A performance console: capture 1, 2, or 4-bar loops on any channel, chop them probabilistically, wash them through two morphing effect slots, and glue the mix with a VCA-style bus compressor.",
    category: "vcv rack module",
    status: "performance mixer",
    accent: "#7f58a9",
    accentSoft: "rgba(127, 88, 169, 0.2)",
    icon: SlidersHorizontal,
    hp: 44,
    panelImage: {
      src: "/modules/chimera/panel-v4.webp",
      width: 3300,
      height: 1900,
      alt: "chimera vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "channels and looper",
        body: "Four polyphonic channels with level, pan, bus assignment. Arm a channel and the buffer waits for the downbeat, records the bar length, and plays back instantly. Loops on the morph busses degrade gracefully, a fraction of the saturated, filtered output writes back each pass."
      },
      {
        title: "morphing busses",
        body: "Slot A: Ensemble, Phasewash, Tape; slot B: Jet, Trem/Pan, Shimmer, each with Rate, Depth, Texture under CV. A channel on A+B crossfades slots with its morph knob; patching Returns swaps in external processors."
      },
      {
        title: "glue compressor",
        body: "VCA-style bus compression: 2:1, 4:1, 10:1 Crush ratios, selectable sidechain, high-pass detector filtering, dry/wet mix for parallel."
      }
    ]
  },
  {
    slug: "tetrarch",
    name: "tetrarch",
    subtitle: "five-voice hybrid drum machine blending 808-style circuit models with vintage pcm samples, driven by a generative phrase engine",
    summary: "A self-contained rhythm section: kick, snare, hat, percussion, and tom lanes, each pairing an analog circuit model with a sample layer under one blend knob. Patterns, variations, and fills replace static step programming.",
    category: "vcv rack module",
    status: "drum machine",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Drum,
    hp: 28,
    panelImage: {
      src: "/modules/tetrarch/panel-v4.webp",
      width: 2100,
      height: 1900,
      alt: "tetrarch vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "generative sequencer",
        body: "Five patterns set the groove, four fixed styles plus a generative fifth that rerolls on selection. Variations A–F escalate bare to dense, Fill arms a turnaround, Density and Humanize add ghost notes and micro-timing."
      },
      {
        title: "hybrid voices",
        body: "Each lane is a circuit model: bridged-T kick with beater knock, dual-resonator snare with crack and tail envelopes, six squares behind the hats, cowbell/bongo/clap percussion, sweepable tom for fills."
      },
      {
        title: "sample layer",
        body: "Vintage PCM samples run parallel with the synthesis, crossfaded by one Sample Blend control. Converter modes emulate 12-bit/32 kHz grit or 8-bit µ-law; every voice has its own output beside the stereo master."
      }
    ]
  },
  {
    slug: "nocturne-tv",
    name: "nocturne tv",
    subtitle: "vhs-era crt video synthesizer with four render engines, fourteen aesthetic programs, and cv-controlled chaos",
    summary: "A purely visual module that converts CV and audio into evolving video art, sync tearing, luma keying, recursive feedback, and glitched tape mechanics, rendered through fourteen aesthetic programs.",
    category: "vcv rack module",
    status: "video synth",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Tv,
    hp: 18,
    panelImage: {
      src: "/modules/nocturne-tv/panel-v4.webp",
      width: 1350,
      height: 1900,
      alt: "nocturne tv vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "video engines",
        body: "Four topologies: Sync emulates CRT sync tearing, Keyer generates quantized hard-edged shapes, Feedback points a virtual camera at its own monitor for blooming spirals, Glitch evokes tracking errors and broken transport."
      },
      {
        title: "fourteen programs",
        body: "Aesthetic scenes dictate palette and post: phosphor burn-in, scanlines, RF snow, chroma storms, datamosh corruption, neon wireframes, self-consuming ouroboros loops, and more."
      },
      {
        title: "buses and chaos",
        body: "Deflect, Hold, Luma key, Chroma buses map signals to warp, roll, contrast, tint, with eight more CV inputs including transient-reactive Explode. Unpatched, an internal chaos generator keeps the screen alive standalone."
      }
    ]
  },
  {
    slug: "divergence",
    name: "divergence",
    subtitle: "1-to-3 sequential stereo routing switch with polyphonic fidelity and jewel-lamp lane indication",
    summary: "A precision router that sends one stereo source to one of three stereo destinations, advanced by pushbutton or trigger. Pristine switching, no attenuation, no slew, exact voltages.",
    category: "vcv rack module",
    status: "stereo router",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Split,
    hp: 6,
    panelImage: {
      src: "/modules/divergence/panel-v4.webp",
      width: 450,
      height: 1900,
      alt: "divergence vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "routing",
        body: "One stereo input feeds lanes A, B, C in sequence. The Change Lane button advances manually; a Schmitt-trigger CV input advances per rising edge for clocked routing."
      },
      {
        title: "signal integrity",
        body: "Polyphonic channel counts preserved, the active lane carries exact input voltages, inactive lanes output precisely zero. Mono normalizes left-to-right automatically."
      },
      {
        title: "indication",
        body: "The main jewel shows the active lane by color, dark teal A, dark green B, shapetaker purple C, with per-lane LEDs between output pairs for confirmation at the jacks."
      }
    ]
  },
  {
    slug: "augury",
    name: "augury",
    subtitle: "polyphonic chord identifier scoring 31 templates, with a live crt readout and root, type, and confidence cv outputs",
    summary: "Feed it polyphonic pitches and it names the chord, root, quality, inversion, and spelling, on a CRT-style display, while emitting the analysis as control voltages. Audio passes through untouched.",
    category: "vcv rack module",
    status: "chord analyzer",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Eye,
    hp: 8,
    panelImage: {
      src: "/modules/augury/panel-v4.webp",
      width: 600,
      height: 1900,
      alt: "augury vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "detection engine",
        body: "Polyphonic V/oct quantizes to semitones with hysteresis, then scores against 31 chord templates from power chords to altered dominants. Gate-settling waits ~60 ms for all voices before committing."
      },
      {
        title: "the readout",
        body: "Root and suffix (Cmaj7, Dm9), slash chords when bass differs from root, spellings biased by the Key knob, confidence percentage. The CONF lamp shifts amber to green to cyan with certainty."
      },
      {
        title: "cv outputs",
        body: "ROOT emits 1 V/oct for the root, TYPE steps 0.4 V per template index, CONF scales 0–10 V with confidence, enough to drive arpeggiators or a voice following a generative progression."
      }
    ]
  },
  {
    slug: "reliquary",
    name: "reliquary",
    subtitle: "granular memory instrument, a 60-second buffer that forgets, where recall reinforces and neglect dissolves into the vessel resonator",
    summary: "A granular buffer treated as memory rather than tape. Regions fade unless recalled; replaying them reinforces their vitality. As memories degrade they excite the Vessel, an inharmonic modal resonator that slowly replaces what is forgotten.",
    category: "vcv rack module",
    status: "granular memory",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Hourglass,
    hp: 16,
    panelImage: {
      src: "/modules/reliquary/panel-v4.webp",
      width: 1200,
      height: 1900,
      alt: "reliquary vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "memory buffer",
        body: "Recall draws grains from ≤60 s of history; Size, Density, Dispersion, Pitch shape the cloud. Every region has a vitality that decays, faded memories return darker, wobblier, quieter."
      },
      {
        title: "consolidation",
        body: "Recalling a region reinforces it. Freeze the buffer and it self-curates: revisited phrases stay vivid while untouched sections dissolve into ghostly noise, then silence. The phosphor display maps vitality across the timeline."
      },
      {
        title: "the vessel",
        body: "An eight-mode inharmonic resonator rings beneath the grains, degraded memories excite it hardest, so the body gradually replaces forgotten audio. A YIN tracker keeps it tuned to the input, with lane voicings for smeared, shoegaze glissandi."
      }
    ]
  },
  {
    slug: "alembic",
    name: "alembic",
    subtitle: "transmutation's output expander, twelve breakout jacks for transport, expression, and voices, with no controls of its own",
    summary: "sits immediately to transmutation's right and brings out twelve signals the 40 hp panel has no room for. every jack is a view of a value transmutation already computed: clock and reset pulses, phrase and scene events, per-lane velocity and accent, and bass and harmony cv with gates. there are no knobs, no switches, and no inputs.",
    category: "vcv rack module",
    status: "output expander",
    accent: "#bd9a5b",
    accentSoft: "rgba(189, 154, 91, 0.2)",
    icon: Split,
    hp: 6,
    panelImage: {
      src: "/modules/alembic/panel-v3.webp",
      width: 450,
      height: 1900,
      alt: "alembic vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "link",
        label: "link",
        type: "meter",
        x: 50.0,
        y: 17.4,
        size: 22,
        description: "expander-link state to the transmutation on the left: green transporting, amber stopped, red unusable message, dark nothing on the left.",
        tip: "dark jewel means alembic isn't immediately to transmutation's right, move it till the lamp lights.",
      },
      {
        id: "clock",
        label: "clock",
        type: "jack",
        x: 28.2,
        y: 26.3,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "pulse per accepted clock step so downstream modules follow transmutation's transport. 10 V, 1 ms, counter-driven.",
        tip: "mult to a clock divider for bar-length gates from the same transport.",
      },
      {
        id: "reset",
        label: "reset",
        type: "jack",
        x: 71.8,
        y: 26.3,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "10 V, 1 ms pulse on transport reset. Counter-driven: missed frames coalesce into one pulse, never two.",
        tip: "patch to every slaved sequencer's reset so all restart on the same beat.",
      },
      {
        id: "phrase",
        label: "phrase",
        type: "jack",
        x: 28.2,
        y: 39.2,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "10 V, 1 ms pulse at each phrase end, the shared harmony loop boundary. For fills or once-per-phrase modulation.",
        tip: "run through a Bernoulli gate for probabilistic phrase-boundary fills.",
      },
      {
        id: "scene",
        label: "scene",
        type: "jack",
        x: 71.8,
        y: 39.2,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "10 V, 1 ms pulse when a variation launches (not when queued), always on the audible change. For sample-and-holds, switches, envelope triggers.",
        tip: "sample slow random per scene pulse for a modulation offset per scene.",
      },
      {
        id: "vel-a",
        label: "vel a",
        type: "jack",
        x: 28.2,
        y: 51.8,
        size: 24,
        voltageRange: "0-10V · poly ≤6",
        description: "lane-A per-voice velocity: 0-10 V, ≤6 channels. Latched on attack, held through release, mid-note edits never move CV under sustaining envelopes. Not audible alone, patch to a VCA or envelope depth.",
        tip: "patch beside the lane's audio into a poly VCA for per-voice dynamics, no extra modules.",
      },
      {
        id: "vel-b",
        label: "vel b",
        type: "jack",
        x: 71.8,
        y: 51.8,
        size: 24,
        voltageRange: "0-10V · poly ≤6",
        description: "lane-B velocity, same as vel A: 0-10 V, ≤6 channels, latched at attack. Left is A, right is B through the expression group.",
        tip: "cross-patch vel B to lane A's filter for one lane's accents shaping the other's tone.",
      },
      {
        id: "acc-a",
        label: "acc a",
        type: "jack",
        x: 28.2,
        y: 64.5,
        size: 24,
        voltageRange: "0/10V gate · poly ≤6",
        description: "lane-A accent: 10 V while an accented voice's gate is up, ≤6 channels. For punching accents through a VCA, opening filters, pinging gates.",
        tip: "OR with the lane's gate through a mixer to strike accented notes harder without a second envelope.",
      },
      {
        id: "acc-b",
        label: "acc b",
        type: "jack",
        x: 71.8,
        y: 64.5,
        size: 24,
        voltageRange: "0/10V gate · poly ≤6",
        description: "lane-B accent, matching acc A: 10 V while an accented lane-B voice's gate is up. Pair with vel B to separate loudness from accent.",
        tip: "drive a hi-hat accent from acc B while vel B shapes decay, a two-dimensional groove.",
      },
      {
        id: "harm-cv",
        label: "harmony cv",
        type: "jack",
        x: 28.2,
        y: 77.4,
        size: 24,
        voltageRange: "1V/OCT · poly ≤6",
        description: "scene's voiced global harmony as pitch CV, ≤6 channels, present even while lane A rests. The engine lacks this feature yet, so it sits at 0 V for now, live with no alembic change once the engine grows it.",
        tip: "hover the jack, the tooltip reports whether your transmutation version supplies harmony.",
      },
      {
        id: "harm-gate",
        label: "harmony gate",
        type: "jack",
        x: 71.8,
        y: 77.4,
        size: 24,
        voltageRange: "gate · poly ≤6",
        description: "harmony gates, channel-matched with harm cv. Quiet today (0 V, gate low) until the engine supplies harmony.",
        tip: "leave patched while quiet: it fires the moment the engine feature lands.",
      },
      {
        id: "bass-cv",
        label: "bass cv",
        type: "jack",
        x: 28.2,
        y: 90.0,
        size: 24,
        voltageRange: "1V/OCT",
        description: "lowest sounding lane-A voice as pitch CV. Held through release so tails don't jump, only the gate falls. Live today; needs no engine state beyond the voices.",
        tip: "double the lowest voice an octave down on a dedicated bass oscillator.",
      },
      {
        id: "bass-gate",
        label: "bass gate",
        type: "jack",
        x: 71.8,
        y: 90.0,
        size: 24,
        voltageRange: "gate",
        description: "10 V while lane A has any voice sounding. Pair with bass cv for a separate bass voice tracking the lane's bottom.",
        tip: "use as a sidechain-envelope gate keyed to lane A's lowest voice.",
      },
    ],
    manual: [
      {
        title: "what it is",
        body: "Alembic is Transmutation's output expander: twelve jacks, no controls. It sits immediately right and exposes values Transmutation computed, no knobs, switches, or inputs; nothing musical of its own."
      },
      {
        title: "the twelve outputs",
        body: "Three groups of two pairs. Transport: CLOCK, RESET, PHRASE, SCENE, 10 V, 1 ms pulses on clock, resets, phrase ends, launched scenes. Expression: VEL A/B, ACC A/B, per-lane velocity (0-10 V, latched at attack) and accent (10 V while an accented gate is up), polyphonic ≤6. Voices: BASS CV/GATE (lane A's lowest voice) and HARM CV/GATE (shared harmony). Left is A, right is B in expression; left is CV, right its gate in voices."
      },
      {
        title: "link lamp and broken link",
        body: "LINK jewel: green transporting, amber stopped, red unusable message, dark nothing left. Removing the Transmutation drops all gates and CVs to zero with tooltips reporting the break, Alembic never replays its last message."
      },
      {
        title: "timing",
        body: "All twelve jacks share one message, so all CVs arrive with their gates. Events are counted, not flagged: repeated frames fire nothing, missed frames coalesce into one pulse, and attaching to a running sequencer never fires spuriously."
      },
      {
        title: "jacks waiting on the engine",
        body: "Voiced global harmony isn't in the engine yet, so HARM CV/GATE sit at 0 V. The producer declares what it supplies; Alembic holds the rest quiet with tooltips reporting state. New engine features light those jacks with no alembic change, velocity and accent were once in that state."
      }
    ]
  },
  {
    slug: "campanile",
    name: "campanile",
    subtitle: "three bells walk a polyphonic chord on interlocking paths, seven spreads, polyrhythmic ratios, ratchet, register-safe bass",
    summary: "patch a polyphonic V/oct chord into CHORD and three related melody lines come out of A, B and C, with a three-channel gate, a bass pitch that stays in its register, and a slower chord trigger. PATTERN sets how one bell walks the chord, SPREAD sets how the other two relate to it, and RATIO puts them on different rhythms. the blue-line display reads like change-ringing notation: time runs down the screen and pitch classes run left to right.",
    category: "vcv rack module",
    status: "change-ringing arpeggiator",
    accent: "#46d97a",
    accentSoft: "rgba(70, 217, 122, 0.2)",
    icon: Music,
    hp: 24,
    panelImage: {
      src: "/modules/campanile/panel-v3.webp",
      width: 1800,
      height: 1900,
      alt: "campanile vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "pattern",
        label: "pattern",
        type: "knob",
        x: 13.5,
        y: 15.6,
        size: 12,
        description: [
          "order one bell walks the pool: Up, Down, Up/Down, Down/Up, Up&Down, Random, As played, Converge",
          "Up/Down sounds endpoints once per cycle; Up&Down repeats both for a bounce",
          "Random avoids immediate repeats where possible; As played keeps channel order; Converge walks outside in",
          "octave duplicates fold out before RANGE extends, so the pool holds distinct pitch classes; all but As played walk ascending",
        ],
        tip: "learn spreads on Up first, patterns change the path, spreads the relationship.",
      },
      {
        id: "spread",
        label: "spread",
        type: "knob",
        x: 36.1,
        y: 15.6,
        size: 12,
        description: [
          "how the three bells relate: Unison, Octave (default), Chord, Canon, Contrary, Hunt, Dodge",
          "Unison: same note. Octave: pitch, +1, +2 octaves. Chord: three adjacent places in parallel",
          "Canon: B two rows behind A, C two behind B, a three-part round. Contrary: A forward vs B/C backward, C an octave up",
          "Hunt/Dodge walk golden-ratio strides that keep evolving; a collision pass keeps bells on distinct classes with ≥3 in the chord",
        ],
        tip: "Hunt with RANGE 3 and three contrasting oscillators shows what the module is for.",
      },
      {
        id: "range",
        label: "range",
        type: "knob",
        x: 58.6,
        y: 15.6,
        size: 12,
        description: "extends the pool upward 1–4 octaves, default 2. Widens the walk without transposing the source chord.",
        tip: "raise RANGE when a line feels cramped, the chord stays, the walk lengthens.",
      },
      {
        id: "pattern-trim",
        label: "pattern trim",
        type: "knob",
        x: 13.5,
        y: 33.2,
        size: 8,
        description: "PATTERN CV attenuverter. Full CW: 0–10 V spans the pattern list, added to the knob. Quantized, halfway between settings means nothing.",
        tip: "stepped random with the trim barely open wanders between neighboring patterns.",
      },
      {
        id: "spread-trim",
        label: "spread trim",
        type: "knob",
        x: 36.1,
        y: 33.2,
        size: 8,
        description: "SPREAD CV attenuverter. Full CW: 0–10 V spans the spread list, added to the knob, quantized.",
        tip: "slow LFO near noon reorganizes a held chord without touching a knob.",
      },
      {
        id: "range-trim",
        label: "range trim",
        type: "knob",
        x: 58.6,
        y: 33.2,
        size: 8,
        description: "RANGE CV attenuverter. Full CW: 0–10 V spans 1–4 octaves, added to the knob, quantized to octaves.",
        tip: "sequence with slow gates to alternate tight and wide voicings by section.",
      },
      {
        id: "rate",
        label: "rate",
        type: "knob",
        x: 11.5,
        y: 49.7,
        size: 12,
        description: "internal note-clock 0.25–16 Hz, default 2 Hz. Sets bell advance until CLK takes over completely.",
        tip: "compose with CLK unpatched, patch master clock last, the pattern survives.",
      },
      {
        id: "gate-length",
        label: "gate length",
        type: "knob",
        x: 27.9,
        y: 49.7,
        size: 12,
        description: "gate length as a share of each bell's slot, 5–95%, default 50. In RHY slow bells hold longer notes.",
        tip: "gates under 25% keep 1:2:4 ratchets articulate.",
      },
      {
        id: "chord-rate",
        label: "chord rate",
        type: "knob",
        x: 44.3,
        y: 49.7,
        size: 10,
        description: "bass update and CHORD trigger rate: every 4, 8, 16, 32 note rows, default 16. Longer divisions let bells roam over steady bass.",
        tip: "at 32 with a slow clock the bass becomes a section marker, pair with a long filter sweep.",
      },
      {
        id: "bass",
        label: "bass",
        type: "knob",
        x: 60.7,
        y: 49.7,
        size: 10,
        description: "bass register window −2 to +2 octaves, default 0 (C2–B2). Shifts the window floor by whole octaves.",
        tip: "drop to −1 when the chord sits high so bass still reads as bass.",
      },
      {
        id: "ratio-trim",
        label: "ratio trim",
        type: "knob",
        x: 9.2,
        y: 65.9,
        size: 8,
        description: "RATIO CV attenuverter. Full CW: 0–10 V spans the seven-ratio list, added to the knob, quantized.",
        tip: "sample-and-hold with small trim jumps adjacent ratios per trigger.",
      },
      {
        id: "ratio",
        label: "ratio",
        type: "knob",
        x: 23.2,
        y: 65.9,
        size: 10,
        description: "activity relationship for the bells: 1:1:1, 1:2:2, 1:2:3, 1:2:4, 1:3:5, 2:3:4, 1:4:8. RATIO MODE decides what the numbers do.",
        tip: "1:2:4 is the showcase: try RAT first, then flip to RHY unchanged.",
      },
      {
        id: "ratio-mode",
        label: "ratio mode",
        type: "switch",
        x: 37.8,
        y: 65.9,
        size: 8,
        description: [
          "RAT (lower, default): every bell advances each row and fires its number of strikes inside it",
          "RHY (upper): number N strikes every Nth row, holding pitch and stretching its gate across its period",
        ],
        tip: "flip live mid-pattern, pitches keep walking while rhythm reorganizes.",
      },
      {
        id: "shape",
        label: "shape",
        type: "knob",
        x: 51.1,
        y: 65.9,
        size: 10,
        description: "skews ratchet strikes in the row; RAT mode only. Center even, left clusters at the start (DRAG), right tightens toward the end (ROLL).",
        tip: "1:2:4 RAT with short gates, then sweep SHAPE, march to stagger to flam.",
      },
      {
        id: "call",
        label: "call",
        type: "switch",
        x: 63.2,
        y: 65.9,
        size: 8,
        description: "momentary shift of all three paths from the next row. Deterministic, on the note clock, same call, same place, same result. Button lights while sounding, including input triggers.",
        tip: "tap every few bars in a Canon to rotate the round without stopping.",
      },
      {
        id: "ratio-cv",
        label: "ratio cv",
        type: "jack",
        x: 9.2,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "stepped CV over the ratio list via the RATIO trim. Adds to the knob, quantized.",
        tip: "quantized, so audio-rate modulation aliases into stepped chaos, usually a feature.",
      },
      {
        id: "clk",
        label: "clk",
        type: "jack",
        x: 19.2,
        y: 77.3,
        size: 8,
        voltageRange: "clock",
        description: "external note clock. Each rising edge advances one row; RATE ignored while patched.",
        tip: "swing the incoming clock, every ratio and the chord divider follow together.",
      },
      {
        id: "reset",
        label: "reset",
        type: "jack",
        x: 29.3,
        y: 77.3,
        size: 8,
        voltageRange: "trigger",
        description: "returns path, call offset, chord divider, clock measurement to start. Next clock edge restarts the figure.",
        tip: "mult transport reset here so the figure starts on row one with the sequencer.",
      },
      {
        id: "call-in",
        label: "call in",
        type: "jack",
        x: 39.3,
        y: 77.3,
        size: 8,
        voltageRange: "trigger",
        description: "trigger input identical to CALL: shifts all three paths from the next row. The button lights on arrival too.",
        tip: "drive from a divided clock for a call landing in the same place each cycle.",
      },
      {
        id: "pattern-cv",
        label: "pattern cv",
        type: "jack",
        x: 49.3,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "CV over the pattern list via PATTERN trim. Full CW: 0–10 V spans all eight, added to the knob, quantized.",
        tip: "negative trim lets an envelope pull the pattern back from the knob and release to it.",
      },
      {
        id: "spread-cv",
        label: "spread cv",
        type: "jack",
        x: 59.3,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "CV over the spread list via SPREAD trim. Full CW: 0–10 V spans all seven, added to the knob, quantized.",
        tip: "slow triangle motion breathes a held chord between neighboring spreads.",
      },
      {
        id: "range-cv",
        label: "range cv",
        type: "jack",
        x: 69.3,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "CV over 1–4 octave range via RANGE trim. Full CW: 0–10 V spans all, added to the knob, quantized to octaves.",
        tip: "a gate with the trim set makes verses narrow and choruses wide on one cable.",
      },
      {
        id: "rate-cv",
        label: "rate cv",
        type: "jack",
        x: 79.4,
        y: 77.3,
        size: 8,
        voltageRange: "1V/oct",
        description: "exponential FM on the internal clock at 1 V/oct: +1 V doubles, −1 V halves. Combined rate limited 0.02–100 Hz. Dead while CLK is patched.",
        tip: "a decaying envelope rushes the figure in and settles onto the knob rate.",
      },
      {
        id: "chord-in",
        label: "chord in",
        type: "jack",
        x: 89.4,
        y: 77.3,
        size: 8,
        voltageRange: "V/oct · poly ≤16",
        description: "the note pool: polyphonic V/oct, ≤16 channels. Octave duplicates fold to ≤12 pitch classes, then RANGE extends upward.",
        tip: "feed from a chord sequencer and change freely, bells re-voice next row without glitching.",
      },
      {
        id: "a",
        label: "a",
        type: "jack",
        x: 17.2,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "bell-A pitch V/oct. Holds last voltage with no chord patched, oscillators don't fall to C4.",
        tip: "start with A alone, add B and C once the figure feels right.",
      },
      {
        id: "b",
        label: "b",
        type: "jack",
        x: 30.3,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "bell-B pitch, related to A by SPREAD. Holds last voltage with no chord.",
        tip: "give B a contrasting timbre, spreads are written as separate lines.",
      },
      {
        id: "c",
        label: "c",
        type: "jack",
        x: 43.4,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "bell-C pitch, the figure's third line. Holds last voltage with no chord.",
        tip: "in Octave spread C sits two octaves above A, balance with a sub two down.",
      },
      {
        id: "gate",
        label: "gate",
        type: "jack",
        x: 56.6,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V · poly 3",
        description: "3-channel polyphonic gate: A, B, C. Patch to a poly envelope/VCA or split to three mono voices. 1:1:1 matches all channels; no chord holds all low.",
        tip: "split to three envelopes with different decays to separate bells in time too.",
      },
      {
        id: "bass-out",
        label: "bass out",
        type: "jack",
        x: 69.7,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "the literal lowest incoming chord note, not an inferred root, so inversions keep their lowest note. Folds into the BASS window; moves only on the chord clock plus one catch-up row on chord change.",
        tip: "BASS into a sub with CHORD triggering its envelope, bass that never fights the bells.",
      },
      {
        id: "chord-out",
        label: "chord out",
        type: "jack",
        x: 82.8,
        y: 89.1,
        size: 8,
        voltageRange: "10V trigger",
        description: "10 V trigger per chord-clock tick, every 4/8/16/32 rows. Context menu can restrict to rows where the chord changed.",
        tip: "advance a chord sequencer from it and harmony steps with the bass.",
      },
      {
        id: "blue-line",
        label: "blue-line display",
        type: "meter",
        x: 79.3,
        y: 39.7,
        size: 26,
        description: [
          "the figure as change-ringing blue lines: time runs down with the current row highlighted, columns are pitch classes low to high, nine rows of history",
          "A/B/C in teal, purple, amber matching the jacks; shared columns fan apart so unisons read as three",
          "top readout shows pattern, spread, sounding pitches, bass, ratio mode, pool size; a rule marks bass/chord-trigger rows",
        ],
        tip: "watch the horizontal rule, it shows when the next bass move and trigger land.",
      },
    ],
    contextMenu: [
      {
        id: "bass-fold",
        group: "Bass",
        label: "Fold",
        kind: "choice",
        values: ["Fixed window", "Nearest to previous"],
        description: "Fixed window folds bass into C2–B2, moved by BASS. Nearest to previous allows outside octaves for smaller melodic moves."
      },
      {
        id: "chord-trigger-change-only",
        group: "Chord trigger",
        label: "Only on chord change",
        kind: "toggle",
        description: "Off: CHORD fires every chord-clock division. On: only where the input chord changed, static harmony stays silent."
      },
      {
        id: "theme-follow",
        group: "Theme",
        label: "Follow global theme",
        kind: "toggle",
        description: "Follows the shared phosphor theme; a local pick disables following. Display only, never touches sound."
      }
    ],
    manual: [
      {
        title: "what it does",
        body: "Campanile is a change-ringing arpeggiator: patch polyphonic V/oct into CHORD and three bells walk it on A/B/C, with a 3-channel gate, register-safe bass, and a slower chord trigger. PATTERN walks one bell, SPREAD relates the other two, RATIO rhythms them. Ringing ideas as a model, not traditional methods or legal changes."
      },
      {
        title: "patterns and spreads",
        body: "PATTERN walks the pool: Up, Down, both Up/Down shapes, Random, As played, outside-in Converge. SPREAD relates the others: Unison, Octave, parallel Chord, two-row Canon, Contrary, golden-ratio Hunt and Dodge that evolve instead of looping. RANGE extends 1–4 octaves without transposing the chord."
      },
      {
        title: "ratios and shape",
        body: "RATIO picks 1:1:1–1:4:8; the lever decides the meaning. RAT: every bell advances each row, firing its strikes inside it. RHY: number N strikes every Nth row, holding pitch and stretching its gate. SHAPE affects RAT only: even centered, DRAG left, ROLL right."
      },
      {
        title: "two clocks",
        body: "The note clock (CLK or 0.25–16 Hz RATE) advances bells; the chord clock divides it by 4/8/16/32 and alone moves BASS and CHORD. Chord changes latch an extra bass update next row, no 32-row waits. RST returns path, call, divider, and clock measurement to start."
      },
      {
        title: "calls and the display",
        body: "CALL (button or trigger) shifts all three paths from the next row, deterministic, on the note clock. The blue-line display plots nine rows, time down, pitch left to right, bells in teal/purple/amber, ruling lines where bass and chord trigger update."
      }
    ]
  },
  {
    slug: "concordance",
    name: "concordance",
    subtitle: "master-clock divide-down paraphonic ensemble with twelve pitch-class clocks, traveler band filter and eight-stop registration, polyphonic in, stereo pair out",
    summary: "twelve pitch-class clocks divide down from one master tuning source, so every octave tap stays in exact power-of-two lock while the filter, articulation and ensemble are shared across all voices. Eight named stops rewrite the panel to complete instrument settings, and a magic-eye tube reads output level after swell and level. V/OCT and gate accept up to 16 polyphonic channels; LEFT and RIGHT are a mono stereo pair.",
    category: "vcv rack module",
    status: "paraphonic ensemble",
    accent: "#3fb56a",
    accentSoft: "rgba(63, 181, 106, 0.2)",
    icon: Eye,
    hp: 20,
    panelImage: {
      src: "/modules/concordance/panel-v3.webp",
      width: 1500,
      height: 1900,
      alt: "concordance vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "registration",
        label: "registration",
        type: "knob",
        x: 17.7,
        y: 50.0,
        size: 14,
        description: "one of eight whole-instrument stops: Newsreel, Tutti, Vox humana, Tibia, Celeste, Bourdon, Regal, Aeolian. A stop writes its values into the panel, wave, expand, drawbars, envelope, traveler, vibrato, ensemble, voicing, then leaves everything editable; tune untouched. Loads only on selection change.",
        tip: "the tooltip names the current stop, turn to one, read what it set, edit from there.",
      },
      {
        id: "tune",
        label: "tune",
        type: "knob",
        x: 25.8,
        y: 66.9,
        size: 13,
        description: "whole chord ±100 cents. Offsets the shared master clock, so vibrato and drift move with it.",
        tip: "match a detuned tape loop here instead of retuning every oscillator.",
      },
      {
        id: "wave",
        label: "wave",
        type: "switch",
        x: 9.6,
        y: 66.9,
        size: 9,
        description: "ramp, square, narrow pulse, or a string stack of 8' saw with phase-locked 4' octave. Level-matched, switching changes timbre only.",
        tip: "the string stack through a narrow traveler band is the closest to a real ensemble keyboard.",
      },
      {
        id: "expand",
        label: "expand",
        type: "knob",
        x: 41.9,
        y: 66.9,
        size: 13,
        description: "blends a quieter, key-dependent stretched copy around the locked divider core, zero is strictly divided, higher loosens into PE-1000 honky-tonk expansion.",
        tip: "a little under slow chords; more under stabs, where beating hides in the attack.",
      },
      {
        id: "attack",
        label: "attack",
        type: "knob",
        x: 9.6,
        y: 33.1,
        size: 13,
        description: "shared envelope attack, 2 ms–3.2 s. One envelope drives every voice, new chords swell as a section.",
        tip: "slow attacks with Tibia score a landscape with two fingers.",
      },
      {
        id: "decay",
        label: "decay",
        type: "knob",
        x: 25.8,
        y: 33.1,
        size: 13,
        description: "shared envelope decay, 0.16–32 s. Shapes the fall of held chords.",
        tip: "long decays let section movement wander inside a held chord.",
      },
      {
        id: "release",
        label: "release",
        type: "knob",
        x: 41.9,
        y: 33.1,
        size: 13,
        description: "shared envelope release, 25 ms–11 s. How long chords ring after the last gate falls.",
        tip: "match release to the room, long tails want long reverbs.",
      },
      {
        id: "breath",
        label: "breath",
        type: "switch",
        x: 58.1,
        y: 33.1,
        size: 9,
        description: "one shared paraphonic envelope; bass/treble groups split at C2, C3, or C4; or PE-style grouped attack with individual key decay.",
        tip: "split mode keeps bass notes from retriggering the treble tail.",
      },
      {
        id: "traveler-low",
        label: "traveler low",
        type: "knob",
        x: 50.0,
        y: 12.1,
        size: 10,
        description: "traveler band lower edge, 22 Hz–2.3 kHz. Both faders run low to high left to right, the band is the gap between handles.",
        tip: "close to a slit at high peak and sweep both handles for a formant wah.",
      },
      {
        id: "traveler-high",
        label: "traveler high",
        type: "knob",
        x: 50.0,
        y: 20.2,
        size: 10,
        description: "traveler band upper edge, 420 Hz–18.5 kHz. SOFT pulls it down ≤48%; SWELL opens it ≤1/6 of travel.",
        tip: "park low with Bourdon for bass that never leaves the room.",
      },
      {
        id: "peak",
        label: "peak",
        type: "knob",
        x: 9.6,
        y: 16.2,
        size: 10,
        description: "resonance at both band edges, Q 0.68–5.5. Narrow bands at high peak ring like formants on every chord.",
        tip: "high peak plus traveler CV turns block chords into talking vowels.",
      },
      {
        id: "soft",
        label: "soft",
        type: "knob",
        x: 90.4,
        y: 16.2,
        size: 10,
        description: "mellow-tab tone control: darkens the band, rounding chords with warmth toward the top, the dry bus never distorts outright. Vintage tops at tanh drive 1.6; Modern turns the top half into overdrive to drive 3.4.",
        tip: "Modern range, high peak, closed band: a screaming formant filter that still tracks chords.",
      },
      {
        id: "vib-depth",
        label: "vib depth",
        type: "knob",
        x: 75.4,
        y: 33.1,
        size: 13,
        description: "vibrato to 38 cents on the shared master clock, the whole chord bends as one. By default swells in over ~1 s after the phrase's first key, PE-1000 style; context menu makes it constant.",
        tip: "deep slow vibrato with delayed onset sells a chord as bowed, not keyed.",
      },
      {
        id: "vib-rate",
        label: "vib rate",
        type: "knob",
        x: 90.4,
        y: 33.1,
        size: 13,
        description: "vibrato rate, 0.18–8.2 Hz, into the shared master clock.",
        tip: "near 5 Hz with shallow depth reads as nervous chorus, not pitch wobble.",
      },
      {
        id: "ensemble",
        label: "ensemble",
        type: "knob",
        x: 58.1,
        y: 66.9,
        size: 13,
        description: "chorus amount. The wet path runs through a BBD-style input limiter, squashes and warms like hardware while dry stays clean.",
        tip: "halfway is the string-machine seat; full is seasick, both useful.",
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 74.2,
        y: 66.9,
        size: 13,
        description: "chorus-tap separation, narrows or widens the wet stereo image around the dry center.",
        tip: "narrow before a mono system so the chorus survives the sum.",
      },
      {
        id: "voicing",
        label: "voicing",
        type: "switch",
        x: 90.4,
        y: 66.9,
        size: 9,
        description: "two chorus characters. Classic: three-delay chorus, 0.62 Hz sweep plus 5.71 Hz shimmer, Roland-style. 3-phase: one delay read at three 120° points. Classic wider, 3-phase narrower and denser.",
        tip: "3-phase sits under a vocal; Classic in front of one.",
      },
      {
        id: "swell",
        label: "swell",
        type: "knob",
        x: 74.2,
        y: 50.0,
        size: 13,
        description: "expression level, organ-swell style: leaning in makes the instrument louder, brighter, wider at once. Scales gain 0.35–full of LEVEL, opens the traveler top ≤1/6, adds ≤1/4 ENSEMBLE.",
        tip: "park at 70% with a pedal on SWELL CV so every phrase has somewhere to go.",
      },
      {
        id: "level",
        label: "level",
        type: "knob",
        x: 90.4,
        y: 50.0,
        size: 13,
        description: "output level, plain gain after everything. The magic eye reads after it, turning down closes the eye.",
        tip: "set the loudest stop first, then match the rest while auditioning.",
      },
      {
        id: "magic-eye",
        label: "magic eye",
        type: "meter",
        x: 50.0,
        y: 50.0,
        size: 20,
        description: "output meter as a magic-eye tube. The dark wedge is wide at rest and closes as output grows, a shut eye means singing. Reads after LEVEL/SWELL, 8 ms rise, 120 ms fall; follows the shared palette: Phosphor, Lunar, Solar, Amber.",
        tip: "ride SWELL until the wedge just kisses shut on peaks.",
      },
      {
        id: "voct",
        label: "v/oct",
        type: "jack",
        x: 25.8,
        y: 79.0,
        size: 9,
        voltageRange: "1V/OCT · poly ≤16",
        description: "polyphonic pitch, ≤16 channels, quantized to semitones around C4 at 0 V. Unpatched assumes 0 V.",
        tip: "a mono sequence on channel 1 alone still plays, a chord of one is valid.",
      },
      {
        id: "gate",
        label: "gate",
        type: "jack",
        x: 9.6,
        y: 79.0,
        size: 9,
        voltageRange: "gate · poly ≤16",
        description: "polyphonic gates, high ≥1 V. Unpatched, every channel reads held, drones at C4 until a gate is patched.",
        tip: "mult one gate to every channel for block chords breathing as one section.",
      },
      {
        id: "register-cv",
        label: "register cv",
        type: "jack",
        x: 33.9,
        y: 89.1,
        size: 9,
        voltageRange: "1 V per stop",
        description: "1 V per stop, added to REGISTRATION, a sequencer steps through the eight stops. New stops load only on change.",
        tip: "slow stepped random re-registers between phrases.",
      },
      {
        id: "expand-cv",
        label: "expand cv",
        type: "jack",
        x: 41.9,
        y: 79.0,
        size: 9,
        voltageRange: "bipolar, 0.1 per volt",
        description: "bipolar CV adding to EXPAND at a tenth of travel per volt.",
        tip: "an envelope stretches the attack, then lets sustain lock back to the dividers.",
      },
      {
        id: "traveler-cv",
        label: "traveler cv",
        type: "jack",
        x: 50.0,
        y: 89.1,
        size: 9,
        voltageRange: "bipolar, ±3 octaves",
        description: "bipolar CV shifting the whole traveler band without changing width: 0.28 octaves/V to ±3 octaves.",
        tip: "an envelope here is a wah the whole chord rides together.",
      },
      {
        id: "ensemble-cv",
        label: "ensemble cv",
        type: "jack",
        x: 58.1,
        y: 79.0,
        size: 9,
        voltageRange: "bipolar, 0.1 per volt",
        description: "bipolar CV adding to ENSEMBLE at a tenth of travel per volt.",
        tip: "gate-driven chorus swells make verse and chorus from one held pad.",
      },
      {
        id: "swell-cv",
        label: "swell cv",
        type: "jack",
        x: 66.1,
        y: 89.1,
        size: 9,
        voltageRange: "bipolar, 0.1 per volt",
        description: "bipolar CV adding to SWELL at a tenth of travel per volt, loudness, brightness, width in one gesture.",
        tip: "a slow LFO breathes the whole section without touching a knob.",
      },
      {
        id: "left",
        label: "left",
        type: "jack",
        x: 74.2,
        y: 79.0,
        size: 9,
        voltageRange: "mono audio",
        description: "left of the stereo output pair, mono. Polyphony lives inside so filter, articulation, ensemble stay shared.",
        tip: "this jack alone is a valid mono feed, chorus folds down cleanly.",
      },
      {
        id: "right",
        label: "right",
        type: "jack",
        x: 90.4,
        y: 79.0,
        size: 9,
        voltageRange: "mono audio",
        description: "right of the stereo pair, mono. Take both for the full chorus image set by WIDTH and VOICING.",
        tip: "hard-pan the pair; the module already did the imaging.",
      },
    ],
    contextMenu: [
      {
        id: "drawbar-16",
        group: "drawbars",
        label: "16'",
        kind: "slider",
        description: "16' rank mix, an octave below, the bass foundation. All ranks stay phase-locked, so bars change timbre, never tuning."
      },
      {
        id: "drawbar-8",
        group: "drawbars",
        label: "8'",
        kind: "slider",
        description: "8' rank mix, the played note. Rests out at full, so the module sounds untouched."
      },
      {
        id: "drawbar-4",
        group: "drawbars",
        label: "4'",
        kind: "slider",
        description: "4' rank mix, an octave up."
      },
      {
        id: "drawbar-quint",
        group: "drawbars",
        label: "2 2/3'",
        kind: "slider",
        description: "2 2/3' rank mix, a twelfth up, the reedy quint colour."
      },
      {
        id: "drawbar-2",
        group: "drawbars",
        label: "2'",
        kind: "slider",
        description: "2' rank mix, two octaves up, the bright top."
      },
      {
        id: "registration",
        group: "registration",
        label: "registration",
        kind: "choice",
        values: ["Newsreel", "Tutti", "Vox humana", "Tibia", "Celeste", "Bourdon", "Regal", "Aeolian"],
        description: "Applies one of the eight stops, exactly as the panel selector."
      },
      {
        id: "retrigger",
        group: "retrigger shared envelope on new note",
        label: "retrigger shared envelope on new note",
        kind: "toggle",
        description: "On: new notes restart the shared envelope even over held keys. Off: legato phrasing over sustained chords."
      },
      {
        id: "delayed-vibrato",
        group: "delayed vibrato onset",
        label: "delayed vibrato onset",
        kind: "toggle",
        description: "On: PE-style vibrato swell per phrase, rising ~1 s after the first key from silence. Off: constant vibrato."
      },
      {
        id: "clock-drift",
        group: "vintage clock drift",
        label: "vintage clock drift",
        kind: "toggle",
        description: "On: the master clock's slow ±0.9-cent wander. Off: the clock ticks perfectly until vibrato is dialled in."
      },
      {
        id: "soft-range",
        group: "soft drive range",
        label: "soft drive range",
        kind: "choice",
        values: ["vintage (tone + warmth)", "modern (tone + overdrive)"],
        description: "Vintage keeps SOFT a tone control with warm top; Modern turns the top half into overdrive."
      },
      {
        id: "living-ensemble",
        group: "living ensemble",
        label: "living ensemble",
        kind: "choice",
        values: ["off", "subtle", "natural", "loose"],
        description: "Per-pitch-class tuning and level drift, Subtle ±3.2, Natural ±7.0, Loose ±15.0 cents: twelve players, not one machine. Off is bit-identical to its absence."
      },
      {
        id: "section-movement",
        group: "section movement",
        label: "section movement",
        kind: "choice",
        values: ["off", "subtle", "natural", "loose"],
        description: "How players come and go during a held chord, Living ensemble is who they are, this is their movement. Only rearranges while sounding."
      },
      {
        id: "oversampling",
        group: "saturation oversampling",
        label: "saturation oversampling",
        kind: "choice",
        values: ["1× (off)", "2× (default)", "4×", "8×"],
        description: "Saturation is the only stage making harmonics above Nyquist, higher factors stop bright chords folding back, at more CPU."
      },
      {
        id: "split-point",
        group: "bass/treble split point",
        label: "bass/treble split point",
        kind: "choice",
        values: ["C2", "C3 (default)", "C4"],
        description: "Bass/treble envelope split for grouped BREATH modes: note 36, 48, or 60."
      },
      {
        id: "theme",
        group: "theme",
        label: "theme",
        kind: "choice",
        values: ["follow global theme", "phosphor", "lunar", "solar", "amber"],
        description: "The magic eye follows the shared palette, or takes a local Phosphor, Lunar, Solar, or Amber."
      }
    ],
    manual: [
      {
        title: "twelve clocks, one instrument",
        body: "Twelve pitch-class clocks off one master source, octave taps locked in power-of-two. Filter, articulation, ensemble all shared, paraphonic, not polyphonic. TUNE, vibrato, drift act on the same clock, so the chord moves as one instrument; tone cues from early poly keyboards like the PE-1000."
      },
      {
        title: "stops and drawbars",
        body: "REGISTRATION holds eight stops: Newsreel, Tutti, Vox humana, Tibia, Celeste, Bourdon, Regal, Aeolian. Turning to one writes its values into the panel, a combination left editable, not a preset slot. The five context-menu drawbars (16, 8, 4, 2 2/3, 2') stay phase-locked; each stop sets all five."
      },
      {
        title: "playing it",
        body: "Send matching polyphonic V/OCT and GATE, take LEFT and RIGHT, ENSEMBLE near halfway, try the eight stops. The traveler is LOW over HIGH, both low-to-high left to right, the band is the gap, PEAK resonates both edges, SOFT darkens mellow-tab style. LEVEL is plain gain; SWELL leans the instrument louder, brighter, wider at once."
      },
      {
        title: "articulation and vibrato",
        body: "ATTACK/DECAY/RELEASE drive the shared envelope; BREATH picks one paraphonic envelope, bass/treble groups split at C2/C3/C4, or PE-style grouped attack with individual key decay. Vibrato rides the shared clock, swelling in ~1 s after the phrase's first key unless set constant. Vintage drift wanders ±0.9 cents, off, and every relationship stays exact."
      },
      {
        title: "factory library",
        body: "25 instruments in five folders: Keys, Pads, Bass, Leads, Percussion. Each preset stores panel plus context-menu state, loading never inherits from the previous patch."
      }
    ]
  },
  {
    slug: "crucible",
    name: "crucible",
    subtitle: "transmutation's input expander, ten jacks for record, harmony, performance, mute and solo, no controls, no outputs",
    summary: "crucible sits directly to transmutation's left and puts ten of its performance controls on cables, from the record pair to mute and solo. it adds nothing musical: every jack drives something transmutation already does, and the link lamp shows when the two modules are talking.",
    category: "vcv rack module",
    status: "input expander",
    accent: "#c49a52",
    accentSoft: "rgba(196, 154, 82, 0.2)",
    icon: AudioLines,
    hp: 4,
    panelImage: {
      src: "/modules/crucible/panel-v3.webp",
      width: 300,
      height: 1900,
      alt: "crucible vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "rec-voct",
        label: "rec v/oct",
        type: "jack",
        x: 30.0,
        y: 13.8,
        size: 34,
        voltageRange: "1V/oct · poly ≤6",
        description: [
          "pitch transmutation records and auditions, polyphonic ≤6. Both record jacks must be patched before the recorder listens",
          "mono gate strikes every held pitch; poly gate strikes its own channel. Non-finite voltages are skipped, never recorded wrong",
        ],
        tip: "mult sequencer pitch here and gate into rec gate to capture phrases hands-free.",
      },
      {
        id: "rec-gate",
        label: "rec gate",
        type: "jack",
        x: 30.0,
        y: 22.2,
        size: 34,
        voltageRange: "gate · poly ≤6",
        description: "gate transmutation records from, polyphonic ≤6. Mono strikes every held pitch at once; poly strikes only its channel.",
        tip: "patch the pair or neither, pitch alone records nothing.",
      },
      {
        id: "transpose",
        label: "transpose",
        type: "jack",
        x: 30.0,
        y: 30.5,
        size: 34,
        voltageRange: "1V/oct",
        description: [
          "shifts both lanes by whole semitones at 1 V/oct. Adds to the panel knob like tune CV, so the knob still works patched",
          "±2 V covers ±24 semitones. Between-semitone voltages round, the module can't play between",
        ],
        tip: "drive from a keyboard or quantizer for key changes, no scaling module needed.",
      },
      {
        id: "tension",
        label: "tension",
        type: "jack",
        x: 30.0,
        y: 38.9,
        size: 34,
        voltageRange: "0-10V",
        description: "voicing openness, 0–10 V. Replaces the panel value rather than adding, the panel rests at full, so an adding jack would do nothing.",
        tip: "a slow envelope breathes colour through the chords across a phrase.",
      },
      {
        id: "fill",
        label: "fill",
        type: "jack",
        x: 30.0,
        y: 47.3,
        size: 34,
        voltageRange: "gate",
        description: [
          "gate: while high, fill-marked steps play and non-fill stay silent. OR'd with the panel button",
          "switches high at 1 V, releases below 0.2 V, slow or noisy edges don't chatter",
        ],
        tip: "fire from a manual gate or irregular clock division for fills on demand.",
      },
      {
        id: "scene",
        label: "scene",
        type: "jack",
        x: 30.0,
        y: 55.6,
        size: 34,
        voltageRange: "0-10V",
        description: [
          "picks one of 16 scenes, 0–10 V. Fires only on scene change, holding a voltage never relaunches",
          "boundaries every 0.625 V need a quarter-step of overtravel, parked voltages never flip between scenes",
          "manual launching takes the wheel until the voltage moves on; unpatching forgets, so replugging chooses fresh",
        ],
        tip: "slow stepped voltage changes scenes from a pattern, not by hand.",
      },
      {
        id: "mute-a",
        label: "mute a",
        type: "jack",
        x: 30.0,
        y: 64.0,
        size: 34,
        voltageRange: "gate",
        description: "gate silencing lane A while high. OR'd with the panel switch, hand-muted stays muted whatever the cable does.",
        tip: "sequence mutes from a gate sequencer for hands-free arrangement.",
      },
      {
        id: "mute-b",
        label: "mute b",
        type: "jack",
        x: 30.0,
        y: 72.4,
        size: 34,
        voltageRange: "gate",
        description: "gate silencing lane B while high. OR'd with the panel switch, hand and cable never fight.",
        tip: "mult one gate to both mutes to drop both lanes at once.",
      },
      {
        id: "solo-a",
        label: "solo a",
        type: "jack",
        x: 30.0,
        y: 80.7,
        size: 34,
        voltageRange: "gate",
        description: "gate soloing lane A while high. Solo wins over mute, as on the panel; cable-muted lanes still solo by hand.",
        tip: "punch solos from a footswitch gate, hands free for the main patch.",
      },
      {
        id: "solo-b",
        label: "solo b",
        type: "jack",
        x: 30.0,
        y: 89.1,
        size: 34,
        voltageRange: "gate",
        description: "gate soloing lane B while high. Solo wins over mute, as on the panel.",
        tip: "alternate solo A/B gates from a flip-flop for hands-free lane switching.",
      },
      {
        id: "link",
        label: "link",
        type: "meter",
        x: 83.0,
        y: 97.5,
        size: 20,
        description: [
          "lit when a transmutation sits immediately right. Unlit means the jacks reach nothing, crucible only drives its direct neighbor",
          "green while cables carry voltages, amber when linked but all sockets empty, dark with nothing beside",
        ],
        tip: "no response anywhere? check this lamp first, a dragged-away transmutation releases every jack.",
      },
    ],
    manual: [
      {
        title: "what it is",
        body: "crucible is transmutation's input expander: ten jacks in one 4 HP column for the record pair, transpose, tension, fill, scene, mute, solo. It sits immediately left; the link lamp lights when the two talk. Nothing musical of its own, every jack drives an existing transmutation control, and nothing comes back out except through transmutation."
      },
      {
        title: "playing it",
        body: "hold mute A high to silence lane A; 0–10 V into tension opens and closes voicings; slow steps into scene change scenes from a pattern. transpose adds to its knob like tune CV; tension replaces its panel value. the record pair needs both cables, pitch alone records nothing."
      },
      {
        title: "gates do not chatter",
        body: "every gate goes high at 1 V and releases below 0.2 V, two thresholds, so slow or noisy edges flip once. fill, mute, solo OR with their panel controls; solo wins over mute, as on the panel."
      },
      {
        title: "scene select holds its choice",
        body: "16 scenes over 10 V means boundaries every 0.625 V, inside ordinary bus noise, so the jack needs a quarter-step of overtravel past a boundary, and parked voltages never flip. select is an event: it fires only on change, manual takes the wheel until the voltage moves on, and unpatching forgets so replugging chooses fresh."
      },
      {
        title: "empty sockets and unlinking",
        body: "every jack reports cable presence separately from voltage: 0 V patched is a value; unpatched leaves the panel control untouched. jacks never move transmutation's knobs, so pulling cables restores the panel exactly. dragging the transmutation away releases every jack, transpose to panel value, tension to full, no gate left held."
      }
    ]
  },
  {
    slug: "dioptra",
    name: "dioptra",
    subtitle: "four-channel oscilloscope with a round crt, per-channel gain and readouts, vector mode and exact pass-through outputs",
    summary: "up to four signals draw against time on a round green-phosphor tube, or pair off into two vector figures in 1x2 & 3x4 mode. Each channel gets stepped gain, ±10 V position and a four-digit readout measuring peak-to-peak, minimum, maximum, frequency, rms or scale, while every input is copied exactly to its output.",
    category: "vcv rack module",
    status: "four-channel oscilloscope",
    accent: "#bbab8e",
    accentSoft: "rgba(187, 171, 142, 0.2)",
    icon: Tv,
    hp: 26,
    panelImage: {
      src: "/modules/dioptra/panel-v3.webp",
      width: 1950,
      height: 1900,
      alt: "dioptra vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "screen",
        label: "crt screen",
        type: "meter",
        x: 50.0,
        y: 37.84,
        size: 60,
        description: [
          "round CRT shared by all four channels in waveform mode; 1x2 & 3x4 splits it into two vector figures, I vs II and III vs IV",
          "each lane captures a 256-point min/max envelope per sweep; the beam clips to the circle, past-edge traces simply aren't there",
          "the trigger line shows only in normal/single, in auto or vector the threshold knob still sets the counter crossing with no line drawn",
        ],
        tip: "with cursors on, click the face to grab the nearest cursor and drag; otherwise the face isn't clickable.",
      },
      {
        id: "pos-1",
        label: "channel i position",
        type: "knob",
        x: 10.6,
        y: 15.82,
        size: 11,
        description: "slides channel I's trace ±10 V to separate stacked signals. Display only, never changes OUT-I.",
        tip: "offset voices a few volts apart to read four lines, not one blur.",
      },
      {
        id: "pos-2",
        label: "channel ii position",
        type: "knob",
        x: 89.4,
        y: 15.82,
        size: 11,
        description: "slides channel II's trace ±10 V to separate stacked signals. Display only, never changes OUT-II.",
        tip: "offset voices a few volts apart to read four lines, not one blur.",
      },
      {
        id: "pos-3",
        label: "channel iii position",
        type: "knob",
        x: 10.6,
        y: 53.84,
        size: 11,
        description: "slides channel III's trace ±10 V to separate stacked signals. Display only, never changes OUT-III.",
        tip: "offset voices a few volts apart to read four lines, not one blur.",
      },
      {
        id: "pos-4",
        label: "channel iv position",
        type: "knob",
        x: 89.4,
        y: 53.84,
        size: 11,
        description: "slides channel IV's trace ±10 V to separate stacked signals. Display only, never changes OUT-IV.",
        tip: "offset voices a few volts apart to read four lines, not one blur.",
      },
      {
        id: "gain-1",
        label: "channel i gain",
        type: "knob",
        x: 10.6,
        y: 29.4,
        size: 7,
        description: [
          "channel I vertical scale in V/screen, 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16, 0.08",
          "starts at 10 V/screen, ±5 V fills the tube edge to edge. Display only, gain never touches outputs",
          "while any gain knob moves, every readout shows its own V/screen for 1.6 s instead of the statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest with position.",
      },
      {
        id: "gain-2",
        label: "channel ii gain",
        type: "knob",
        x: 89.4,
        y: 29.4,
        size: 7,
        description: [
          "channel II vertical scale in V/screen, 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16, 0.08",
          "starts at 10 V/screen, ±5 V fills the tube edge to edge. Display only, gain never touches outputs",
          "while any gain knob moves, every readout shows its own V/screen for 1.6 s instead of the statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest with position.",
      },
      {
        id: "gain-3",
        label: "channel iii gain",
        type: "knob",
        x: 10.6,
        y: 67.43,
        size: 7,
        description: [
          "channel III vertical scale in V/screen, 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16, 0.08",
          "starts at 10 V/screen, ±5 V fills the tube edge to edge. Display only, gain never touches outputs",
          "while any gain knob moves, every readout shows its own V/screen for 1.6 s instead of the statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest with position.",
      },
      {
        id: "gain-4",
        label: "channel iv gain",
        type: "knob",
        x: 89.4,
        y: 67.43,
        size: 7,
        description: [
          "channel IV vertical scale in V/screen, 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16, 0.08",
          "starts at 10 V/screen, ±5 V fills the tube edge to edge. Display only, gain never touches outputs",
          "while any gain knob moves, every readout shows its own V/screen for 1.6 s instead of the statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest with position.",
      },
      {
        id: "seg-1",
        label: "channel i readout",
        type: "meter",
        x: 10.6,
        y: 38.92,
        size: 11,
        description: [
          "four-digit channel-I readout: peak-to-peak, min, max, frequency, rms, or V/screen, refreshed bench-meter style",
          "click to hide/show the trace, muted lanes read blank. Min/max/rms span the sweep buffer across all poly channels; frequency counts first-channel crossings only",
        ],
        tip: "click a readout to solo the trace you're tuning without repatching.",
      },
      {
        id: "seg-2",
        label: "channel ii readout",
        type: "meter",
        x: 89.4,
        y: 38.92,
        size: 11,
        description: [
          "four-digit channel-II readout: peak-to-peak, min, max, frequency, rms, or V/screen, refreshed bench-meter style",
          "click to hide/show the trace, muted lanes read blank. Min/max/rms span the sweep buffer across all poly channels; frequency counts first-channel crossings only",
        ],
        tip: "click a readout to solo the trace you're tuning without repatching.",
      },
      {
        id: "seg-3",
        label: "channel iii readout",
        type: "meter",
        x: 10.6,
        y: 77.06,
        size: 11,
        description: [
          "four-digit channel-III readout: peak-to-peak, min, max, frequency, rms, or V/screen, refreshed bench-meter style",
          "click to hide/show the trace, muted lanes read blank. Min/max/rms span the sweep buffer across all poly channels; frequency counts first-channel crossings only",
        ],
        tip: "click a readout to solo the trace you're tuning without repatching.",
      },
      {
        id: "seg-4",
        label: "channel iv readout",
        type: "meter",
        x: 89.4,
        y: 77.06,
        size: 11,
        description: [
          "four-digit channel-IV readout: peak-to-peak, min, max, frequency, rms, or V/screen, refreshed bench-meter style",
          "click to hide/show the trace, muted lanes read blank. Min/max/rms span the sweep buffer across all poly channels; frequency counts first-channel crossings only",
        ],
        tip: "click a readout to solo the trace you're tuning without repatching.",
      },
      {
        id: "mode",
        label: "mode",
        type: "switch",
        x: 23.31,
        y: 64.91,
        size: 7,
        description: [
          "waveform draws all four channels against time; 1x2 & 3x4 draws two vector figures, I vs II and III vs IV",
          "vector mode bypasses triggering: threshold still sets the counter crossing, but no sweep waits on it",
        ],
        tip: "quadrature sines into I and II draw the classic circle, detune one voice and watch it turn.",
      },
      {
        id: "trig-mode",
        label: "trigger mode",
        type: "switch",
        x: 76.9,
        y: 64.91,
        size: 7,
        description: [
          "auto (down) draws with or without a crossing, always a picture while hunting; normal (center) draws only on real crossings",
          "single (up) holds until Arm single sweep, then captures one sweep on the next crossing and holds it",
        ],
        tip: "start in auto to find the signal, then normal once the trace stands still.",
      },
      {
        id: "time",
        label: "time",
        type: "knob",
        x: 23.31,
        y: 77.03,
        size: 11,
        description: [
          "horizontal scale, 15 detents from 1 ms to 50 s in the 1-2-5 bench sequence",
          "starts at 500 ms/screen. At ≥1 s/screen the display can roll instead of sweeping when Roll is on, the readable way to watch envelopes and slow LFOs",
        ],
        tip: "frame a few cycles, not dozens, crowded sweeps hide clipping and ringing.",
      },
      {
        id: "threshold",
        label: "threshold",
        type: "knob",
        x: 76.9,
        y: 77.03,
        size: 11,
        description: [
          "trigger threshold −10 to +10 V; sweeps start when the source crosses it on the selected edge",
          "also the crossing level for all four frequency counters, even where no trigger line is drawn",
        ],
        tip: "park mid-swing of the trigger source, near peaks it fires on noise.",
      },
      {
        id: "stat-p2p",
        label: "p2p",
        type: "switch",
        x: 34.82,
        y: 75.55,
        size: 7,
        description: "peak-to-peak volts on all four readouts. One of four radio buttons, exactly one lit; the menu adds rms and V/screen.",
        tip: "p2p is the fastest clipping check, near 20 V is out of rack headroom.",
      },
      {
        id: "stat-min",
        label: "min",
        type: "switch",
        x: 45.01,
        y: 75.55,
        size: 7,
        description: "each lane's minimum volts across the sweep buffer. One of four radio buttons; menu adds rms and V/screen.",
        tip: "read min against max for symmetry about zero.",
      },
      {
        id: "stat-max",
        label: "max",
        type: "switch",
        x: 55.19,
        y: 75.55,
        size: 7,
        description: "each lane's maximum volts across the sweep buffer. One of four radio buttons; menu adds rms and V/screen.",
        tip: "watch max while opening a filter to catch resonance peaks before downstream clips.",
      },
      {
        id: "stat-freq",
        label: "freq",
        type: "switch",
        x: 65.38,
        y: 75.55,
        size: 7,
        description: "each lane's frequency in Hz, counted from first-channel threshold crossings, lightly smoothed. One of four radio buttons.",
        tip: "dashes on a slow LFO mean the threshold sits outside the swing, move it mid-range.",
      },
      {
        id: "in-1",
        label: "ch-i",
        type: "jack",
        x: 10.6,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal for channel I. Any voltage, ≤16 poly channels, all drawn; an exact copy leaves OUT-I.",
        tip: "run signals through dioptra inline instead of multing copies.",
      },
      {
        id: "in-2",
        label: "ch-ii",
        type: "jack",
        x: 19.36,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal for channel II. Any voltage, ≤16 poly channels, all drawn; an exact copy leaves OUT-II.",
        tip: "run signals through dioptra inline instead of multing copies.",
      },
      {
        id: "in-3",
        label: "ch-iii",
        type: "jack",
        x: 28.11,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal for channel III. Any voltage, ≤16 poly channels, all drawn; an exact copy leaves OUT-III.",
        tip: "run signals through dioptra inline instead of multing copies.",
      },
      {
        id: "in-4",
        label: "ch-iv",
        type: "jack",
        x: 36.87,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal for channel IV. Any voltage, ≤16 poly channels, all drawn; an exact copy leaves OUT-IV.",
        tip: "run signals through dioptra inline instead of multing copies.",
      },
      {
        id: "trig-in",
        label: "trig",
        type: "jack",
        x: 45.62,
        y: 89.29,
        size: 7,
        voltageRange: "any",
        description: "external trigger source. Patched, it replaces the internal source; sweeps start on its threshold crossings.",
        tip: "drive from the master clock to hold every voice against one downbeat.",
      },
      {
        id: "freeze-in",
        label: "freeze",
        type: "jack",
        x: 54.38,
        y: 89.29,
        size: 7,
        voltageRange: "gate",
        description: "holds trace and readouts at ≥1 V, same as the Freeze menu latch. Outputs keep passing signal while held.",
        tip: "gate here to freeze a transient mid-flight and measure at leisure.",
      },
      {
        id: "out-1",
        label: "out-i",
        type: "jack",
        x: 63.13,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-I, channel count included. No gain, filtering, or delay, dioptra sits anywhere.",
        tip: "place just before the output module: last seen is last heard.",
      },
      {
        id: "out-2",
        label: "out-ii",
        type: "jack",
        x: 71.89,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-II, channel count included. No gain, filtering, or delay, dioptra sits anywhere.",
        tip: "place just before the output module: last seen is last heard.",
      },
      {
        id: "out-3",
        label: "out-iii",
        type: "jack",
        x: 80.64,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-III, channel count included. No gain, filtering, or delay, dioptra sits anywhere.",
        tip: "place just before the output module: last seen is last heard.",
      },
      {
        id: "out-4",
        label: "out-iv",
        type: "jack",
        x: 89.4,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-IV, channel count included. No gain, filtering, or delay, dioptra sits anywhere.",
        tip: "place just before the output module: last seen is last heard.",
      },
    ],
    contextMenu: [
      {
        id: "readout",
        group: "readout",
        label: "readout",
        kind: "choice",
        values: ["Peak to peak", "Minimum", "Maximum", "Frequency", "RMS", "Volts / screen"],
        description: "Statistic on all four readouts. Panel buttons cover the first four; RMS and V/screen live only here."
      },
      {
        id: "trigger-edge",
        group: "trigger",
        label: "edge",
        kind: "choice",
        values: ["Rising", "Falling"],
        description: "Sweep edge: rising or falling threshold crossings. Also steers the frequency counters."
      },
      {
        id: "trigger-pre",
        group: "trigger",
        label: "pre-trigger",
        kind: "choice",
        values: ["Off", "25% of screen", "50% of screen"],
        description: "Fills the sweep front with pre-crossing history, shows what caused the event, not just what followed."
      },
      {
        id: "trigger-independent",
        group: "trigger",
        label: "each channel separately",
        kind: "toggle",
        description: "On (default): every lane triggers on its own input, so all traces stand still. Off: one shared sweep, bench-scope style."
      },
      {
        id: "trigger-source",
        group: "trigger",
        label: "shared source",
        kind: "choice",
        values: ["Channel 1", "Channel 2", "Channel 3", "Channel 4"],
        description: "The lane every sweep locks to when Each channel separately is off. Only harmonically related traces stand still."
      },
      {
        id: "trigger-arm",
        group: "trigger",
        label: "arm single sweep",
        kind: "toggle",
        description: "Arms one-shot capture in single mode: the next crossing draws one sweep and holds it."
      },
      {
        id: "channels-visible",
        group: "channels",
        label: "show trace",
        kind: "toggle",
        description: "Per-channel trace show/hide for 1–4. Clicking a readout does the same, faster."
      },
      {
        id: "channels-ac",
        group: "channels",
        label: "ac coupling",
        kind: "toggle",
        description: "Per-channel DC blockers for 1–4, zoom into ripple or hum on a large offset."
      },
      {
        id: "freeze",
        group: "freeze",
        label: "freeze",
        kind: "toggle",
        description: "Latches the display, like holding FREEZE high. Initialize always clears it."
      },
      {
        id: "cursors",
        group: "cursors",
        label: "cursors",
        kind: "toggle",
        description: "Two time and two voltage cursors; click the tube to grab the nearest, read the difference off-screen."
      },
      {
        id: "persistence",
        group: "persistence",
        label: "persistence",
        kind: "toggle",
        description: "Decaying afterglow behind the beam, repeated sweeps build where the trace spends time."
      },
      {
        id: "averaging",
        group: "averaging",
        label: "averaging",
        kind: "choice",
        values: ["Off", "2 sweeps", "4 sweeps", "8 sweeps", "16 sweeps"],
        description: "Combines consecutive sweeps to pull repeats from noise. Higher counts settle slower."
      },
      {
        id: "roll",
        group: "roll below 1 s/screen",
        label: "roll below 1 s/screen",
        kind: "toggle",
        description: "At ≥1 s/screen the display scrolls instead of sweeping, the readable way to watch slow signals."
      },
      {
        id: "math",
        group: "math trace",
        label: "math trace",
        kind: "choice",
        values: ["Off", "1 - 2", "1 + 2", "3 - 4", "3 + 4"],
        description: "A channel pair's sum or difference as an extra trace."
      },
      {
        id: "crackle",
        group: "beam crackle",
        label: "beam crackle",
        kind: "choice",
        values: ["Off", "Light", "Heavy"],
        description: "A tired tube's beam noise. Cosmetic, off by default, a scope being read shouldn't lie about trace position."
      },
      {
        id: "theme",
        group: "theme",
        label: "theme",
        kind: "choice",
        values: ["Follow global theme", "Phosphor", "Lunar", "Solar", "Amber"],
        description: "Shared Shapetaker theme, or fixed Phosphor, Lunar, Solar, Amber for this module."
      },
    ],
    manual: [
      {
        title: "four traces on one tube",
        body: "Dioptra draws ≤4 signals on a round green-phosphor CRT, each lane capturing a 256-point min/max envelope per sweep. Stepped gain and ±10 V position per channel, both display-only, plus four-digit readouts of p2p, min, max, frequency, RMS, or scale. MODE 1x2 & 3x4 trades time for two vector figures, I vs II and III vs IV, with triggering bypassed."
      },
      {
        title: "triggering",
        body: "Auto draws with or without crossings; Normal only on real crossings; Single holds until armed, then captures one sweep. THRESHOLD sets the −10 to +10 V level, TRIG replaces the internal source when patched, and the menu adds edge, 25%/50% pre-trigger, and a shared source. Each lane triggers on its own input by default; off gives one locked sweep."
      },
      {
        title: "readouts and measurement",
        body: "P2P/MIN/MAX/FREQ pick one statistic for all readouts, with RMS and V/screen in the menu; moving any gain knob briefly shows each lane's scale. Clicking a readout hides its trace; muted lanes read blank. Cursors measure face differences, averaging pulls repeats from noise, math traces sum/difference pairs, and THRESHOLD doubles as the counter crossing everywhere."
      },
      {
        title: "sitting inline",
        body: "Every input copies exactly to its output, sample and channel for channel, insert anywhere without changing sound. FREEZE holds the picture without stopping passthrough, slow timebases can roll, persistence afterglows the beam. Crackle and theme are cosmetic only."
      },
    ]
  },
  {
    slug: "entanglement",
    name: "entanglement",
    subtitle: "eight-operator fm oscillator in a mutating modulation constellation, hereditary algorithms, a morphing topology, stereo carriers",
    summary: "eight operators wired as a sparse modulation constellation that inherits, mutates and diverges: press mutate and the current descendant becomes the origin while a related one is generated, then entangle travels between the two through a genuine hybrid graph. eight lit faders edit ratio, level, contour, bias and detune per operator under the layer switch, and up to six polyphonic voices sound through saturated stereo carriers plus a ghost bus of the hidden modulators.",
    category: "vcv rack module",
    status: "eight-operator fm oscillator",
    accent: "#08c83a",
    accentSoft: "rgba(8, 200, 58, 0.2)",
    icon: AudioLines,
    hp: 22,
    panelImage: {
      src: "/modules/entanglement/panel-v3.webp",
      width: 1650,
      height: 1900,
      alt: "entanglement vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "pitch",
        label: "pitch",
        type: "knob",
        x: 16.0,
        y: 15.8,
        size: 12,
        description: [
          "coarse tunes ±3 octaves in snapped whole-octave steps; fine trims ±100 cents",
          "one concentric control, outer ring coarse, inner cap fine. Their sum offsets every voice's v/oct before the converter, clamped ±30 V",
        ],
        tip: "park coarse on an octave and tune with fine, the snap keeps layered takes honest.",
      },
      {
        id: "screen",
        label: "constellation screen",
        type: "meter",
        x: 50.0,
        y: 20.5,
        size: 43,
        description: [
          "eight operators as numbered chips matching the faders, with live modulation edges, the display follows the audio morph exactly",
          "edges arriving as entangle turns warm up, leaving ones cool down, the middle shows a graph genuinely partway between",
          "a corner ring marks self-feedback, brightening with amount: amber on phosphor/lunar, cyan on solar/amber",
          "the header names both endpoint algorithms with a morph-position bar; carriers glow brighter, halos follow activity",
        ],
        tip: "read the header before you mutate, it names the family you're leaving.",
      },
      {
        id: "tension",
        label: "tension",
        type: "knob",
        x: 84.0,
        y: 15.8,
        size: 12,
        description: [
          "global modulation index: near-pure carriers at bottom, vocal and electric mids, folded metallic spectra at top",
          "knob plus CV at 0.1/V, raised to the 1.45 power and scaled by evolve and affinity to ~5.3 radians max",
        ],
        tip: "back tension off before raising evolve, the index grows with both, and both maxed is deliberate chaos.",
      },
      {
        id: "layer",
        label: "layer",
        type: "switch",
        x: 16.0,
        y: 31.0,
        size: 8,
        description: [
          "which attribute the eight faders edit: ratio, level, contour, bias, detune, fresh modules open on level",
          "switching never moves a parameter: new caps travel from where old ones stood, fast double-flicks continue the motion",
        ],
        tip: "flick to ratio for tuning, back to level for balance, caps glide, sound never jumps.",
        diagrams: [
          { id: "layer-ratio", label: "ratio", rotation: -135 },
          { id: "layer-level", label: "level", rotation: -67.5 },
          { id: "layer-contour", label: "contour", rotation: 0 },
          { id: "layer-bias", label: "bias", rotation: 67.5 },
          { id: "layer-detune", label: "detune", rotation: 135 }
        ]
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 84.0,
        y: 31.0,
        size: 11,
        description: [
          "spreads carriers across stereo and adds complementary modulation-depth side signal, FM detail, not panning, with the mono centre strong",
          "pan follows carrier constellation placement × width; the side term grows with width², alternating polarity across carriers",
        ],
        tip: "at zero both sides carry the same centred mix, either jack for mono.",
      },
      {
        id: "symmetry",
        label: "symmetry",
        type: "knob",
        x: 10.6,
        y: 48.9,
        size: 12,
        description: [
          "favours integer and simple fractional ratios in each generation",
          "high draws from 0.5, 1, 2, 3, 4, 5, 6; low adds 1.5, 2.5, 3.5, 7 and widens random harmonic colour",
        ],
        tip: "for bells that track a scale, keep symmetry high and let mutation move the graph.",
      },
      {
        id: "affinity",
        label: "affinity",
        type: "knob",
        x: 28.5,
        y: 48.9,
        size: 12,
        description: [
          "favours deeper, more interconnected graphs when mutating, and raises how much those relationships are heard live",
          "higher attaches strays deeper, adds ≤3 cross-links, allows feedback on ≤4 operators, scales live index 0.82–1.05",
        ],
        tip: "raise affinity before a mutate when the graph feels thin, the child comes back denser.",
      },
      {
        id: "entangle",
        label: "entangle",
        type: "knob",
        x: 50.0,
        y: 48.9,
        size: 14,
        description: [
          "travels A to B by morphing the topology itself, edges, feedback, carrier roles, power, stereo placement, while two ratio-locked banks crossfade underneath",
          "both ends harmonic; the middle is a genuine hybrid graph, not an output crossfade",
          "CV and menu orbit add to the knob before a 4 ms slew; the collar lights with the sum",
        ],
        tip: "park at an end after mutating: the origin sits exactly there, the descendant waiting at the other end.",
      },
      {
        id: "mutation",
        label: "mutation",
        type: "knob",
        x: 71.5,
        y: 48.9,
        size: 12,
        description: [
          "how far the next generation strays from its parent",
          "near zero keeps algorithm, ratios, edges, roles, feedback; turned up, each re-rolls and the child can cross into another of the 32 structures",
        ],
        tip: "low mutation with repeated presses walks a family outward; high re-deals every press.",
      },
      {
        id: "evolve",
        label: "evolve",
        type: "knob",
        x: 89.4,
        y: 48.9,
        size: 12,
        description: [
          "adds harmonic colour and lengthens spectral contours",
          "attack stretches 4→50 ms, lifetimes 25 ms→1.75 s, modulator sustain rises, gated low is struck transients, high blooms and sustains",
        ],
        tip: "unpatched gate drones with contours still, patch a gate to hear evolve move.",
      },
      {
        id: "mutate",
        label: "mutate",
        type: "switch",
        x: 9.7,
        y: 65.3,
        size: 8,
        description: [
          "grows the next constellation from the current entangle position: a 12 ms journey to the descendant, promoted to origin while a related child grows and travel aims the origin at the knob's nearest end",
          "every press yields one generation; mid-transition triggers queue one more",
          "the key lip flashes on press while the screen marker travels out and back",
        ],
        tip: "sequence the mutate jack and sweep entangle between hits, each generation gets a performance.",
      },
      { id: "fader-1", label: "operator 1", type: "knob", x: 20.3, y: 74.0, size: 8, description: ["operator 1, the invariant root carrier, always audible at ×1 and centre, for the showing layer: ratio ×0.5–×2, level, contour, bias toward 2nd/3rd/5th, detune ±25 cents.", "edits apply to both banks, so identity holds while topology mutates."], tip: "balance against operator 1 first, the root everything hangs from." },
      { id: "fader-2", label: "operator 2", type: "knob", x: 30.0, y: 74.0, size: 8, description: "operator 2 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "in ratio layer, ×0.5 here against ×1 elsewhere drops an octave without touching pitch." },
      { id: "fader-3", label: "operator 3", type: "knob", x: 39.7, y: 74.0, size: 8, description: "operator 3 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "pull level on a harsh modulator, not a carrier, the screen shows which is which." },
      { id: "fader-4", label: "operator 4", type: "knob", x: 49.4, y: 74.0, size: 8, description: "operator 4 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "long contour on one operator, short on the rest, bloom staged across the attack." },
      { id: "fader-5", label: "operator 5", type: "knob", x: 59.1, y: 74.0, size: 8, description: "operator 5 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "bias up on carriers, down on modulators, colour voices strongest where heard." },
      { id: "fader-6", label: "operator 6", type: "knob", x: 68.8, y: 74.0, size: 8, description: "operator 6 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "detune in small opposing pairs for beating and stereo life; zero is exactly harmonic." },
      { id: "fader-7", label: "operator 7", type: "knob", x: 78.5, y: 74.0, size: 8, description: "operator 7 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "ghost carries what carriers hide, solo it while setting modulator levels." },
      { id: "fader-8", label: "operator 8", type: "knob", x: 88.2, y: 74.0, size: 8, description: "operator 8 for the layer in force, ratio (×0.5–×2, seven steps), level, contour, bias, detune (±25 cents), both banks.", tip: "set all eight in level first, then work one layer at a time, caps travel, nothing jumps." },
      { id: "voct", label: "v/oct", type: "jack", x: 10.0, y: 81.1, size: 8, voltageRange: "1V/oct · poly ≤6", description: "pitch, 1 V/oct, ≤6 voices, count follows the wider of v/oct and gate. Coarse/fine offset before the converter; pitches clamp ±30 V.", tip: "a poly cable here with a mono gate still voices every channel." },
      { id: "gate", label: "gate in", type: "jack", x: 10.0, y: 93.2, size: 8, voltageRange: "gate · poly ≤6", description: "note gate: >1 V gated, articulation follows evolve, struck transients low, bloom and sustain high. Unpatched drones with contours still.", tip: "for freer drones, also turn off reset phases on gate." },
      { id: "entangle-cv", label: "entangle cv", type: "jack", x: 21.5, y: 93.2, size: 8, voltageRange: "±10 V", description: "modulates entangle at 0.1/V, +10 V sweeps full A-to-B. Adds to knob and orbit before the 4 ms slew; collar lights with the result.", tip: "slow triangle plus centred knob plays both constellations in turn." },
      { id: "tension-cv", label: "tension cv", type: "jack", x: 33.3, y: 93.2, size: 8, voltageRange: "±10 V", description: "modulates tension at 0.1/V, clamped to knob range; collar shows the sum.", tip: "an envelope here turns static chords into struck fm brass." },
      { id: "width-cv", label: "width cv", type: "jack", x: 45.2, y: 93.2, size: 8, voltageRange: "±10 V", description: "modulates width at 0.1/V, clamped and collar-lit like the other morph controls.", tip: "open the image only on accents, narrow verses, wide hits." },
      { id: "mutate-trig", label: "mutate trig", type: "jack", x: 57.0, y: 93.2, size: 8, voltageRange: "trigger", description: "fires mutation like the panel key. Mid-transition triggers queue one more generation rather than interrupting.", tip: "trigger from a divided clock so the graph evolves one generation per bar." },
      { id: "ghost", label: "ghost", type: "jack", x: 68.5, y: 93.2, size: 8, voltageRange: "±5 V · poly ≤6", description: "the normally inaudible modulators at reduced weight, the graph's hidden machinery, tracking voice count like the main pair.", tip: "run ghost through a lowpass in parallel, the modulators make a shadow voice." },
      { id: "left-out", label: "left out", type: "jack", x: 79.7, y: 93.2, size: 8, voltageRange: "±5 V · poly ≤6", description: "left of the saturated stereo carrier mix, tanh, sinc-decimated, dc-blocked, engraved + on the panel. Tracks v/oct/gate count to six voices.", tip: "at width 0 this matches the right's centred mix, either for mono." },
      { id: "right-out", label: "right out", type: "jack", x: 90.9, y: 93.2, size: 8, voltageRange: "±5 V · poly ≤6", description: "right of the saturated stereo carrier mix, engraved −. Same processing and count as left.", tip: "width's modulation-depth side signal lives between the jacks, audition on headphones." },
    ],
    contextMenu: [
      {
        id: "theme",
        group: "theme",
        label: "theme",
        kind: "choice",
        values: ["follow global theme", "phosphor", "lunar", "solar", "amber"],
        description: "Follow the global theme, or pick Phosphor, Lunar, Solar, Amber for this module. Feedback rings follow: amber on Phosphor/Lunar, cyan on Solar/Amber."
      },
      {
        id: "reset-phases",
        group: "reset phases on gate",
        label: "reset phases on gate",
        kind: "toggle",
        description: "On: struck and sequenced sounds keep dependable attacks, rapid retriggers still preserve phase while releases ring, so no clicks. Off: freer drones."
      },
      {
        id: "algorithm",
        group: "algorithm",
        label: "algorithm",
        kind: "choice",
        values: ["tower", "branch", "choir", "pairs", "crown", "web", "spires", "vortex", "prism", "cross", "gravity", "labyrinth", "cascade", "fork", "trident", "quads", "pendulum", "halo", "anvil", "chime", "hive", "mirror", "stairs", "delta", "orbit", "furnace", "loom", "hydra", "cathedral", "relay", "fracture", "nexus"],
        description: "Pins both banks to one of the 32 structures, sounding wherever ENTANGLE parks. MUTATE still works, replacing bank B with a fresh descendant."
      },
      {
        id: "orbit-rate",
        group: "orbit",
        label: "orbit rate",
        kind: "choice",
        values: ["off", "glacial (100 s)", "slow (40 s)", "drift (17 s)", "breathe (7 s)"],
        description: "Slow built-in ENTANGLE drift so patches move alone. Rate sets one sweep's duration. Off by default; saved with patch and presets; Initialize clears."
      },
      {
        id: "orbit-depth",
        group: "orbit",
        label: "orbit depth",
        kind: "choice",
        values: ["subtle", "wide", "full"],
        description: "Orbit travel around the knob: ±0.15, ±0.30, ±0.50. Full sweeps the whole range with the knob centred."
      },
      {
        id: "orbit-shape",
        group: "orbit",
        label: "orbit shape",
        kind: "choice",
        values: ["sine", "wander"],
        description: "Sine repeats exactly; Wander adds a second sine at the golden ratio so the path never repeats. Adds to ENTANGLE CV; collar lights with the sweep."
      },
      {
        id: "oversampling",
        group: "oversampling",
        label: "oversampling",
        kind: "choice",
        values: ["1x (economy)", "2x", "4x (default, reference)", "8x (maximum)"],
        description: "4x default and reference voicing, not purely quality, since self-feedback delays one oversampled sample and voices differently per factor. 8x is where the index ceiling never engages at 44.1/48 kHz, at ~2× the cost of 4x."
      }
    ],
    manual: [
      {
        title: "two constellations, one voice",
        body: "Entanglement is an eight-operator FM oscillator whose algorithm is a living structure. A and B descend from 32 curated structures, and ENTANGLE morphs the topology between them, edges, feedback, carrier roles, power, stereo placement, over two ratio-locked banks crossfading underneath. Both ends harmonic, the middle a genuine hybrid graph, never an output crossfade; the screen tracks the morph exactly."
      },
      {
        title: "playing the panel",
        body: "Patch V/oct and gate, take LEFT/RIGHT, raise TENSION to hear operators modulate harder, then MUTATE and sweep ENTANGLE end to end. Unpatched gate drones with contours still; gated, low EVOLVE strikes transients and high blooms and sustains. WIDTH spreads carriers with the centre strong; GHOST offers hidden modulators for filtering or feedback."
      },
      {
        title: "layers and operators",
        body: "Eight lit faders edit one attribute constellation-wide; LAYER picks it: RATIO ×0.5–×2, LEVEL, CONTOUR, BIAS toward 2nd/3rd/5th, DETUNE ±25 cents. Edits hit both banks, so identity holds while topology mutates. Operator 1 is the invariant root carrier; screen chips match the faders."
      },
      {
        title: "mutation and generations",
        body: "MUTATE finishes a 12 ms journey to the current descendant, promotes it to origin, grows a related child, and aims the origin at the knob's nearest end, every press one generation. MUTATION sets inheritance, near-clone to new structure; AFFINITY favours deeper graphs; SYMMETRY favours simple ratios. Every descendant is checked so all operators keep a path to a carrier; mutation, direction, and both constellations save with the patch."
      },
      {
        title: "character and voicing",
        body: "Onset guards bloom complex graphs into sidebands instead of firing full-index spikes, and retriggers keep phases running so eight-operator feedback can't click. Subsampled feedback, harmonic-aware rolloff, high-ratio damping, topology-aware normalization, saturation, sinc decimation, DC blocking keep dense networks smooth, with colour voiced strongest on carriers. 4x oversampling is the reference; feedback-carrying algorithms voice slightly differently per factor."
      },
      {
        title: "voices, outputs and presets",
        body: "≤6 polyphonic voices follow the wider of V/oct and GATE; all outputs track that count. LEFT/RIGHT carry the saturated ±5 V stereo mix; GHOST carries modulators at reduced weight. 25 factory instruments across Keys/Pads/Bass/Leads/Percussion cover all 32 structures, each storing both algorithms and all 51 parameters, loading never inherits from the previous patch."
      }
    ]
  },
  {
    slug: "figura",
    name: "figura",
    subtitle: "stereo polyphonic morphing filter, eight 14-pole filters at the corners of a cube, three knobs to move through it",
    summary: "A z-plane filter in the E-mu Morpheus lineage: each corner of the cube holds a 14-pole filter able to carry a vowel, an instrument body or a cluster of notches, and MORPH, FREQ and TRANSFORM blend between the eight corners from anywhere inside. Eight cubes cover vowels, bodies, notches, harmonics, bells, breath, earth and fire, with a sand-plate display that draws the filter you are hearing.",
    category: "vcv rack module",
    status: "morphing filter",
    accent: "#c9a86a",
    accentSoft: "rgba(201, 168, 106, 0.2)",
    icon: Filter,
    hp: 18,
    panelImage: {
      src: "/modules/figura/panel-v3.webp",
      width: 1350,
      height: 1900,
      alt: "figura vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "plate",
        label: "chladni plate",
        type: "meter",
        x: 50.0,
        y: 23.4,
        size: 40,
        description: [
          "a brass plate dusted with sand, after Chladni's 1787 experiment: each resonance vibrates its own pattern, and sand gathers on the still lines, drawing the filter you hear",
          "only peaks above the input level move the sand, notches and flat sections leave it alone; the sand drifts into each new figure as you move",
          "shows the first voice's left filter at ~60 Hz. Lit like the panel, so it dims with Rack's room lights",
        ],
        tip: "sweep MORPH slowly and watch the figure redraw, each cube has its own family of shapes.",
      },
      {
        id: "cube",
        label: "cube",
        type: "knob",
        x: 12.7,
        y: 14.4,
        size: 13,
        description: [
          "one of eight cubes, each eight 14-pole filters: Vox (vowels), Corpus (bodies), Phasma (notches), Harmonia (harmonics), Metallum (bell–gong), Aether (breath–whistle), Terra (thump–body), Ignis (talking formants)",
          "stepped selector, one stop per cube; patches keep position. The context menu lists all eight with MORPH's action in each",
        ],
        tip: "start on Vox and turn MORPH to melt AH into OO before exploring.",
      },
      {
        id: "stereo",
        label: "stereo",
        type: "knob",
        x: 87.3,
        y: 14.4,
        size: 13,
        description: [
          "moves the left filter down the MORPH axis and the right one up, ≤15% either way, mono in becomes two related filters, widening as you turn up",
          "near MORPH's ends the pair slides back inside the cube instead of clipping, so spread survives at the extremes",
        ],
        tip: "feed a mono saw and turn STEREO up, the sides diverge into related vowels.",
      },
      {
        id: "drive",
        label: "drive",
        type: "knob",
        x: 12.7,
        y: 32.3,
        size: 13,
        description: [
          "saturates the input before the filter. At 0 the path is exactly linear; turning up raises quiet signals, rounds loud ones, adds even-harmonic warmth, holding loudness steady at normal ±5 V, what you hear is colour changing",
          "very hot inputs still come out quieter driven, quiet ones louder. A 5 Hz tracker removes only the DC saturation adds; the input's own offset passes as at 0",
        ],
        tip: "drive a quiet pluck hard, louder, rounder, warmer, without touching the mixer.",
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 87.3,
        y: 32.3,
        size: 13,
        description: [
          "dry/wet blend: 0 is input untouched, 100% filter only",
          "linear crossfade smoothed per sample, sweeping never zips",
        ],
        tip: "back to 30% to keep a drum's attack while the filter colours the tail.",
      },
      {
        id: "morph",
        label: "morph",
        type: "knob",
        x: 13.3,
        y: 46.0,
        size: 13,
        description: [
          "the cube's first axis, AH to OO on Vox, guitar to cello on Corpus, bell to gong on Metallum, morphing timbre between corner filters",
          "the tooltip names the corners you're between. The collar lights with CV position; knob moves glide ~10 ms so they never click",
        ],
        tip: "patch a slow envelope into MORPH CV and set the knob to the note's starting vowel.",
      },
      {
        id: "freq",
        label: "freq",
        type: "knob",
        x: 37.6,
        y: 46.0,
        size: 13,
        description: [
          "the second axis, sliding the whole filter up while keeping shape, by a cube-suited amount: half an octave on Vox, four octaves on Terra",
          "tooltip and collar as on MORPH. Sections pushed above 45% of sample rate by PITCH/V/OCT stop there",
        ],
        tip: "on Harmonia, FREQ glides the harmonic ladder upward, track with an envelope for rising shimmer.",
      },
      {
        id: "transform",
        label: "transform",
        type: "knob",
        x: 63.3,
        y: 46.0,
        size: 13,
        description: [
          "the third axis, changing filter character: open to nasal, wood to metal, soft to sharp, struck to bowed",
          "tooltip and collar as on MORPH",
        ],
        tip: "hold MORPH and FREQ still and sweep TRANSFORM alone to learn a cube's third dimension.",
      },
      {
        id: "emphasis",
        label: "emphasis",
        type: "knob",
        x: 86.1,
        y: 46.0,
        size: 13,
        description: [
          "sharpens or softens every resonance at once. Centre is the cube as designed; full right 4× as sharp, full left ¼ as sharp; tooltip shows the factor",
          "changes peak sharpness, not cube loudness. Collar lights like the axis knobs",
        ],
        tip: "EMPHASIS full right on Metallum rings the bell partials at their longest.",
      },
      {
        id: "pitch",
        label: "pitch",
        type: "knob",
        x: 50.0,
        y: 69.7,
        size: 16,
        description: [
          "ribbed thumbwheel above V/OCT: roll up to shift every filter section together, ±4 octaves",
          "V/OCT adds at exactly 1 octave/V for keyboard tracking; the sum clamps to ±12 octaves",
        ],
        tip: "mult sequence pitch to V/OCT and roll PITCH until a Harmonia peak sits on the root.",
      },
      {
        id: "morph-att",
        label: "morph cv amount",
        type: "knob",
        x: 12.7,
        y: 64.4,
        size: 10,
        description: "scales MORPH CV, inverting left of centre. Full: 10 V covers the axis, 10% per volt.",
        tip: "full right with ±5 V sweeps the entire axis edge to edge.",
      },
      {
        id: "freq-att",
        label: "freq cv amount",
        type: "knob",
        x: 32.1,
        y: 64.4,
        size: 10,
        description: "scales FREQ CV, inverting left of centre. Full: 10 V covers the axis, 10% per volt.",
        tip: "a little filtered noise here keeps a static vowel slowly drifting.",
      },
      {
        id: "transform-att",
        label: "transform cv amount",
        type: "knob",
        x: 67.9,
        y: 64.4,
        size: 10,
        description: "scales TRANSFORM CV, inverting left of centre. Full: 10 V covers the axis, 10% per volt.",
        tip: "invert a decay envelope here so a struck sound bows as it dies.",
      },
      {
        id: "emphasis-att",
        label: "emphasis cv amount",
        type: "knob",
        x: 87.3,
        y: 64.4,
        size: 10,
        description: "scales EMPHASIS CV, inverting left of centre. EMPHASIS spans twice an axis, so CV moves it twice as far per volt; 10 V still covers the control.",
        tip: "patch velocity here so harder notes ring sharper.",
      },
      {
        id: "morph-cv",
        label: "morph cv",
        type: "jack",
        x: 12.7,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full axis · poly ≤16",
        description: "adds to MORPH through its amount knob, 10% of axis per volt at full. Polyphonic per voice, unsmoothed, modulation stays as fast as patched.",
        tip: "mult one envelope to all three axis CVs at different amounts for one gesture crossing the cube diagonally.",
      },
      {
        id: "freq-cv",
        label: "freq cv",
        type: "jack",
        x: 32.1,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full axis · poly ≤16",
        description: "adds to FREQ through its amount knob, 10% of axis per volt at full. Polyphonic and unsmoothed like the other axis CVs.",
        tip: "audio-rate FM at low amount gives sidebands that keep the cube's shape.",
      },
      {
        id: "transform-cv",
        label: "transform cv",
        type: "jack",
        x: 67.9,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full axis · poly ≤16",
        description: "adds to TRANSFORM through its amount knob, 10% of axis per volt at full. Polyphonic and unsmoothed like the other axis CVs.",
        tip: "drive with random on Corpus to wander between wood and steel.",
      },
      {
        id: "emphasis-cv",
        label: "emphasis cv",
        type: "jack",
        x: 87.3,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full control · poly ≤16",
        description: "adds to EMPHASIS through its amount knob. Twice the axis span means twice the travel per volt; 10 V covers the control at full. Polyphonic, unsmoothed.",
        tip: "a slow LFO breathes every resonance sharper and softer together.",
      },
      {
        id: "in-l",
        label: "in l",
        type: "jack",
        x: 12.7,
        y: 89.1,
        size: 9,
        voltageRange: "any · poly ≤16",
        description: "left audio input, polyphonic ≤16. Feeds both sides until IN R is patched.",
        tip: "mono in under polyphonic V/OCT filters once per voice at each pitch, one sound becomes a chord of formants.",
      },
      {
        id: "in-r",
        label: "in r",
        type: "jack",
        x: 31.3,
        y: 89.1,
        size: 9,
        voltageRange: "any · poly ≤16",
        description: "right audio input, polyphonic ≤16. Unpatched takes IN L; bypass keeps that behaviour.",
        tip: "patch both sides for true stereo, STEREO then spreads two different signals.",
      },
      {
        id: "voct",
        label: "v/oct",
        type: "jack",
        x: 50.0,
        y: 89.1,
        size: 9,
        voltageRange: "1V/OCT · poly ≤16",
        description: "filter pitch at exactly 1 octave/V, added to the PITCH wheel. Polyphonic per voice, unsmoothed so pitch stays immediate.",
        tip: "sequence a fifth above oscillator pitch to park a formant on the harmony.",
      },
      {
        id: "out-l",
        label: "out l",
        type: "jack",
        x: 68.7,
        y: 89.1,
        size: 9,
        voltageRange: "≤11.7V peak · poly ≤16",
        description: "filtered left signal, polyphonic. Exactly linear to 8 V, then soft limiting, never past 11.7 V.",
        tip: "Metallum and Harmonia touch the limiter at their hottest, that edge is part of their sound.",
      },
      {
        id: "out-r",
        label: "out r",
        type: "jack",
        x: 87.3,
        y: 89.1,
        size: 9,
        voltageRange: "≤11.7V peak · poly ≤16",
        description: "filtered right signal, polyphonic, through the same 8 V soft limiter.",
        tip: "with STEREO up and mono in, compare outputs to hear how far the pair moved.",
      },
    ],
    contextMenu: [
      {
        id: "cube-select",
        group: "cube",
        label: "cube select",
        kind: "choice",
        values: ["Vox: AH to OO", "Corpus: guitar to cello", "Phasma: 2 notches to 6 notches", "Harmonia: odd to even", "Metallum: bell to gong", "Aether: breath to whistle", "Terra: thump to body", "Ignis: ooh to aah"],
        description: "All eight cubes by name with MORPH's action in each, e.g. Vox: AH to OO. Choosing moves the CUBE selector."
      }
    ],
    manual: [
      {
        title: "the cube",
        body: "Each cube holds eight 14-pole filters at its corners; MORPH, FREQ, TRANSFORM are its three axes, anywhere inside blends the corners smoothly. Vox moves AH–OO, man's-to-child's voice, open-to-nasal; the other cubes apply the same axes to bodies, notches, harmonics, bells, breath, earth, fire. Every section keeps its role at every corner, so morphs crossfade each formant with its counterpart rather than sweeping parts in from nowhere."
      },
      {
        title: "pitch and tone",
        body: "PITCH shifts every section together ±4 octaves; V/OCT adds at 1 octave/V for keyboard tracking. EMPHASIS scales all resonances, 4× full right, ¼× full left, as designed at centre, sharpness without loudness change. DRIVE saturates pre-filter with even-harmonic colour at steady loudness, STEREO splits the sides ≤15% along MORPH, MIX crossfades dry to filtered."
      },
      {
        title: "modulation",
        body: "MORPH, FREQ, TRANSFORM, EMPHASIS each take CV through an attenuverter beneath: right scales, left of centre inverts, full means 10 V covers the control. Collars light with CV position. Knobs glide ~10 ms so they never click; CVs and V/OCT stay unsmoothed, as fast as patched."
      },
      {
        title: "the plate",
        body: "The display is a brass plate dusted with sand: resonances vibrate their own patterns and sand gathers on the still lines, drawing the filter you hear. Only above-input peaks move the sand, notches leave it alone, and it drifts into each new figure as you move. First voice's left filter; dims with Rack's room lights."
      },
      {
        title: "voices and levels",
        body: "Voices follow the widest of IN L, IN R, V/OCT, ≤16; CV inputs are polyphonic too, so each voice can sit at its own cube point. Cubes match loudness on noise within a couple dB except Metallum (4–8 dB lower) and Harmonia (≤6.5 dB) so tall peaks mostly avoid the limiter, though on harmonic sources like saw chords, level still moves with the sweep (≤~14 dB in the widest cube) as narrow peaks land on or between harmonics. Output soft-limits past 8 V, never past 11.7 V; bypass passes dry with IN R falling back to IN L; sections above 45% of sample rate stop there."
      }
    ]
  },
  {
    slug: "legion",
    name: "legion",
    subtitle: "seven-saw super saw that drifts, tears and locks, synchroscope display, stereo spread",
    summary: "seven saws per voice on a measured, uneven detune curve whose beating never repeats, pulled apart by drift and feedback or pulled together by coupling. the synchroscope shows poly channel 0 falling in and out of step in slow motion. with drift, coupling and feedback at zero it is a plain late-90s super saw and nothing else.",
    category: "vcv rack module",
    status: "seven-saw oscillator",
    accent: "#b09a68",
    accentSoft: "rgba(176, 154, 104, 0.2)",
    icon: Waves,
    hp: 16,
    panelImage: {
      src: "/modules/legion/panel-v3.webp",
      width: 1200,
      height: 1900,
      alt: "legion vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "synchroscope",
        label: "synchroscope",
        type: "meter",
        x: 50.0,
        y: 20.8,
        size: 38,
        description: [
          "poly channel 0 shown like a power station bringing a generator into step. The hub is the centre saw, glowing brighter as mix turns toward it; three rings hold the other six as flat-and-sharp pairs, inner least detuned, outer most",
          "twelve o'clock is in step. Clockwise (fast) is sharp, counter-clockwise (slow) is flat. Motion runs in slow motion until the fastest saw takes ≥2 s per lap, rings keep relative speeds, and locking saws stop the moment they lock",
          "a bright still dot is locked, a comet tail is slipping; feedback shows as the beam losing focus, since it bends every saw equally",
        ],
        tip: "turn coupling slowly clockwise and watch the rings collapse: inner three, then five, then all seven.",
      },
      {
        id: "freq",
        label: "freq",
        type: "knob",
        x: 15.6,
        y: 13.0,
        size: 14,
        description: "oscillator tuning ±4 octaves around middle C, added to v/oct. Hold ctrl (cmd on mac) for fine.",
        tip: "leave centred and drive pitch from v/oct so patches transpose cleanly.",
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 84.4,
        y: 13.0,
        size: 14,
        description: "0 is mono. Turning up pans the side saws out in pairs, each side gets flat and sharp saws.",
        tip: "full width with high mix is legion's widest image, narrow before stacking voices.",
      },
      {
        id: "detune",
        label: "detune",
        type: "knob",
        x: 15.6,
        y: 30.8,
        size: 14,
        description: [
          "spreads the seven saws on a slow-then-steep curve: the first three quarters reach ~46 cents either side for the outer saws, the last quarter runs to ~2 semitones. Tooltip reads cents",
          "a measured uneven curve, so beating never repeats",
        ],
        tip: "past halfway is the classic late-90s sound.",
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 84.4,
        y: 30.8,
        size: 14,
        description: "the six side saws against the centre saw, shown in dB, at constant overall loudness.",
        tip: "pull toward centre to hear coupling without the wash.",
      },
      {
        id: "drift",
        label: "drift",
        type: "knob",
        x: 15.6,
        y: 46.0,
        size: 14,
        description: "each saw's pitch wanders independently. Low is old-analog drift; high runs faster and wider to ~60 cents, a swarm. Tooltip reads depth with wander rate.",
        tip: "raise against half-locked coupling to find where they fight.",
      },
      {
        id: "coupling",
        label: "coupling",
        type: "knob",
        x: 50.0,
        y: 45.5,
        size: 14,
        description: [
          "the saws pull on each other's timing. Centre runs free; clockwise gathers, first nothing, then inner three lock, then five, then all seven into one steady saw. Just past the inner-three lock is the most unstable zone, where groups lock and break",
          "counter-clockwise pushes apart, thinning and hollowing the sound. Lock points sit at the same positions at every pitch and detune; the lock takes a moment, longer at small detune, while saws drift into place",
        ],
        tip: "sweep very slowly through the first lock and listen to the beating tear.",
      },
      {
        id: "feedback",
        label: "feedback",
        type: "knob",
        x: 84.4,
        y: 46.0,
        size: 14,
        description: "output bends saw pitch through a note-following lowpass. To ~60% it roughens and thickens; past that pitch wobbles, and full is rough and unstable, growl, not hiss. The wobble stays centred on the note, and behaviour matches at every sample rate.",
        tip: "push past 60% on a low note and let a slow filter sweep talk.",
      },
      {
        id: "drift-trim",
        label: "drift trim",
        type: "knob",
        x: 11.9,
        y: 69.0,
        size: 12,
        description: "scales DRIFT CV, −100% to +100%. Full: 10 V sweeps drift end to end.",
        tip: "flip negative to calm the swarm from an envelope.",
      },
      {
        id: "detune-trim",
        label: "detune trim",
        type: "knob",
        x: 30.9,
        y: 69.0,
        size: 12,
        description: "scales DETUNE CV, −100% to +100%. Full: 10 V sweeps detune end to end.",
        tip: "a little positive velocity widens loud notes, leaves soft ones narrow.",
      },
      {
        id: "coupling-trim",
        label: "coupling trim",
        type: "knob",
        x: 50.0,
        y: 69.0,
        size: 12,
        description: "scales COUPLING CV, −100% to +100%. Coupling runs −100% to +100%, so CV reads 0.2/V and ±5 V sweeps end to end from centre.",
        tip: "park just below the first lock and let a slow lfo push over the edge.",
      },
      {
        id: "mix-trim",
        label: "mix trim",
        type: "knob",
        x: 69.1,
        y: 69.0,
        size: 12,
        description: "scales MIX CV, −100% to +100%. Full: 10 V sweeps mix end to end.",
        tip: "fade side saws against a steady centre for movement without level jumps.",
      },
      {
        id: "feedback-trim",
        label: "feedback trim",
        type: "knob",
        x: 88.1,
        y: 69.0,
        size: 12,
        description: "scales FEEDBACK CV, −100% to +100%. Full: 10 V sweeps feedback end to end.",
        tip: "ping with a decaying envelope so notes start rough and settle.",
      },
      {
        id: "drift-cv",
        label: "drift cv",
        type: "jack",
        x: 11.9,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "DRIFT CV: 10 V sweeps the control, scaled by the trim. Legion voices the widest cable into any input, ≤16, each with its own seven saws.",
        tip: "slow random here keeps the swarm moving without touching the knob.",
      },
      {
        id: "detune-cv",
        label: "detune cv",
        type: "jack",
        x: 30.9,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "DETUNE CV: 10 V sweeps the control, scaled by the trim.",
        tip: "breathe the width with a slow lfo under a sequence.",
      },
      {
        id: "coupling-cv",
        label: "coupling cv",
        type: "jack",
        x: 50.0,
        y: 79.7,
        size: 10,
        voltageRange: "±5V full sweep",
        description: "COUPLING CV at 0.2/V, scaled by the trim, coupling runs −100% to +100%. ±5 V sweeps end to end from centre.",
        tip: "sweep lock points with a triangle lfo for repeating tear-and-mend.",
      },
      {
        id: "mix-cv",
        label: "mix cv",
        type: "jack",
        x: 69.1,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "MIX CV: 10 V sweeps the control, scaled by the trim.",
        tip: "drive from in-step through a spare vca for a self-tightening patch.",
      },
      {
        id: "feedback-cv",
        label: "feedback cv",
        type: "jack",
        x: 88.1,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "FEEDBACK CV: 10 V sweeps the control, scaled by the trim.",
        tip: "audio-rate modulation turns the growl metallic.",
      },
      {
        id: "voct",
        label: "v/oct",
        type: "jack",
        x: 11.9,
        y: 89.1,
        size: 10,
        voltageRange: "1V/OCT",
        description: "1 V/oct pitch, added to freq. Polyphonic: voice count follows the widest cable, ≤16.",
        tip: "mult the same v/oct to the filter cutoff so it tracks the note.",
      },
      {
        id: "scatter",
        label: "scatter",
        type: "jack",
        x: 27.1,
        y: 89.1,
        size: 10,
        voltageRange: "trigger",
        description: "a trigger jumps all seven saws to new random phases with a click-free crossfade. Fires past 1 V, re-arms below 0.1 V, an lfo fires once per cycle on the way up; audio-rate triggers work. The menu can zero phases instead, for hard sync with a hard edge.",
        tip: "hit with a divided clock to re-scatter every bar.",
      },
      {
        id: "lock",
        label: "lock",
        type: "jack",
        x: 42.4,
        y: 89.1,
        size: 10,
        voltageRange: "gate",
        description: "a gate: while high, all seven saws snap into one whatever coupling says, holding against drift. Release and they drift apart at their own pace. Level stays steady through snap and release.",
        tip: "gate rhythmically against heavy drift for snap-and-bloom phrases.",
      },
      {
        id: "in-step",
        label: "in-step",
        type: "jack",
        x: 57.6,
        y: 89.1,
        size: 10,
        voltageRange: "0-10V",
        description: "saw alignment, 0 V spread to 10 V aligned. Free-running saws wander ~3–4 V as they beat; a lock reads near 10 V.",
        tip: "patch to a filter cutoff and it opens as the saws gather.",
      },
      {
        id: "left-out",
        label: "left (+)",
        type: "jack",
        x: 72.9,
        y: 89.1,
        size: 10,
        voltageRange: "±10V peaks",
        description: "left stereo audio, engraved + on the panel. The plain super saw sits near ±5 V; aligned peaks can reach ±10 V, softly bent into ±12 V.",
        tip: "run into a resonant lowpass, saws through a resonant filter is what legion is built for.",
      },
      {
        id: "right-out",
        label: "right (-)",
        type: "jack",
        x: 88.1,
        y: 89.1,
        size: 10,
        voltageRange: "±10V peaks",
        description: "right stereo audio, engraved −. Same levels as left: ~±5 V with aligned peaks bent into ±12 V.",
        tip: "take both outs even in narrow patches, width still moves between them.",
      },
    ],
    contextMenu: [
      {
        id: "highpass",
        group: "filter",
        label: "highpass at the played pitch",
        kind: "toggle",
        description: "On: gentle note-following highpass, as on the original. It thins the low end."
      },
      {
        id: "scatter-resets-to",
        group: "scatter",
        label: "scatter resets to",
        kind: "choice",
        values: ["random phases", "aligned (hard sync)"],
        description: "SCATTER behaviour: fresh random phases with a click-free crossfade (default), or zeroed phases for hard sync with a hard edge."
      },
      {
        id: "display-theme",
        group: "display theme",
        label: "display theme",
        kind: "choice",
        values: ["follow shapetaker theme", "phosphor", "lunar", "solar", "amber"],
        description: "Synchroscope tube color. Follow the shared theme or set a local color."
      }
    ],
    manual: [
      {
        title: "seven saws",
        body: "Legion starts as a faithful late-90s super saw: seven saws per voice on a measured uneven detune curve that never repeats its beating. DETUNE is slow-then-steep, MIX sets side saws against the centre at constant loudness, WIDTH pans the sides out in pairs from mono. Output sits near ±5 V with aligned peaks bent into ±12 V; a gentle highpass follows the note unless switched off."
      },
      {
        title: "chaos and lock",
        body: "Three controls pull the saws apart or together. DRIFT wanders each saw to ~60 cents, from analog wobble to swarm. COUPLING gathers clockwise through staged locks, inner three, five, all seven, with the most unstable zone just past the first lock, and pushes apart counter-clockwise. FEEDBACK bends pitch through a note-following lowpass, roughening to ~60% before wobbling into a centred growl. Locks take a moment, longer at small detune; with all three at zero Legion is a plain super saw."
      },
      {
        title: "reading the screen",
        body: "The synchroscope shows poly channel 0 like a power-station meter: hub is the centre saw, three rings hold flat-and-sharp pairs least to most detuned, twelve o'clock is in step. Motion slows until the fastest saw takes ≥2 s per lap with relative speeds kept, still dots mean locked, comets mean slipping. FEEDBACK bends all saws equally, showing as the beam losing focus."
      },
      {
        title: "patching it",
        body: "Patch v/oct in, take + and − out into a resonant lowpass, Legion is an oscillator only, and saws through a resonant filter are its purpose. SCATTER re-phases all seven saws per trigger, LOCK gates them into one saw while held, IN STEP reports alignment as 0–10 V. Voice count follows the widest cable, ≤16, each voice its own seven saws."
      }
    ]
  },
  {
    slug: "susurrus",
    name: "susurrus",
    subtitle: "a held chord whose voices trade places, gliding between its own notes, blooming into vibrato, drifting across the stereo field",
    summary: "susurrus sits around any polyphonic oscillator: it sends each voice's pitch out, takes the audio back, and fades and pans every voice on its own. Hold a chord and its voices start to trade places one pair at a time, each one blooming into vibrato after it lands. A multi-pen chart recorder draws every glide, landing and bloom as it happens.",
    category: "vcv rack module",
    status: "polyphonic performance processor",
    accent: "#bd9e6c",
    accentSoft: "rgba(189, 158, 108, 0.2)",
    icon: Shuffle,
    hp: 22,
    panelImage: {
      src: "/modules/susurrus/panel-v3.webp",
      width: 1650,
      height: 1900,
      alt: "susurrus vcv rack module panel"
    },
    media: {},
    controls: [
      {
        id: "chart",
        label: "chart recorder",
        type: "meter",
        x: 35.2,
        y: 23.3,
        size: 64,
        description: [
          "a multi-pen chart recorder drawing the voices. Paper scrolls right to left, height is pitch, ruled in semitones with held chord notes darker",
          "each voice draws its own pen: glides slope, landings flatten, vibrato blooms into waves",
          "paper advances with the weave, ~14 mm per move, following clocks, slowing while the flock holds. Pan isn't drawn, patch PAN out to see it",
        ],
        tip: "watch a swap cross mid-glide: two slopes make an X, the chord whole again at landing.",
      },
      {
        id: "voct-in",
        label: "v/oct",
        type: "jack",
        x: 73.9,
        y: 17.4,
        size: 8,
        voltageRange: "1V/OCT · poly ≤16",
        description: "the held chord, polyphonic, ≤16 voices. Everything the weave does starts from these notes.",
        tip: "drive from MIDI-CV or a polyphonic sequencer and hold, the weave needs held notes to move between.",
      },
      {
        id: "gate-in",
        label: "gate",
        type: "jack",
        x: 83.8,
        y: 17.4,
        size: 8,
        voltageRange: "gate · poly ≤16",
        description: "polyphonic gates choosing chord membership. Gate high (≥1 V) means in the chord; released voices keep pitch through release and leave the weave. Unpatched, every voice counts as held.",
        tip: "release one finger mid-weave and that voice drops from the rotation while the rest trade.",
      },
      {
        id: "audio-in",
        label: "audio",
        type: "jack",
        x: 93.6,
        y: 17.4,
        size: 8,
        voltageRange: "any · poly ≤16",
        description: "the oscillator's polyphonic audio, one channel per voice, so each voice fades and pans independently. Mono cables can't pan per voice, so they pass centred, as does everything while V/OCT and GATE are unpatched.",
        tip: "if LEFT/RIGHT sound centred and dry, check this jack carries one channel per voice.",
      },
      {
        id: "voct-out",
        label: "v/oct out",
        type: "jack",
        x: 73.9,
        y: 27.7,
        size: 8,
        voltageRange: "1V/OCT · poly ≤16",
        description: "each voice's pitch, polyphonic, gliding between chord notes with its own vibrato added. Patch to a polyphonic oscillator.",
        tip: "mult to a tuner or scope to verify voices land exactly at GLIDE time.",
      },
      {
        id: "landed-out",
        label: "landed",
        type: "jack",
        x: 83.8,
        y: 27.7,
        size: 8,
        voltageRange: "gate · poly ≤16",
        description: "polyphonic gate at 10 V while a voice sits on its note with its gate high, 0 V while gliding. Patch to an envelope and each voice re-articulates on arrival.",
        tip: "patch per voice to snappy envelopes for arrivals-only texture over a steady drone.",
      },
      {
        id: "bloom-out",
        label: "bloom",
        type: "jack",
        x: 93.6,
        y: 27.7,
        size: 8,
        voltageRange: "0-10V · poly ≤16",
        description: "each voice's vibrato bloom as polyphonic CV: 0 V while moving, rising to 10 V as vibrato comes in. Patch to per-voice filters or VCAs and tone opens as voices settle.",
        tip: "open a per-voice lowpass so arriving voices brighten as vibrato blooms.",
      },
      {
        id: "left-out",
        label: "left",
        type: "jack",
        x: 73.9,
        y: 38.3,
        size: 8,
        voltageRange: "audio · ≤11.7V",
        description: "left half of the stereo mix: every voice faded and panned, summed with 1/sqrt loudness compensation so big chords sit near one note's level. Linear to 8 V, soft-limited, never past 11.7 V.",
        tip: "sixteen loud voices can still peak well past 10 V, leave headroom downstream.",
      },
      {
        id: "right-out",
        label: "right",
        type: "jack",
        x: 83.8,
        y: 38.3,
        size: 8,
        voltageRange: "audio · ≤11.7V",
        description: "right half of the stereo mix, same per-voice fades and pans with its own pan gains. Linear to 8 V, soft limit at 11.7 V.",
        tip: "take LEFT and RIGHT to a mixer or output as the finished stereo image.",
      },
      {
        id: "pan-out",
        label: "pan",
        type: "jack",
        x: 93.6,
        y: 38.3,
        size: 8,
        voltageRange: "-5 to +5V · poly ≤16",
        description: "each voice's stereo place as polyphonic CV, −5 V hard left to +5 V hard right. The chart doesn't draw pan, this is how you see or reuse it.",
        tip: "record alongside the audio to automate a second mix element with the same wandering.",
      },
      {
        id: "glide",
        label: "glide",
        type: "knob",
        x: 8.7,
        y: 51.3,
        size: 12,
        description: "every move's length, 0–4 s. Chord changes and weave moves both use it. Square-law knob for room at the short end; collar lights with GLIDE CV. The menu can make it time-per-octave instead, so small steps beat leaps.",
        tip: "start ~0.6 s so swaps read as motion, not portamento smear.",
      },
      {
        id: "shape",
        label: "shape",
        type: "knob",
        x: 22.7,
        y: 51.3,
        size: 12,
        description: [
          "each glide's curve. Left is swoop (fast start, slow settle, like analog lag), centre even, right sung (slow to leave, quick middle, soft landing)",
          "every shape lands exactly on its note at exactly GLIDE time, only the journey changes. The tooltip names the nearest curve",
        ],
        tip: "sung shapes make wide leaps vocal; swoop keeps short neighbor swaps crisp.",
      },
      {
        id: "mode",
        label: "mode",
        type: "switch",
        x: 36.7,
        y: 51.3,
        size: 12,
        description: [
          "how voices move through the held chord",
          "SWAP: neighbours trade places. They cross mid-glide and swap stereo sides; the chord is whole at landing",
          "HANDOFF: the lower voice rises to the upper note while the displaced voice fades out on arrival, no note ever doubles. The next move brings it back",
          "WANDER: notes trade places freely, any voice can end anywhere while the chord stays whole. Nothing doubles, nothing goes missing",
        ],
        tip: "handoff is the most transparent weave, harmony never thins or doubles.",
      },
      {
        id: "bloom",
        label: "bloom",
        type: "knob",
        x: 50.7,
        y: 51.3,
        size: 12,
        description: [
          "vibrato fade-in after landing, 0–4 s on a square law",
          "voices never vibrate while moving: new glides pull vibrato out in ~80 ms. Blooming vibrato starts slow and wide, then settles, like a singer's",
        ],
        tip: "long bloom with slow moves gives each arrival its own entrance; short bloom keeps shimmer constant.",
      },
      {
        id: "depth",
        label: "depth",
        type: "knob",
        x: 64.7,
        y: 51.3,
        size: 12,
        description: "vibrato depth, 0–100 cents. Sounds only once a voice has landed and bloomed; gliding pitch is pure.",
        tip: "25 cents sits naturally on held chords; past 50 turns deliberately seasick.",
      },
      {
        id: "rate",
        label: "rate",
        type: "knob",
        x: 78.7,
        y: 51.3,
        size: 12,
        description: "vibrato rate, 0.5–12 Hz. No two voices share a rate, fixed offsets plus slow wander keep them from pulsing together.",
        tip: "~5.5 Hz reads as sung vibrato; low rates with high sway circle rather than shake.",
      },
      {
        id: "timing",
        label: "timing",
        type: "switch",
        x: 92.8,
        y: 51.3,
        size: 9,
        description: [
          "when moves happen",
          "SELF: a move waits for every voice to land, bloom fully, and hold for the MOVE time. The glide-land-bloom cycle is the rhythm",
          "FREE: moves come at the MOVE rate, each varied randomly (0.6–1.4× the period)",
        ],
        tip: "self timing with long blooms breathes at its own pace, hold a chord and patch nothing.",
      },
      {
        id: "glide-cv",
        label: "glide cv",
        type: "jack",
        x: 8.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to GLIDE, 10 V covering the knob's range. First channel only: the weave is one flock, so controls move every voice together. Collar lights with CV.",
        tip: "long-short glide arcs from a slow LFO breathe between quick trades and slow slides.",
      },
      {
        id: "shape-cv",
        label: "shape cv",
        type: "jack",
        x: 22.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to SHAPE. SHAPE spans twice the other knobs (swoop to sung), so CV moves it twice as far per volt; 10 V still covers the control. First channel only.",
        tip: "nudge per section: swoop for rhythmic passages, sung for exposed landings.",
      },
      {
        id: "mode-cv",
        label: "mode cv",
        type: "jack",
        x: 36.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the MODE switch: 0–10 V steps through Swap, Handoff, Wander from the switch position, rounded to whole modes. First channel only.",
        tip: "sequence with stepped voltages, 0, 5, 10 V from the switch select the three weaves.",
      },
      {
        id: "bloom-cv",
        label: "bloom cv",
        type: "jack",
        x: 50.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to BLOOM, 10 V covering the knob's range. First channel only; collar shows the sum.",
        tip: "open bloom on sparse chords so voices sing in slowly, tighten as harmony busies.",
      },
      {
        id: "depth-cv",
        label: "depth cv",
        type: "jack",
        x: 64.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to DEPTH, 10 V covering 0–100 cents. First channel only; collar shows the sum.",
        tip: "fade depth in with an envelope so vibrato appears once the chord settles.",
      },
      {
        id: "rate-cv",
        label: "rate cv",
        type: "jack",
        x: 78.7,
        y: 64.1,
        size: 8,
        voltageRange: "1V/OCT",
        description: "1 V/oct on vibrato rate, each volt doubles it around the RATE setting. First channel only.",
        tip: "track the chord's register so higher voicings shimmer faster, like real strings.",
      },
      {
        id: "clock-in",
        label: "clock",
        type: "jack",
        x: 92.8,
        y: 64.1,
        size: 8,
        voltageRange: "clock",
        description: "when patched, moves follow the clock instead of TIMING, and MOVE becomes a divider: every 1–16 pulses. Sits directly under the switch it overrides.",
        tip: "divide by 8 or 16 against a running clock so the weave shifts once per bar or two.",
      },
      {
        id: "stagger",
        label: "stagger",
        type: "knob",
        x: 8.7,
        y: 76.9,
        size: 12,
        description: "keeps the flock from moving as a block. Each pair starts after a random delay of ≤STAGGER × GLIDE; at 0 everything moves as one. The one knob with no CV jack, the socket below stays empty.",
        tip: "small stagger (~¼) keeps chords whole while moves stop sounding sequenced.",
      },
      {
        id: "travel",
        label: "travel",
        type: "knob",
        x: 22.7,
        y: 76.9,
        size: 12,
        description: "throws each gliding voice further in its direction of motion, rightward when rising. An octave or more throws hardest. Voices drift back over HOME time after landing.",
        tip: "wide intervals with high travel sweep rising lines right, follow with long home for a slow return.",
      },
      {
        id: "move",
        label: "move",
        type: "knob",
        x: 36.7,
        y: 76.9,
        size: 12,
        description: [
          "its job follows TIMING; the tooltip names the current one",
          "SELF: hold time, 0.2–8 s after every voice lands and blooms. FREE: move rate, 0.05–8 moves/s. CLOCK: divider, every 1–16 pulses",
        ],
        tip: "in self mode, short hold with long glide makes overlapping, never-settling motion; long hold lets each landing sing.",
      },
      {
        id: "home",
        label: "home",
        type: "knob",
        x: 50.7,
        y: 76.9,
        size: 12,
        description: "how long thrown voices take to drift back after landing, 0.1–8 s. Only matters while TRAVEL is up, no throw, nowhere to come home from.",
        tip: "match home to the move rhythm so voices arrive back as the next move starts.",
      },
      {
        id: "sway",
        label: "sway",
        type: "knob",
        x: 64.7,
        y: 76.9,
        size: 12,
        description: "pan wobble at the vibrato's rate, a quarter cycle from the pitch wobble, voices circle rather than shake. Follows the bloom, fading in with the vibrato.",
        tip: "sway with zero depth circles placement with steady pitch, movement without seasickness.",
      },
      {
        id: "spread",
        label: "spread",
        type: "knob",
        x: 78.7,
        y: 76.9,
        size: 12,
        description: "places voices by chord pitch, lowest left, highest right. Relative to the chord, so close voicings still fill the field.",
        tip: "full spread with swap mode makes each trade physically cross the stereo image.",
      },
      {
        id: "travel-cv",
        label: "travel cv",
        type: "jack",
        x: 22.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to TRAVEL, 10 V covering the knob's range. First channel only; collar shows the sum.",
        tip: "gate travel throws so only accented moves sweep the field.",
      },
      {
        id: "move-cv",
        label: "move cv",
        type: "jack",
        x: 36.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to MOVE in any job, hold time, move rate, or clock division. 10 V covers the range; first channel only.",
        tip: "modulate in free mode to drift between stillness and flurries.",
      },
      {
        id: "home-cv",
        label: "home cv",
        type: "jack",
        x: 50.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to HOME, 10 V covering the range. First channel only; collar shows the sum.",
        tip: "shorten home in dense passages so thrown voices snap back before the next move.",
      },
      {
        id: "sway-cv",
        label: "sway cv",
        type: "jack",
        x: 64.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to SWAY, 10 V covering the range. First channel only; collar shows the sum.",
        tip: "bring sway up only on held sections so circling marks the calm moments.",
      },
      {
        id: "spread-cv",
        label: "spread cv",
        type: "jack",
        x: 78.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to SPREAD, 10 V covering the range. First channel only; collar shows the sum.",
        tip: "narrow for verses, open when the chord changes.",
      },
      {
        id: "move-trig",
        label: "move trig",
        type: "jack",
        x: 92.8,
        y: 89.1,
        size: 8,
        voltageRange: "trigger",
        description: "a trigger moves the weave now, atop TIMING or CLOCK. It waits for every voice to land first; several triggers during one glide make one move.",
        tip: "fire from a manual gate to conduct moves by hand over a self-timed bed.",
      },
    ],
    contextMenu: [
      {
        id: "constant-rate",
        group: "glide",
        label: "glide at a constant rate",
        kind: "toggle",
        description: "GLIDE becomes time-per-octave instead of time-per-move, small steps beat leaps. The tooltip reads per octave while on."
      }
    ],
    manual: [
      {
        title: "what it does",
        body: "Susurrus is a polyphonic performance processor around any polyphonic oscillator. It sends each voice's pitch out on V/OCT OUT, takes audio back on AUDIO, and fades and pans every voice independently before summing to LEFT/RIGHT. The name is Latin for a whispering murmur, a wheeling starling flock."
      },
      {
        title: "the weave",
        body: "Held chords trade places one pair at a time: SWAP crosses neighbours mid-glide, HANDOFF fades the displaced voice so no note doubles, WANDER lets any voice land anywhere with the chord whole. TIMING rhythms it, SELF waits for land, bloom, and MOVE hold; FREE moves at the MOVE rate, and a patched CLOCK replaces the switch with a 1–16 divider. MOVE TRIG conducts by hand atop everything; STAGGER staggers pair starts by ≤STAGGER × GLIDE."
      },
      {
        title: "glide and vibrato",
        body: "GLIDE sets every move's length, 0–4 s square-law; SHAPE bends the curve swoop-even-sung without missing landing time. Voices never vibrate while moving, new glides pull it out in ~80 ms, and BLOOM fades it in over 0–4 s, starting slow and wide like a singer. DEPTH runs 0–100 cents, RATE 0.5–12 Hz with no shared rates, so chords never pulse as one."
      },
      {
        title: "space",
        body: "SPREAD places voices by chord pitch, lowest left, highest right, relative to the voicing so close chords fill the field. TRAVEL throws gliding voices along their motion; HOME drifts them back over 0.1–8 s; SWAY circles each voice at its vibrato rate a quarter cycle off the pitch wobble. Per-voice pan also appears as CV on PAN (−5 V left to +5 V right); LEFT/RIGHT sum with loudness compensation so big chords sit near one note's level, linear to 8 V, soft-limited at 11.7 V."
      },
      {
        title: "chords and voices",
        body: "New chords move each held voice to the nearest new-chord note with least total glide, short slides; the same note on two channels counts once and its voices move together. New voices start on their note, never gliding in from 0 V; in HANDOFF the displaced voice silences before the arrival. The chart draws everything, slope for glide, flat for landing, blooming wave for vibrato, advancing ~14 mm per move."
      }
    ]
  },
];

export const stackHighlights = [
  {
    title: "building",
    description: "dual 6th-order morphing filters with cross-feedback, Lorenz chaos modulation, Bode frequency shifting, and a chaos-swept phaser. finishing up panel design.",
    icon: Wrench
  },
  {
    title: "writing",
    description: "a more practical approach to organizing samples when you have a lot of them. Johnny Decimal and PARA will be your guide.",
    icon: PenLine
  },
  {
    title: "exploring",
    description: "using Ableton Extensions to build something that keeps presets and patches for hardware, software synths, and plugins in one place.",
    icon: Compass
  }
];

export function getVisibleModules() {
  return modules.filter((module) => !module.hidden);
}

export function getModule(slug: string) {
  return modules.find((module) => module.slug === slug);
}

export function getModuleExplorerData(module: ModuleSpec): ModuleExplorerData {
  return {
    name: module.name,
    accent: module.accent,
    hp: module.hp,
    panelImage: module.panelImage,
    contextMenu: module.contextMenu,
    controls: module.controls,
    subtitle: module.subtitle,
    summary: module.summary,
    status: module.status,
    typeplate: module.typeplate,
  };
}
