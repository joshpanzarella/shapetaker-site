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
    subtitle: "polyphonic dual sigmoid oscillator whose pitch-locked voice engine animates every note from within — with reverse-sync chaos and true mono-to-wide stereo imaging",
    summary: "Two sigmoid cores, V and Z, blended by a crossfader and animated by an audio-rate voice engine locked to each note's pitch — vowels, brass, and voices emerge inside the tone with no patching at all. Reverse sync and a chance control supply the chaos.",
    category: "vcv rack modules",
    status: "STEREO OSCILLATOR",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: AudioLines,
    hp: 18,
    panelImage: {
      src: "/modules/clairaudient/panel-v5.webp",
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
          "starts in lissajous (x-y) mode, plotting left against right: a diagonal line means mono, an open ellipse means stereo, a woolly cloud means WIDTH and the sync switches are doing their job",
          "switch to the triggered waveform view in the context menu — the left output traced with the right ghosted behind it, ideal for watching the voice engine bend the sigmoid in real time",
          "choose a color theme (phosphor, ice, solar, amber) in the context menu",
        ],
        tip: "flip to the waveform view while learning the voice engine — every DEPTH, RATIO, and ASYM move is visible immediately.",
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
          "sets Core V's pitch, snapping precisely to musical octaves (±2) for stable octave layering",
          "its own checkmark under Quantize in the context menu defeats the stepping for continuous sweeps — V and Z unquantize independently",
        ],
        tip: "set this first when placing V in a register, then tune Z relative to it.",
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
          "sets Core Z's pitch in discrete semitones over a four-octave range (±24) for immediate interval selection",
          "detune Z a fifth or an octave from V before reaching for the sync switches — intervals are where they sing",
        ],
        tip: "its Quantize checkmark in the context menu frees this knob for continuous pitch, independent of V's.",
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
        description: "precise pitch adjustment for Core V over a ±20 cent range.",
        tip: "a few cents of offset between V and Z gives slow, chorus-like beating with no modulation patched.",
      },
      {
        id: "z-fine",
        label: "z fine tune",
        type: "knob",
        x: 70.9,
        y: 36.2,
        size: 12,
        description: "precise pitch adjustment for Core Z over a ±20 cent range, fully independent of V.",
        tip: "modulate the FINE CV inputs for delicate vibrato — they're attenuated for exactly that.",
      },
      {
        id: "v-shape",
        label: "v shape",
        type: "knob",
        x: 11.2,
        y: 45.7,
        size: 14,
        description: [
          "sweeps the sigmoid curve: sawtooth to a square-like wave in roughly the first half of the travel, then the transition edge keeps sharpening — well past square into genuinely aggressive territory",
          "the middle of this knob is where the voice engine has the most material to work with",
        ],
        tip: "if FORMANT DEP. seems to be doing little, raise Shape toward its middle — a pure sawtooth gives the engine nothing to bend.",
      },
      {
        id: "z-shape",
        label: "z shape",
        type: "knob",
        x: 88.6,
        y: 44.4,
        size: 14,
        description: "Core Z's sigmoid sweep — identical behavior to V Shape, fully independent. Audio-rate signals into the SHAPE CV jacks are fair game.",
        tip: "shape V and Z differently, then let the crossfade travel between two characters instead of two pitches.",
      },
      {
        id: "xfade",
        label: "crossfade",
        type: "knob",
        x: 50.0,
        y: 45.0,
        size: 18,
        description: [
          "the proportional mix between Core V and Core Z at the output stage",
          "equal power (default) keeps loudness consistent across the sweep; stereo swap (context menu) starts V hard left and Z hard right, trading places as you sweep",
        ],
        tip: "modulate CROSSFADE CV with a slow LFO in stereo swap mode — the two cores transit across the field and pass through each other.",
      },
      {
        id: "xsync",
        label: "xsync",
        type: "switch",
        x: 28.9,
        y: 50.8,
        size: 9,
        description: "when engaged, Core V hard-resets Core Z's phase on each cycle. Modulating Z's pitch while active produces aggressive, tearing harmonic sweeps.",
        tip: "classic hard sync: keep V as the anchor and sweep Z FREQ or Z SHAPE CV for the scream.",
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
          "OFF: both cores run free",
          "ON: each time Core V completes a cycle, Core Z reverses playback direction — the left and right copies of Z flip on opposite edges, spreading the gnarl across the stereo field",
          "MUTUAL: Z pushes back, flipping V's direction in return. The two cores shove each other around chaotically — the wildest setting on the module",
        ],
        tip: "the signature misbehavior. Start at ON, then graduate to MUTUAL when decorum is no longer required.",
        diagrams: [
          { id: "rev-off", label: "off — free", icon: "Minus" },
          { id: "rev-on", label: "on — v flips z", icon: "ArrowLeftRight" },
          { id: "rev-mutual", label: "mutual — both flip", icon: "Shuffle" },
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
          "at 100%, every reverse-sync flip happens on schedule — deterministic chaos. Reducing it makes each flip probabilistic: the gnarl loosens, lurches, and staggers",
          "an internal guard keeps 100% stable in MUTUAL mode — the cores can't lock into degenerate rapid-fire flipping",
        ],
        tip: "sweeping CHANCE between 60% and 100% with MUTUAL engaged is the module's signature live move.",
      },
      {
        id: "rev-ch-atten",
        label: "rev. ch. atten.",
        type: "knob",
        x: 30.0,
        y: 60.5,
        size: 11,
        description: "bipolar attenuverter for the REV. CH. CV input. At full positive, 0–10 V adds 0–100 percentage points to the REV. CHANCE knob; reversed, it subtracts the same amount. The result is clamped to 0–100%.",
        tip: "patch a stepped random source into REV. CH. CV and let each polyphonic voice roll its own dice.",
      },
      {
        id: "formant-depth",
        label: "formant dep.",
        type: "knob",
        x: 11.1,
        y: 74.7,
        size: 14,
        description: [
          "how far the voice engine bends the sigmoid curve within each waveform cycle. At zero the waveform is frozen and traditional; as depth rises, a formant-like sweep opens up inside every note",
          "the lower quarter is subtle by nature — the voice truly clears its throat from the midpoint onward",
        ],
        tip: "the engine is pitch-locked, so the character it imparts survives transposition — play a melody and every note keeps its voice.",
      },
      {
        id: "formant-ratio",
        label: "formant ratio",
        type: "knob",
        x: 33.7,
        y: 74.7,
        size: 14,
        description: [
          "the modulator's speed as a multiple of the oscillator's pitch, snapped to eight musical ratios: ×0.5, ×1, ×1.5, ×2, ×3, ×4, ×5, ×7",
          "low integers (×2, ×3) give vowel and brass formants; high ones (×5, ×7) turn metallic and bell-like",
          "×0.5 repeats its pattern every two cycles, adding a growling octave-down component",
        ],
        tip: "start at ×2 for the factory vocal shimmer, then step upward and listen to the vowels turn to bells.",
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 68.9,
        y: 75.4,
        size: 14,
        description: [
          "a true mono-to-wide control, 0–200%. At 0% the output collapses to mono — a useful reference. 100% is natural stereo",
          "beyond center, the side content is amplified and the voice engine's motion in the two channels drives progressively out of phase — at 200% the left formant sweeps upward while the right sweeps downward",
        ],
        tip: "mono compatibility is safe at any setting — the side content comes from a mid/side stage, not phase trickery. Extreme settings gain a touch of saturation by design.",
      },
      {
        id: "asymmetry",
        label: "asymmetry",
        type: "knob",
        x: 88.6,
        y: 74.7,
        size: 14,
        description: [
          "skews the wave's symmetry. A symmetric square contains only odd harmonics — hollow and chiptune. Asymmetry pours in the missing even harmonics: brassy, reedy, vocal",
          "strongest when Shape is high (where the wave is most symmetric), nearly inaudible when Shape is low",
          "in PWM mode this knob skews the trajectory of the pulse-width modulation instead — the pulse lingers narrow and snaps through wide",
        ],
        tip: "sweep this slowly from zero at high Shape: hollow woodwind transforms into a full brass section as the even harmonics arrive.",
      },
      {
        id: "v-fine-atten",
        label: "v fine cv atten.",
        type: "knob",
        x: 11.1,
        y: 30.0,
        size: 10,
        description: "attenuverter for the V FINE CV input — scaled for delicate vibrato work.",
        tip: "keep it low; fine tune spans only ±20 cents, so a little CV goes a long way.",
      },
      {
        id: "z-fine-atten",
        label: "z fine cv atten.",
        type: "knob",
        x: 88.6,
        y: 30.0,
        size: 10,
        description: "attenuverter for the Z FINE CV input, independent of V's.",
        tip: "opposite-polarity vibrato on V and Z widens the image without touching WIDTH.",
      },
      {
        id: "v-shape-atten",
        label: "v shape cv atten.",
        type: "knob",
        x: 11.1,
        y: 60.5,
        size: 10,
        description: "attenuverter for the V SHAPE CV input.",
        tip: "audio-rate shape modulation through this attenuverter is fair game — start small.",
      },
      {
        id: "z-shape-atten",
        label: "z shape cv atten.",
        type: "knob",
        x: 88.6,
        y: 60.5,
        size: 10,
        description: "attenuverter for the Z SHAPE CV input.",
        tip: "envelope into Z SHAPE with XSYNC on is the classic sync-sweep patch.",
      },
      {
        id: "xfade-atten",
        label: "crossfade cv atten.",
        type: "knob",
        x: 50.0,
        y: 60.5,
        size: 10,
        description: "attenuverter for the CROSSFADE CV input directly below it.",
        tip: "a slow sine here in stereo swap mode is the massive-ensemble move.",
      },
      {
        id: "xfade-cv",
        label: "crossfade cv",
        type: "jack",
        x: 50.0,
        y: 69.7,
        size: 9,
        description: "control voltage input for the master mixing stage, scaled by the attenuverter above.",
        tip: "polyphonic — each voice can sit at its own point between V and Z.",
      },
      {
        id: "rev-ch-cv",
        label: "rev. ch. cv",
        type: "jack",
        x: 50.0,
        y: 78.7,
        size: 9,
        description: "0–10 V control input for reverse-sync flip chance, scaled and inverted by REV. CH. ATTEN. Polyphonic — each voice rolls independently.",
        tip: "an LFO or stepped random here automates the signature 60–100% CHANCE sweep.",
        voltageRange: "0–10V"
      },
      {
        id: "v-oct-v",
        label: "v/oct (v)",
        type: "jack",
        x: 8.9,
        y: 86.8,
        size: 9,
        description: "pitch tracking input for Core V, 1 volt per octave. The widest polyphonic cable patched into any input sets the voice count (up to 16).",
        tip: "a mono cable here is broadcast to every voice — one note held against an entire chord on Z.",
        voltageRange: "1V/OCT"
      },
      {
        id: "v-fine-cv",
        label: "fine cv (v)",
        type: "jack",
        x: 21.1,
        y: 86.8,
        size: 9,
        description: "control voltage input for V fine tune, attenuated for delicate vibrato work.",
        tip: "pair with the hex attenuverter beside V FREQ.",
      },
      {
        id: "v-shape-cv",
        label: "shape cv (v)",
        type: "jack",
        x: 32.6,
        y: 86.8,
        size: 9,
        description: "control voltage input for V's sigmoid shape. Audio-rate signals welcome.",
        tip: "patch the right output back here for chaotic feedback timbres.",
      },
      {
        id: "out-l",
        label: "+ out (left)",
        type: "jack",
        x: 44.1,
        y: 86.8,
        size: 9,
        description: "left master output of the stereo pair (the brass jacks). For monophonic operation use this jack — or set WIDTH to 0% for a true mono collapse.",
        tip: "all active polyphonic voices sum onto both outputs.",
        voltageRange: "±5V"
      },
      {
        id: "out-r",
        label: "− out (right)",
        type: "jack",
        x: 55.6,
        y: 86.8,
        size: 9,
        description: "right master output of the stereo pair. Carries the same channel count as the left.",
        tip: "at WIDTH 200% the two outputs carry opposing formant motion — check the lissajous cloud.",
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
          "pitch tracking input for Core Z, internally normalized to the V input — one pitch CV drives both cores unless this jack is patched",
          "per-voice normalization: if a polyphonic cable here carries fewer channels than V, the uncovered voices follow their V counterparts",
        ],
        tip: "patch two different chord sequences into V and Z — notes pair by channel position and the sync behaviors react within each pair.",
        voltageRange: "1V/OCT"
      },
      {
        id: "z-fine-cv",
        label: "fine cv (z)",
        type: "jack",
        x: 79.3,
        y: 86.8,
        size: 9,
        description: "control voltage input for Z fine tune, attenuated for delicate vibrato work.",
        tip: "slow independent LFOs on V and Z fine make the ensemble breathe.",
      },
      {
        id: "z-shape-cv",
        label: "shape cv (z)",
        type: "jack",
        x: 90.7,
        y: 86.8,
        size: 9,
        description: "control voltage input for Z's sigmoid shape. Audio-rate signals welcome.",
        tip: "with XSYNC on, an envelope here produces the classic tearing sync sweep.",
      }
    ],
    contextMenu: [
      {
        id: "quantize-v",
        group: "settings",
        label: "quantize: v oscillator",
        kind: "toggle",
        description: "Checkmark under Settings → Quantize. On by default: the V FREQ knob snaps to whole octaves. Turn off for continuous pitch sweeps on V alone."
      },
      {
        id: "quantize-z",
        group: "settings",
        label: "quantize: z oscillator",
        kind: "toggle",
        description: "Checkmark under Settings → Quantize. On by default: the Z FREQ knob snaps to semitones. Independent of V's checkmark — free one core, keep the other stepped."
      },
      {
        id: "oscilloscope-display",
        group: "settings",
        label: "oscilloscope display",
        kind: "choice",
        values: ["lissajous (x-y)", "waveform (triggered)"],
        description: [
          "lissajous (default): plots left against right. A diagonal line means mono, an open ellipse means stereo, a woolly cloud means WIDTH and sync are doing their job",
          "waveform: a triggered trace of the left output with the right ghosted behind it — stable, and ideal for watching the voice engine bend the sigmoid"
        ]
      },
      {
        id: "oscilloscope-theme",
        group: "settings",
        label: "oscilloscope theme",
        kind: "choice",
        values: ["phosphor", "ice", "solar", "amber"],
        description: [
          "phosphor: warm green, like a vintage CRT",
          "ice: cool cyan and blue-white",
          "solar: warm amber-red",
          "amber: deep amber, like a classic terminal — shared across shapetaker modules or set per-module"
        ]
      },
      {
        id: "waveform-mode",
        group: "settings",
        label: "waveform",
        kind: "choice",
        values: ["sigmoid saw", "pwm"],
        description: [
          "sigmoid saw: the morphing sigmoid waveform — all voice engine controls operate as labeled",
          "pwm: a band-limited pulse wave. Shape sets static pulse width (5–95%), FORMANT DEP. applies pitch-locked PWM, and ASYMMETRY skews the modulation's trajectory into a lopsided throb"
        ]
      },
      {
        id: "crossfade-curve",
        group: "settings",
        label: "crossfade curve",
        kind: "choice",
        values: ["equal power", "stereo swap"],
        description: [
          "equal power: a standard centered blend with consistent apparent volume",
          "stereo swap: V starts hard left, Z hard right — sweeping the crossfade makes them transit the field and trade places, with crossfeed anchoring the center"
        ]
      },
      {
        id: "oversampling",
        group: "settings",
        label: "oversampling",
        kind: "choice",
        values: ["1x (off)", "2x", "4x", "8x"],
        description: [
          "4× is the default and recommended for general operation — it keeps aliasing down under hard sync, reverse sync, and audio-rate shape modulation",
          "8× is the highest quality, worth it for MUTUAL reverse sync or aggressive shape CV at high pitches; 1× disables oversampling for the lowest CPU cost"
        ]
      },
      {
        id: "vintage",
        group: "character",
        label: "vintage",
        kind: "slider",
        description: [
          "a single macro governing the module's analog-modeled imperfections: slow thermal pitch drift, per-voice component tolerances, stereo crosstalk, and bus saturation",
          "50% is the calibrated factory intent — a well-maintained vintage instrument. Below it cleans toward digital precision; fully clockwise resembles a beloved instrument with a failing power supply"
        ]
      },
      {
        id: "oscillator-noise",
        group: "character",
        label: "oscillator noise",
        kind: "slider",
        description: "A hardware-like noise floor plus microscopic phase jitter that softens the waveform edges, replicating the lively instability of a vintage VCO."
      }
    ],
    manual: [
      {
        title: "the voice engine",
        body: "An internal modulator runs at audio rate, locked to each oscillator's pitch, bending the sigmoid curve from within. FORMANT DEP. sets how far it bends, FORMANT RATIO its speed as a musical multiple of the pitch, ASYMMETRY pours in even harmonics, and WIDTH drives the two channels' motion out of phase — up to opposing formant sweeps at 200%."
      },
      {
        title: "sigmoid oscillators",
        body: "Cores V and Z build their waveform around a sigmoid curve — a sawtooth whose central edge reshapes from gentle ramp to razor edge. V snaps to octaves, Z to semitones, each with ±20 cent fine tune. Z's pitch input normalizes to V per-voice, and up to sixteen polyphonic voices pair lane-by-lane."
      },
      {
        title: "reverse sync and chance",
        body: "XSYNC is classic hard sync: V resets Z's phase each cycle. REV. SYNC is the signature misbehavior — V flips Z's playback direction (ON), or the two cores shove each other around (MUTUAL). CHANCE makes each flip probabilistic; riding it between 60% and 100% is the module's signature live move, automatable per voice through REV. CH. CV."
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
            detail: "One cable tunes both cores — the Z input is normalized to V per voice. Set Z FREQ to +7 semitones (a perfect fifth) for a harmonic relationship.",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Connect a slow LFO to the XFADE CV jack (center column).",
            detail: "A sine or triangle at 0.1–0.3 Hz makes the blend breathe between the two cores. Trim the depth with the hex attenuverter directly above the jack.",
            cableIds: ["lfo-xfade"]
          },
          {
            instruction: "Connect the + and − outputs to your mixer's left and right channels.",
            detail: "For a more dramatic image, set Crossfade Curve to 'stereo swap' in the context menu — V and Z will trade places across the field as the LFO sweeps.",
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
            detail: "Set both SHAPE knobs around 85% so the wave sits in its most symmetric, square-like zone — that's where ASYMMETRY has the most even harmonics to pour in.",
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
        description: "MUTUAL reverse sync with a stepped-random source rolling the dice on every flip — the two cores lurch between locked snarling and staggering collapse, spread 200% wide.",
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
            detail: "Flip REV. SYNC to its MUTUAL position — the two cores now shove each other's playback direction around. At CHANCE 100% this chaos is fully deterministic.",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Patch a stepped-random source into REV. CH. CV.",
            detail: "Set REV. CH. ATTEN. slightly negative so random steps subtract from the 80% CHANCE setting. Each polyphonic voice rolls its own dice — flips loosen, lurch, and stagger.",
            cableIds: ["random-chance"]
          },
          {
            instruction: "Connect both outputs and turn WIDTH to 200%.",
            detail: "The left and right copies of Z flip on opposite edges of V's cycle, so the wreckage spreads across the entire stereo field. Ride CHANCE between 60% and 100% by hand — that sweep is the module's signature live move.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "massive-stereo-ensemble",
        title: "massive stereo ensemble",
        description: "Stereo-swap crossfading, aged Vintage character, and two independent slow LFOs combine into an exceptionally wide, organic ensemble — one module sounding like a section.",
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
            detail: "In the context menu, set Crossfade Curve to 'stereo swap' and raise Vintage to about 70% — thermal drift, per-voice tolerances, and crosstalk age the module into an old ensemble machine.",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Send a slow sine to XFADE CV.",
            detail: "In stereo swap mode the two cores transit across the field and trade places. Keep the attenuverter gentle so the motion stays tidal rather than seasick.",
            cableIds: ["sine-xfade"]
          },
          {
            instruction: "Send a slow triangle — unsynced, different rate — to Z FINE CV.",
            detail: "Z drifts a few cents against V, beating slowly. Independent LFO rates keep the two motions from ever aligning.",
            cableIds: ["tri-fine"]
          },
          {
            instruction: "Connect both outputs and set WIDTH to 150%.",
            detail: "Beyond 100%, the voice engine's motion in the two channels drives out of phase — combined with the drift and swap, the result is an exceptionally wide, organic ensemble.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "lopsided-pwm-throb",
        title: "lopsided pwm throb",
        description: "PWM mode with a skewed modulation trajectory — the pulse lingers narrow and snaps through wide, turning even shimmer into a rhythmic, dub-flavored lean.",
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
            detail: "Shape CV now sweeps the base duty cycle underneath the voice engine's PWM — two layers of pulse motion at very different speeds.",
            cableIds: ["lfo-shape"]
          },
          {
            instruction: "Connect the outputs, then sweep ASYMMETRY upward.",
            detail: "ASYMMETRY skews the modulation's trajectory: the pulse lingers on its narrow side and snaps through its wide side. The even shimmer becomes a lopsided, dub-flavored throb — push WIDTH past 100% to lean it between the speakers.",
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
            detail: "The right channel now bends V's sigmoid at audio rate. Start with the V Shape attenuverter barely open (±15%) — the feedback ranges from gentle growl to total wavebreak.",
            cableIds: ["feedback"]
          },
          {
            instruction: "Take the + output to your mixer and flip REV. SYNC on.",
            detail: "With Z an octave down, each of V's cycles now flips Z's direction while Z's output is shaping V — the loop folds in on itself. Raise FORMANT DEP. and the voice engine joins the argument.",
            cableIds: ["audio-out"]
          },
          {
            instruction: "Graduate to MUTUAL and ride REV. CHANCE around 70%.",
            detail: "The flips turn probabilistic and the feedback staggers unpredictably. The crossfade knob is now your mix control between the clean V core and the wreckage — perform it.",
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
    hidden: true,
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
      src: "/modules/transmutation/panel-v3.webp",
      width: 3000,
      height: 1900,
      alt: "transmutation vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "dual sequencers",
        body: "Sequences A and B each run up to 64 steps with independent length, start/stop/reset, and 6-voice polyphonic CV and gate outputs. B can play its own steps, extract chord tones from A, or generate scale melodies in the current key."
      },
      {
        title: "macros and variations",
        body: "Space/Energy, Motion, and Humanize steer voicing density, harmonic volatility, and analog-style timing slop. Four variation slots store complete A/B sequences with their macro states — verse, chorus, bridge, and a spare."
      },
      {
        title: "groove and display",
        body: "Steps can be micro-shifted ±20 ticks by dragging on the matrix, or shaped globally with swing and shuffle presets. The Spooky TV display tracks occupancy, playheads, and timing deviations in CRT phosphor."
      }
    ]
  },
  {
    slug: "chiaroscuro",
    name: "chiaroscuro",
    subtitle: "16-voice stereo vca in front of a five-headed distortion core — with level-following contrast, stereo tilt, and a four-mode sidechain",
    summary: "A polyphonic stereo VCA feeding five switchable distortion topologies. VCA sets the clean level, DIST opens the algorithm, DRIVE pushes into it, MIX blends — and the wet path is level-matched continuously so dry to ruined never has to mean quiet to loud.",
    category: "vcv rack module",
    status: "vca + distortion",
    accent: "#D7B56D",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: SlidersHorizontal,
    hp: 14,
    panelImage: {
      src: "/modules/chiaroscuro/panel-v4.webp",
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
          "brightness follows the highest effective VCA gain across all voices up to unity",
          "above unity it shifts toward white to show the boost region that brightness alone cannot represent — up to 2× in Linear, 4× in Exponential",
          "in Duck Level sidechain mode it dims as the sidechain ducks the VCA. Color follows the display theme",
        ],
        tip: "white means you are above unity and into the soft knee — deliberate, but worth knowing.",
      },
      {
        id: "vca",
        label: "vca",
        type: "knob",
        x: 50.0,
        y: 13.9,
        size: 22,
        description: [
          "resting gain from silence to unity. The factory setting is closed, so silence from a new module is expected",
          "VCA CV adds directly at 10 V per unit of gain; the combined value is clamped from 0× to 2× before the response curve",
          "the final output is linear through ordinary levels, then enters a soft knee above roughly ±8 V and approaches a ceiling near ±11.7 V",
        ],
        tip: "raise it to noon first — DIST, DRIVE, and MIX at zero give you the clean VCA to judge everything else against.",
      },
      {
        id: "dist-jewel",
        label: "distortion jewel",
        type: "meter",
        x: 85.2,
        y: 14.8,
        size: 10,
        description: [
          "color identifies the current TYPE; brightness combines the active DIST, DRIVE, and MIX with a faint glow when any one is raised",
          "these are the values after the sidechain has had its say — in Enhancement mode the jewel stays dark between hits",
        ],
        tip: "a dark jewel with a patched sidechain means the trigger has not arrived yet, not that the module is off.",
      },
      {
        id: "link",
        label: "l/r link",
        type: "switch",
        x: 14.8,
        y: 26.8,
        size: 12,
        description: [
          "off: R IN feeds the right side (with L normalled to R only while R is unpatched)",
          "link: replaces the right input with the left input even when a right signal is patched",
        ],
        tip: "an R-only patch leaves L silent — the normalization only runs one direction.",
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
          "hard clip: a narrowing-knee rail clipper — saturates low, turns sharp and confrontational high",
          "tube sat: two asymmetric stages with program-dependent sag; even harmonics and compression",
          "wave fold: a reflective folder whose tips move from rounded to sharp as DIST rises, crossing several folds at the top",
          "bit crush: dithered bit-depth reduction into a jittered sample hold — near-clean to coarse, irregular grind",
          "ring mod: multiplies by an internal carrier that DIST sweeps from about 20 Hz to 2 kHz while morphing sine → triangle → band-limited square",
          "every TYPE change, by hand or CV, is crossfaded over 12 ms with the outgoing oversampler kept running — no dropout",
        ],
        tip: "sweep it live: the crossfade means TYPE is a performance control, not a preset.",
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
          "lin: the combined VCA knob and CV is the gain",
          "exp: that value is squared — envelopes open more sharply and the available CV boost extends to 4×",
        ],
        tip: "EXP with Tube Sat and a fast envelope gives loud attacks a little program-dependent bite before the wet path is even exposed.",
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
          "opens the selected algorithm and governs its internal intensity — this is the control that changes fold count, bit depth and sample hold, or the ring modulator's carrier",
          "at zero (or MIX at zero) the nonlinear engines are bypassed entirely and reset when the wet path re-engages",
          "with a sidechain patched in Enhancement mode this becomes a maximum, not a fixed amount",
        ],
        tip: "DIST is what the circuit does; DRIVE is how hard you hit it. Keep the roles separate and the module stays legible.",
      },
      {
        id: "drive",
        label: "drive",
        type: "knob",
        x: 50.0,
        y: 43.4,
        size: 17,
        description: "pre-gain on the wet path only. It sets how hard the VCA signal strikes the selected circuit without changing the clean path.",
        tip: "slowly modulate DRIVE on a polyphonic Wave Fold chord — every voice owns its own fold state, so the chord keeps its pitch relationships.",
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 85.2,
        y: 38.5,
        size: 17,
        description: [
          "crossfades from the clean VCA output to the level-matched wet signal",
          "adaptive makeup tracks the power of clean and distorted paths per voice and per side, so MIX no longer exposes the raw gain gap between a quiet clean signal and a driven circuit",
          "in Enhancement sidechain mode, MIX is held to at least 80% wet so the triggered distortion stays audible",
        ],
        tip: "different algorithms can still feel louder because their spectra differ — that is character, not a level bug.",
      },
      {
        id: "dist-atten",
        label: "dist cv attenuverter",
        type: "knob",
        x: 14.8,
        y: 52.9,
        size: 13,
        description: "bipolar scaling for DIST CV. At full positive, 0–10 V adds the full control range; negative subtracts it.",
        tip: "a negative attenuverter with a rising envelope cleans the tail up as the note decays.",
      },
      {
        id: "drive-atten",
        label: "drive cv attenuverter",
        type: "knob",
        x: 50.0,
        y: 57.0,
        size: 13,
        description: "bipolar scaling for DRIVE CV with the same 0–10 V convention.",
        tip: "a little positive drive from velocity is the cheapest way to make a patch feel played.",
      },
      {
        id: "mix-atten",
        label: "mix cv attenuverter",
        type: "knob",
        x: 85.2,
        y: 52.9,
        size: 13,
        description: "bipolar scaling for MIX CV.",
        tip: "modulate MIX rather than DIST for a wet/dry pulse that never changes the character of the dirt itself.",
      },
      {
        id: "contrast",
        label: "contrast",
        type: "knob",
        x: 32.4,
        y: 65.4,
        size: 13,
        description: [
          "ties the distortion depth to how loud the signal already is. Centered is off",
          "clockwise: loud passages get dirty, quiet ones pass clean",
          "counter-clockwise: a note grits up as it decays and cleans up when you play hard",
          "added on top of DIST — DIST sets the floor, CONTRAST decides how far above it the signal can push. Per voice: in a chord, a quiet note can break up while a loud one stays clean",
        ],
        tip: "dirt that fades in: DIST low, MIX high, CONTRAST counter-clockwise — roughly the opposite of what a compressor does to a tail.",
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
          "splits the distortion depth across the two sides. Centered is off; either direction makes one side dirtier than the other by up to half the DIST range",
          "everything before this point is identical left and right, so TILT is what makes the module genuinely stereo rather than dual-mono",
        ],
        tip: "wide from a mono source: one signal into L IN, R IN empty, turn TILT. Wave Fold and Bit Crush spread hardest.",
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
        description: "global distortion-amount modulation through its attenuverter. Only the first channel is read and applied to every voice.",
        tip: "in Direct Control sidechain mode this input is replaced by the sidechain envelope.",
      },
      {
        id: "mix-cv",
        label: "mix cv",
        type: "jack",
        x: 85.2,
        y: 68.9,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "global wet/dry modulation through its attenuverter. First channel only.",
        tip: "a square LFO here is a hard switch between clean and ruined at the same loudness.",
      },
      {
        id: "type-cv",
        label: "type cv",
        type: "jack",
        x: 14.8,
        y: 79.0,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "added to the switch position — from the first position, 0–10 V traverses the five-way selector and pins at the final type. Changes are crossfaded over 12 ms like manual moves.",
        tip: "a stepped random source here is a different distortion circuit on every note.",
      },
      {
        id: "contrast-cv",
        label: "contrast cv",
        type: "jack",
        x: 32.4,
        y: 79.0,
        size: 12,
        voltageRange: "±10 V · mono",
        description: "global bipolar control of CONTRAST — ±10 V for the full range, no attenuverter. First channel only.",
        tip: "a slow bipolar LFO swings the module between compressor-like and expander-like dirt.",
      },
      {
        id: "drive-cv",
        label: "drive cv",
        type: "jack",
        x: 50.2,
        y: 79.0,
        size: 12,
        voltageRange: "0–10 V · mono",
        description: "global pre-gain modulation through its attenuverter. First channel only.",
        tip: "velocity → DRIVE CV with the attenuverter at a quarter is the classic move.",
      },
      {
        id: "tilt-cv",
        label: "tilt cv",
        type: "jack",
        x: 67.6,
        y: 79.0,
        size: 12,
        voltageRange: "±10 V · mono",
        description: "global bipolar control of TILT — ±10 V swings the stereo dirt balance from fully left to fully right, added to the knob.",
        tip: "a slow triangle here pans the distortion across the field without moving the dry signal.",
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
          "a global detection input with nothing to set: it measures how far the signal swings from zero, so a ±5 V audio signal and a 0–10 V envelope both reach the top of its range",
          "a 10 ms attack / 200 ms release follower smooths the result; the context-menu Sidechain Mode decides what it does",
        ],
        tip: "kick-opened destruction: Hard Clip or Bit Crush, DIST and DRIVE high, Enhancement mode, kick into this jack.",
      },
      {
        id: "in-l",
        label: "l in",
        type: "jack",
        x: 14.8,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly ≤16",
        description: "polyphonic audio input. Normalled to R IN when R is unpatched. The widest audio input sets the voice count, up to 16 — CV cables do not create voices.",
        tip: "a mono input is broadcast across a wider polyphonic right side.",
      },
      {
        id: "in-r",
        label: "r in",
        type: "jack",
        x: 32.4,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly ≤16",
        description: "polyphonic right input. The reverse normalization does not exist: an R-only patch leaves L silent.",
        tip: "patch it only when you truly have a stereo source — otherwise let L feed both.",
      },
      {
        id: "vca-cv",
        label: "gain (vca cv)",
        type: "jack",
        x: 49.9,
        y: 89.1,
        size: 12,
        voltageRange: "0–10 V · poly",
        description: "polyphonic amplitude control at 10 V per unit of gain, added to the knob. Each audio voice reads the matching CV channel, so one polyphonic envelope articulates an entire chord.",
        tip: "a full knob plus +10 V reaches 2× in Linear and 4× in Exponential — the output soft knee is part of the sound up there.",
      },
      {
        id: "out-l",
        label: "l out",
        type: "jack",
        x: 67.6,
        y: 89.1,
        size: 12,
        voltageRange: "audio · poly",
        description: "polyphonic left output with the same channel count as the audio inputs.",
        tip: "the soft knee above ±8 V is the last thing in the chain — it catches coupled peaks from any algorithm.",
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
        tip: "with TILT off and R IN empty, L and R are identical — TILT is the only stereo control in the box.",
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
          "4× is the factory setting. Higher settings reduce foldback from the nonlinear circuits at the cost of CPU",
          "oversampling is also tonal: Wave Fold changes most because lower rates keep more aliasing energy, Ring Mod changes modestly. Check this when a recalled patch seems unexpectedly bright or thick"
        ]
      },
      {
        id: "sidechain-enhancement",
        group: "sidechain mode",
        label: "enhancement (trigger)",
        kind: "choice",
        description: "The sidechain envelope scales both DIST and DRIVE from zero up to their knob/CV settings. Idle sidechain: the wet circuit is clean. Hot sidechain: the effect is revealed. MIX is held to at least 80% so the triggered distortion stays audible."
      },
      {
        id: "sidechain-ducking",
        group: "sidechain mode",
        label: "ducking (inverse)",
        kind: "choice",
        description: "A hot sidechain reduces DIST and partially backs off DRIVE. Use it to clear a dense effect around kicks, accents, or another foreground signal."
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
        description: "The plain thing a sidechain usually does: a hot sidechain turns the volume down, to about a tenth at full. It ducks the VCA, so it also backs off how hard the signal hits the distortion — exactly like a VCA in front of a dirt box. The gain jewel dims as it ducks."
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
        body: "VCA sets the resting gain from silence to unity, with VCA CV adding 10 V per unit and a LIN / EXP response switch that squares the curve for sharper envelopes and up to 4× boost. Behind it, TYPE picks one of five algorithms — hard clip, tube sat, wave fold, bit crush, ring mod — DIST opens the chosen circuit, DRIVE sets how hard the signal strikes it, and MIX crossfades to a wet path that adaptive makeup keeps level-matched. Type changes crossfade over 12 ms, so switching live is continuous."
      },
      {
        title: "contrast and tilt",
        body: "CONTRAST ties distortion depth to the signal's own level: clockwise makes loud passages dirty and quiet ones clean, counter-clockwise makes a note grit up as it decays. It is added on top of DIST and evaluated per voice, so one quiet note in a chord can break up while the rest stay clear. TILT splits the depth across left and right by up to half the DIST range — the one control that makes Chiaroscuro genuinely stereo rather than dual-mono."
      },
      {
        title: "sidechain and polyphony",
        body: "SIDECHAIN accepts audio or an envelope with nothing to set, smoothed by a 10 ms / 200 ms follower. Four modes: Enhancement reveals the effect on hits, Ducking clears it around them, Direct Control hands DIST to the envelope, and Duck Level simply turns the VCA down. Sixteen voices follow the audio inputs; the VCA is per voice, the distortion controls and sidechain are global, but every voice and side keeps its own engine and makeup tracker."
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
            detail: "With Enhancement selected, DIST and DRIVE become maxima — nothing happens until the sidechain arrives. MIX is held to at least 80% wet so the effect is unmistakable when it does.",
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
    subtitle: "draw one voltage by hand, then let four polyphonic playheads remember it differently — with a classic adsr mode on the same panel",
    summary: "The touch strip records up to five seconds of vertical motion as a 0–10 V contour. Four lanes read that contour with independent speed, phase, loop direction, loop window, inversion, clock fit, and range. Flip MODE and the same lanes carry one polyphonic ADSR.",
    category: "vcv rack module",
    status: "gesture envelope",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Activity,
    hp: 20,
    panelImage: {
      src: "/modules/evocation/panel-v3.webp",
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
          "gesture mode: click and hold, then move vertically. High records 10 V, low records 0 V; time moves forward while you hold, regardless of horizontal position. Release to finish — recording stops on its own after five seconds",
          "capture runs at up to 960 samples per second and is rebuilt into an interpolation table for smooth playback. The gesture is saved with the patch",
          "starting a new recording stops all playback and replaces the local gesture when it finishes",
          "adsr mode: for Attack, Decay, and Release, horizontal sets time and vertical sets contour; with Sustain selected, vertical sets level. Editing here never fires the envelope",
        ],
        tip: "a quick flick is a valid gesture — the shortest useful envelopes come from the fastest hands.",
      },
      {
        id: "oled",
        label: "oled display",
        type: "meter",
        x: 20.2,
        y: 84.1,
        size: 31,
        description: [
          "shows the stored gesture (or the contour Recollect hands back), the selected lane's speed, phase, loop state, and clock fit, plus polyphonic playheads for every active voice",
          "when the selected lane is looping, colored start and end markers appear — drag either marker or its vertical guide to set the loop window",
          "click the outlined timing capsule at top center to cycle the selected lane's clock fit; MEAS CLK shows while a clock is being learned",
          "phosphor color follows the shared Shapetaker theme or a local Phosphor, Lunar, Solar, or Amber setting",
        ],
        tip: "narrow the markers around a textured fragment and raise SPEED — the display is where Evocation turns into a bank of LFOs.",
      },
      {
        id: "speed",
        label: "speed",
        type: "knob",
        x: 50.1,
        y: 13.8,
        size: 13,
        description: [
          "gesture mode: free-running playback of the selected lane from 0.05× to 8×. Factory lane values are 1×, 2×, 4×, and 8×",
          "adsr mode: the selected stage's time — Attack and Release span 1 ms to 5 s, Decay 1 ms to 2 s, and Sustain uses the same knob as a 0–100% level",
          "a lane with clock fit active ignores this knob until returned to Free",
        ],
        tip: "select a lane first — the knob always edits the lane whose button is lit.",
      },
      {
        id: "trim-lead",
        label: "trim lead",
        type: "switch",
        x: 69.1,
        y: 10.4,
        size: 8,
        description: "removes a sustained quiet opening: a region below 1 V for at least 25 ms counts as silence, then 12 ms of activity confirms the cut. Hysteresis keeps a single noise spike from defeating it. With no usable gesture the OLED reports NO TRIM.",
        tip: "trim after every take that started with a hesitation — it changes the free-running duration, so do it before setting clock fit.",
      },
      {
        id: "phase",
        label: "phase",
        type: "knob",
        x: 88.0,
        y: 13.8,
        size: 13,
        description: [
          "gesture mode: offsets the selected lane through one complete turn of the gesture — or of its loop window, however narrow",
          "adsr mode: for Attack, Decay, and Release, moves from logarithmic below center through linear at center to exponential above. Sustain has no contour",
          "phase does not delay the trigger; it changes which point is sampled from the already-running contour",
        ],
        tip: "give four clock-fitted lanes four different phases and one hand-drawn line becomes a tempo-locked canon.",
      },
      {
        id: "trim-tail",
        label: "trim tail",
        type: "switch",
        x: 69.1,
        y: 21.2,
        size: 8,
        description: "removes the quiet region after the final active point and adds a return to 0 V where needed.",
        tip: "with both trims applied, LOOP Forward wraps cleanly with no dead air.",
      },
      {
        id: "invert",
        label: "invert",
        type: "switch",
        x: 47.2,
        y: 29.5,
        size: 9,
        description: [
          "capacitive touch pad that reverses the selected lane's output range: a 0–10 V contour becomes 10–0 V, a −5 to +5 V contour changes sign",
          "a shared control, not four switches — selecting a different lane recalls that lane's stored state and updates the status lamp beside it",
        ],
        tip: "in ADSR mode invert lane 4 alone: one gate drives three rising and one falling destination.",
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
          "gesture: one recorded contour with four ways through it. The lane buttons select which lane the shared controls edit",
          "adsr: one classic polyphonic Attack–Decay–Sustain–Release envelope copied to all four outputs. The lane buttons become stage selectors",
          "switching to ADSR preserves the gesture in the background; switching back restores it. Recollect is inactive in ADSR mode but keeps its memories",
        ],
        tip: "the distinction is the module: Gesture is one memory read four ways, ADSR is one envelope mapped four ways.",
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
          "gesture mode: successive presses cycle Off → Forward → Reverse → Ping-Pong → Off for the selected lane",
          "forward travels start to end and wraps; reverse travels end to start; ping-pong reflects at both boundaries and fires EOC only after a complete forward-and-back journey",
          "adsr mode: a simple Off/On cycle flag. Because all four outputs share one engine, enabling LOOP on any lane retriggers the common envelope when a one-shot completes",
        ],
        tip: "loop windows plus high speed take Evocation into the audio range — the smallest windows and highest speeds become a waveform.",
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
          "supplies tempo only — it never triggers an envelope. Four accepted rising edges establish a beat period; pulses within 5 ms of the last are ignored, small timing changes are smoothed, and a large jump reopens acquisition",
          "each Gesture lane can then fit its active region to 1/4, 1/2, 1, 2, or 4 beats. With LOOP off the whole gesture fits; Forward or Reverse fit the window; Ping-Pong fits each one-way leg",
        ],
        tip: "until a valid period exists the lane keeps its free speed, so patch the clock before you switch lanes to fitted.",
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
          "gesture mode: a rising edge starts playback; a falling edge leaves the gesture path and glides the current voltage to 0 V, slightly slower from higher levels",
          "adsr mode: the conventional cycle — rising edge begins Attack, held gate sustains, falling edge begins Release",
          "if both Trigger and Gate are patched in Gesture mode, Trigger takes priority and Gate is not read",
        ],
        tip: "polyphonic gates set the output width, and the width stays wide enough for active releases so old notes are not collapsed downstream.",
      },
      {
        id: "trigger-btn",
        label: "manual trigger",
        type: "switch",
        x: 76.3,
        y: 41.3,
        size: 8.5,
        description: "fires every lane. With polyphonic Trigger or Gate cables patched it fires the wider connected channel count; with neither, one voice. It follows the Gesture trigger behavior chosen in the context menu.",
        tip: "the fastest way to audition a fresh take: draw, release, press.",
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
          "gesture mode: each rising edge restarts the corresponding voice at the beginning of the full gesture, or at the appropriate edge of its loop window. A 12 ms glide softens restarted lanes",
          "keep active loops running (context menu) protects loop lanes already traversing their contour; idle loops, one-shots, and releasing lanes still restart",
          "adsr mode: a one-shot — the envelope reaches Sustain, releases automatically, and completes without a held gate",
        ],
        tip: "polyphonic triggers give every voice its own set of four playheads — up to 64 at once.",
      },
      {
        id: "lane-1",
        label: "lane 1 / attack",
        type: "switch",
        x: 47.2,
        y: 51.9,
        size: 9,
        description: "selects lane 1 for the shared SPEED, PHASE, LOOP, and INVERT controls (factory speed 1×). In ADSR mode this button selects the Attack stage. The amber lamp shows which lane is selected and running.",
        tip: "lane 1 is also the lane Recollect mirrors for its dedicated outputs.",
      },
      {
        id: "lane-2",
        label: "lane 2 / decay",
        type: "switch",
        x: 61.8,
        y: 51.9,
        size: 9,
        description: "selects lane 2 (factory speed 2×). In ADSR mode: the Decay stage, 1 ms to 2 s.",
        tip: "leave the factory speeds alone at first — 1×, 2×, 4×, 8× is already a four-scale unfolding of one gesture.",
      },
      {
        id: "lane-3",
        label: "lane 3 / sustain",
        type: "switch",
        x: 76.3,
        y: 51.9,
        size: 9,
        description: "selects lane 3 (factory speed 4×). In ADSR mode: the Sustain stage — SPEED sets level and the strip's vertical position does the same.",
        tip: "fit lanes to 1/2, 1, 2, and 4 beats and this one becomes the two-bar voice of the canon.",
      },
      {
        id: "lane-4",
        label: "lane 4 / release",
        type: "switch",
        x: 90.8,
        y: 51.9,
        size: 9,
        description: "selects lane 4 (factory speed 8×). In ADSR mode: the Release stage, 1 ms to 5 s.",
        tip: "the fastest lane is the one to send to timbre or pan — the others carry the slow shape.",
      },
      {
        id: "phase-cv-1",
        label: "phase cv 1",
        type: "jack",
        x: 47.2,
        y: 61.2,
        size: 8.5,
        voltageRange: "10 V = 1 turn · poly",
        description: "polyphonic phase modulation for lane 1: 10 V adds one complete turn and the result wraps, so bipolar modulation is welcome. Smoothed separately for every voice. Active even when the lane is clock-fitted.",
        tip: "a slow sawtooth here scans a looping window like a wavetable position.",
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
        description: "a 1 ms, 10 V pulse at one-shot completion or at the loop boundary defined by the lane's direction. Ping-Pong fires only after a complete forward-and-back journey.",
        tip: "patch EOC 1 back into TRIGGER for a self-retriggering gesture at lane 1's length.",
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
        tip: "with lane 2 at 2× this fires twice per lane-1 cycle — a free clock divider.",
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
        tip: "a looping lane's gate stays high — use EOC instead when you need an edge.",
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
        tip: "gate lengths shrink with speed — four gates of four lengths from one trigger.",
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
        tip: "the shortest gate on the panel — ideal for a pluck VCA.",
      },
      {
        id: "env-out-1",
        label: "envelope 1",
        type: "jack",
        x: 47.2,
        y: 89.3,
        size: 8.5,
        voltageRange: "0–10 V · poly",
        description: "lane 1's contour. The factory range is 0–10 V; the context menu offers 0–5 V or −5 to +5 V per lane, plus Invert and peak normalization. Once a gesture exists, idle outputs keep at least one channel at 0 V.",
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
        description: "lane 4's contour. In ADSR mode all four outputs carry the same shape but keep their own range and invert settings.",
        tip: "four mappings of one ADSR: 0–10, 0–5, bipolar, inverted — one gate, four compatible destinations.",
      },
    ],
    contextMenu: [
      {
        id: "mode-gesture",
        group: "mode",
        label: "gesture mode",
        kind: "choice",
        description: "The menu equivalent of the panel switch. One recorded contour, four independent playheads with their own speed, phase, loop, window, inversion, clock fit, and range."
      },
      {
        id: "mode-adsr",
        group: "mode",
        label: "adsr mode",
        kind: "choice",
        description: "One polyphonic Attack–Decay–Sustain–Release envelope copied to all four outputs. The gesture is preserved in the background and Recollect goes inactive without losing its memories."
      },
      {
        id: "trigger-behavior",
        group: "gesture trigger behavior",
        label: "gesture trigger behavior",
        kind: "choice",
        values: ["restart active loops", "keep active loops running"],
        description: [
          "restart active loops: every manual and external trigger edge restarts every lane at its boundary (the default, and what existing patches do)",
          "keep active loops running: loop lanes already traversing their contour are left alone; one-shots, idle loops, and releasing lanes still restart. Gate rising is unaffected"
        ]
      },
      {
        id: "clock-fit",
        group: "clock fit",
        label: "clock fit · per envelope",
        kind: "choice",
        values: ["free", "1/4 beat", "1/2 beat", "1 beat", "2 beats", "4 beats"],
        description: "Set Free or a beat division independently for each Gesture lane. A fitted lane ignores its Speed knob until returned to Free; Phase remains active. The OLED's timing capsule cycles the same setting for the selected lane."
      },
      {
        id: "output-ranges",
        group: "output voltage ranges",
        label: "output voltage ranges · per lane",
        kind: "choice",
        values: ["0–10 V", "0–5 V", "−5 to +5 V"],
        description: "Choose the range independently for each Envelope output. Invert reverses whichever range is selected."
      },
      {
        id: "normalize-peak",
        group: "gesture",
        label: "normalize gesture peak",
        kind: "toggle",
        description: "Scales the active gesture against its peak reference without rewriting the stored gesture. With Recollect attached, the reference follows the selected endpoint or the interpolated A/B peak values."
      },
      {
        id: "display-theme",
        group: "display theme",
        label: "display theme",
        kind: "choice",
        values: ["follow shapetaker theme", "phosphor", "lunar", "solar", "amber"],
        description: "The OLED's phosphor color. Follow the shared theme or choose a local color; Recollect's screen follows this setting too."
      },
      {
        id: "quantize-adsr-phase",
        group: "compatibility",
        label: "quantize adsr phase cv",
        kind: "toggle",
        description: "Retained in saved state for compatibility. It currently has no effect because ADSR contour CV is not in the signal path."
      }
    ],
    manual: [
      {
        title: "gesture memory",
        body: "The strip records vertical position against elapsed time — up to five seconds, captured at up to 960 samples per second and rebuilt into an interpolation table. TRIM LEAD and TRIM TAIL remove silence at either end. Four lanes read the same contour with their own SPEED (0.05×–8×), PHASE, loop direction with draggable windows on the OLED, INVERT, clock fit, and output range. Every lane owns a playhead per voice, up to 64 at once."
      },
      {
        title: "triggers, gates, clock",
        body: "TRIGGER restarts a voice at its boundary — or, with Keep active loops running, leaves traversing loops alone. GATE starts playback on rising and glides to 0 V on falling; with both patched, Trigger wins. CLOCK never fires anything: it learns a beat period from four edges so each lane can fit its active region to 1/4 through 4 beats, and a fitted lane ignores its Speed knob until set back to Free."
      },
      {
        title: "adsr mode and recollect",
        body: "Flip MODE and the lane buttons select Attack, Decay, Sustain, and Release; SPEED sets time or level, PHASE bends the curve from logarithmic through linear to exponential, and the strip edits both at once. All four outputs carry the shape with their own range and invert. Place Recollect immediately to the right and Gesture playback reads two stored memories, transformed separately and morphed together — Evocation still owns recording, triggers, clock fit, windows, and polyphony."
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
    subtitle: "two persistent gesture memories for evocation — separate non-destructive transforms, continuous a/b morphing, and three dedicated outputs",
    summary: "A 10 HP expander that sits immediately to Evocation's right. Each completed recording lands in memory A or B; Reverse, Mirror, Smooth, Simplify, and Normalize reshape the selected memory without touching the take, and MORPH crossfades continuously between the two results.",
    category: "vcv rack module",
    status: "gesture expander",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Shuffle,
    hp: 10,
    panelImage: {
      src: "/modules/recollect/panel-v2.webp",
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
          "reads AWAITING EVOCATION until the expander link is active — Recollect must be the module immediately to Evocation's right",
          "memory A draws in the current theme color, memory B in amber; the selected memory's source trace is brighter, and the bright result curve blends from A's color to B's as MORPH moves",
          "A and B percentages show the crossfade weights (an empty memory is dimmed), REC A or REC B shows the next take's destination with a padlock when it is protected, and the bottom line summarizes the selected memory's transforms",
          "right after a transform changes, a brief RAW overlay compares the untransformed take — visual only, CV updates immediately",
        ],
        tip: "watch the A/B weights while you turn MORPH: they tell you whether both memories are actually populated.",
      },
      {
        id: "smooth",
        label: "smooth",
        type: "knob",
        x: 25.0,
        y: 40.1,
        size: 27,
        description: "symmetrical forward/backward low-pass smoothing of the selected memory. It softens hand jitter without pushing the contour noticeably earlier or later. Applied after Reverse and Mirror, before Simplify and Normalize.",
        tip: "a little Smooth on a nervous take keeps the intent and drops the tremor.",
      },
      {
        id: "simplify",
        label: "simplify",
        type: "knob",
        x: 75.0,
        y: 40.1,
        size: 27,
        description: "replaces detail with progressively fewer significant straight-line segments. Low values preserve the hand; high values reveal the geometry beneath it.",
        tip: "push it far and a scribble becomes a staircase — the same gesture as a stepped sequence.",
      },
      {
        id: "morph",
        label: "morph",
        type: "knob",
        x: 50.0,
        y: 57.2,
        size: 27,
        description: [
          "0% is transformed A, 100% is transformed B; between them, corresponding normalized phase positions are crossfaded continuously",
          "when both memories are present their original free-running durations are interpolated too, changing Evocation's base Gesture duration before each lane's Speed applies. Clock fit overrides that and keeps a lane locked to its division",
          "with only one memory present, that memory supplies the result across the whole range",
        ],
        tip: "record a rising A and a falling B, Mirror B, then sweep — the path between two opposites becomes a family resemblance.",
      },
      {
        id: "select-a",
        label: "rec a",
        type: "switch",
        x: 17.3,
        y: 64.8,
        size: 15,
        description: [
          "selects memory A as the destination for the next completed Evocation recording and as the memory the transform controls edit",
          "selecting never overwrites. With Alternate after each capture on (the default), a successful new take selects B afterwards; if A is locked the capture is refused and the selection does not advance",
          "trimming a just-recorded gesture on Evocation counts as an edit, not a new take — it updates the memory that received the take and does not advance again",
        ],
        tip: "lock A once you have the gesture you want to keep, then record experiments into B and morph toward A as an anchor.",
      },
      {
        id: "select-b",
        label: "rec b",
        type: "switch",
        x: 80.0,
        y: 64.8,
        size: 15,
        description: "selects memory B for capture and editing, with the same rules as A. If both memories are empty when Recollect first attaches, the current Evocation gesture is adopted into the selected memory as the first capture.",
        tip: "two-take performance: leave alternation on, record the call, immediately record the response, never touch Recollect.",
      },
      {
        id: "reverse",
        label: "reverse",
        type: "switch",
        x: 17.3,
        y: 76.9,
        size: 15,
        description: "flips time in the selected memory before playback and morphing — independent of Evocation's Forward, Reverse, or Ping-Pong loop travel. First in the transform order.",
        tip: "reverse only B and MORPH becomes a crossfade between a gesture and its retrograde.",
      },
      {
        id: "mirror",
        label: "palindrome (mirror)",
        type: "switch",
        x: 48.6,
        y: 76.9,
        size: 15,
        description: "labeled PALINDROME on the panel: the Mirror transform, which flips the selected memory's amplitude inside the normalized 0–1 range. Because it can affect only A or B, it changes the path between the two memories rather than merely inverting a final output.",
        tip: "toggle it while listening to turn a smooth resemblance back into opposition.",
      },
      {
        id: "normalize",
        label: "normalize",
        type: "switch",
        x: 80.0,
        y: 76.9,
        size: 15,
        description: "scales the transformed memory so its highest point reaches 1.0. Last in the order: Reverse → Mirror → Smooth → Simplify → Normalize.",
        tip: "normalize both memories so MORPH sweeps shape, not loudness.",
      },
      {
        id: "a-out",
        label: "a out",
        type: "jack",
        x: 12.8,
        y: 89.4,
        size: 16,
        voltageRange: "0–10 V · poly",
        description: "the separately transformed A gesture. Follows Evocation lane 1's active voices, Speed, sampled Phase, Phase CV, loop window, travel direction, and clock fit. A deliberately fixed 0–10 V view — it does not inherit Evocation's per-lane range, Invert, or normalization, and goes inactive during Evocation's gate-release glide.",
        tip: "endpoints plus their argument: A OUT, MORPH OUT, and B OUT to three timbral controls from one Evocation trigger.",
      },
      {
        id: "morph-out",
        label: "morph out",
        type: "jack",
        x: 37.6,
        y: 89.4,
        size: 16,
        voltageRange: "0–10 V · poly",
        description: "the current transformed A/B morph as a fixed 0–10 V copy following Evocation lane 1. Falls back to whichever memory is present; an empty endpoint outputs 0 V.",
        tip: "Evocation's own four Envelope outputs already carry the morphed contour with per-lane speed and range — this jack is the plain reference copy.",
      },
      {
        id: "morph-cv",
        label: "morph cv",
        type: "jack",
        x: 62.4,
        y: 89.4,
        size: 16,
        voltageRange: "10 V = full range · mono",
        description: "adds to the MORPH knob at 10 V for the full A-to-B range, then clamps at the endpoints. With MORPH centered, a bipolar ±5 V signal scans from all A to all B. Only the first channel is read.",
        tip: "a slow LFO here makes the contour itself breathe between two hands.",
      },
      {
        id: "b-out",
        label: "b out",
        type: "jack",
        x: 87.2,
        y: 89.4,
        size: 16,
        voltageRange: "0–10 V · poly",
        description: "the separately transformed B gesture, with the same lane-1 following and fixed 0–10 V range as A OUT.",
        tip: "with B reversed, A OUT and B OUT are a gesture and its retrograde on the same playhead.",
      },
    ],
    contextMenu: [
      {
        id: "record-target",
        group: "record target",
        label: "record target",
        kind: "choice",
        values: ["memory a", "memory b", "alternate a/b after each capture"],
        description: "Select where the next completed recording lands, and enable or disable automatic alternation. Alternation is on by default: each successful new take selects the other memory afterwards."
      },
      {
        id: "write-protect",
        group: "write protect",
        label: "memory write protection",
        kind: "choice",
        values: ["lock a", "lock b"],
        description: "Lock A or B independently. A lock refuses capture, clear, copy into that memory, and swap — the OLED reports A LOCKED or B LOCKED. Transforms stay editable: the lock protects the take, not its interpretation."
      },
      {
        id: "capture-current",
        group: "capture",
        label: "capture evocation gesture",
        kind: "choice",
        values: ["into a", "into b"],
        description: "Copy Evocation's present raw gesture immediately into A or B without waiting for another recording."
      },
      {
        id: "memory-ops",
        group: "memory operations",
        label: "memory operations",
        kind: "choice",
        values: ["copy a to b", "copy b to a", "swap a and b", "clear a", "clear b"],
        description: "Operations that would write into a locked destination are refused; swap requires both memories to be unlocked. Capturing into an occupied memory keeps that memory's current transforms."
      },
      {
        id: "reset-transforms",
        group: "transforms",
        label: "reset selected transforms",
        kind: "toggle",
        description: "Return Reverse, Mirror, Smooth, Simplify, and Normalize to neutral for the selected memory — use it when a fresh take should play unaltered."
      }
    ],
    manual: [
      {
        title: "memories and capture",
        body: "A and B choose where the next completed Evocation recording is stored and which memory the transform controls edit. Selecting never overwrites; with automatic alternation on, a successful take selects the other side afterwards. Trims count as edits, not new takes. Locks refuse capture, clear, copy, and swap while leaving transforms editable. If both memories are empty on first connection, Evocation's current gesture is adopted as the first capture."
      },
      {
        title: "transforms and morph",
        body: "Every transform applies to the selected memory and leaves its raw take intact, in the order Reverse → Mirror → Smooth → Simplify → Normalize. MORPH crossfades the two results by normalized phase position — 0% is transformed A, 100% transformed B — and interpolates their free-running durations too, which changes Evocation's base gesture length unless clock fit is holding a lane. Morph CV adds 10 V for the full range from its first channel."
      },
      {
        title: "outputs and evocation",
        body: "While connected with at least one valid memory, Evocation plays the morphed contour through its four lanes with their own speed, phase, loop, and range. A OUT, MORPH OUT, and B OUT are fixed 0–10 V polyphonic views following lane 1. Removing Recollect returns Evocation to its latest local recording; reconnecting restores both memories, their transforms, locks, and the Morph position, all saved with the patch."
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
    subtitle: "two liquid 6-pole filters orbiting one lorenz strange attractor — with spread, cross-coupling, and four routing topologies",
    summary: "Two morphable filters that move from a deep 6-pole lowpass through resonant bandpass to highpass. SPREAD pulls their cutoffs apart, COUPLE circulates one lane into the other, and a Lorenz attractor supplies motion that never quite repeats.",
    category: "vcv rack module",
    status: "dual chaotic filter",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Filter,
    hp: 18,
    panelImage: {
      src: "/modules/involution/panel-v4.webp",
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
          "one visualization of the whole filter field rather than two response graphs: COUPLE tightens and twists the orbit, SPREAD separates its interleaved bands, FORM reshapes and recolors it, routing changes its direction or symmetry",
          "click anywhere on the screen to freeze the chaotic field at its present values — click again to release. The display also pauses while FREEZE GATE is high",
          "screen theme and particle rendering (bloom or stable) live in the context menu and never touch the audio",
        ],
        tip: "freeze the field when you find a voicing you like, then release it only when you want the room to breathe again.",
      },
      {
        id: "cutoff-a",
        label: "cutoff a",
        type: "knob",
        x: 23.2,
        y: 17.5,
        size: 20,
        description: [
          "base cutoff for filter A from 20 Hz to roughly 20.5 kHz, with a curve that gives extra travel to the musical midrange",
          "factory position is fully open — turn it down before raising resonance or you will hear nothing change",
          "voice 1 uses the exact knob position; voices 2–16 receive fixed random offsets within ±1.5 semitones so a chord's resonant peaks do not stack",
        ],
        tip: "with LINK CUTOFF engaged, this knob drives both lanes and SPREAD becomes the only thing separating them.",
      },
      {
        id: "cutoff-b",
        label: "cutoff b",
        type: "knob",
        x: 76.8,
        y: 17.5,
        size: 20,
        description: "base cutoff for filter B, identical in range and curve to CUTOFF A and fully independent unless linked.",
        tip: "set B an octave above A with SPREAD at zero for a classic stereo tilt, then let chaos wander each side separately.",
      },
      {
        id: "link-cutoff",
        label: "link cutoff",
        type: "switch",
        x: 50.0,
        y: 11.7,
        size: 9,
        description: [
          "independent: each cutoff knob moves its own lane",
          "linked: engaging the link first copies A to B; after that, moving either knob moves the other",
        ],
        tip: "link, then use SPREAD as your only stereo separation — the pair stays musically related as you sweep.",
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
        description: "same behavior as LINK CUTOFF, applied to the two RESONANCE knobs — A is copied to B on engage, then the pair tracks together.",
        tip: "link resonance but not cutoff when you want two differently tuned peaks with the same intensity.",
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
          "normal mode: bipolar scaling of CUTOFF A CV — at full, 10 V spans the normalized cutoff range",
          "1V/oct mode (context menu): this becomes tracking amount and direction — +1 passes one octave per volt, −1 tracks in reverse",
        ],
        tip: "for played resonance, enable 1V/oct tracking and turn this fully clockwise; the cutoff knob becomes the base tuning.",
      },
      {
        id: "cutoff-a-cv",
        label: "cutoff a cv",
        type: "jack",
        x: 31.1,
        y: 33.4,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic cutoff modulation for filter A, scaled by the attenuverter to its left. A mono CV is broadcast; a narrower poly CV holds its last channel for the remaining voices.",
        tip: "audio-rate CV works, but the fastest edges are softened by a short smoother.",
      },
      {
        id: "cutoff-b-cv",
        label: "cutoff b cv",
        type: "jack",
        x: 68.9,
        y: 33.4,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic cutoff modulation for filter B, scaled by the attenuverter to its right. Independent 1V/oct tracking is available for B in the context menu.",
        tip: "patch one pitch CV into both cutoff inputs with opposite attenuverter signs and the two lanes track in contrary motion.",
      },
      {
        id: "cutoff-b-atten",
        label: "cutoff b cv attenuverter",
        type: "knob",
        x: 89.1,
        y: 33.1,
        size: 10,
        description: "bipolar scaling for CUTOFF B CV, or tracking amount and direction when Filter B 1V/oct tracking is enabled.",
        tip: "mirror the A attenuverter for symmetric motion; invert it for a field that opens on one side as it closes on the other.",
      },
      {
        id: "resonance-a",
        label: "resonance a",
        type: "knob",
        x: 14.5,
        y: 49.4,
        size: 13,
        description: [
          "global ladder-style resonant feedback for lane A; the upper range crosses into stabilized self-oscillation",
          "in the Liquid character, resonant energy blooms the cutoff upward and then pulls it back — the seeking-and-settling motion the module is named for",
        ],
        tip: "raise resonance before touching COUPLE — the coupling only gets interesting once the peaks are audible.",
      },
      {
        id: "resonance-b",
        label: "resonance b",
        type: "knob",
        x: 85.5,
        y: 49.4,
        size: 13,
        description: "resonant feedback for lane B, independent of A unless LINK RESONANCE is engaged.",
        tip: "for the coupled bell, set both resonances high, feed a short impulse, and let SPREAD tune the two ringing peaks.",
      },
      {
        id: "resonance-a-cv",
        label: "resonance a cv",
        type: "jack",
        x: 32.2,
        y: 54.9,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic resonance modulation for A. At full positive attenuation, +10 V adds 1.0 to the raw setting — enough to cross the whole panel range — and negative attenuation subtracts.",
        tip: "a per-voice envelope here makes each note bloom its own peak rather than the whole chord swelling together.",
      },
      {
        id: "resonance-b-cv",
        label: "resonance b cv",
        type: "jack",
        x: 67.8,
        y: 54.9,
        size: 9,
        voltageRange: "±10 V · poly",
        description: "polyphonic resonance modulation for B with the same scaling as A's input.",
        tip: "modulate only B's resonance in Mid / Side routing and the sides shimmer while the center stays put.",
      },
      {
        id: "resonance-a-atten",
        label: "resonance a cv attenuverter",
        type: "knob",
        x: 14.5,
        y: 63.5,
        size: 10,
        description: "bipolar scaling for RESONANCE A CV.",
        tip: "small negative amounts from an envelope calm the peak on every attack and let it bloom back on the tail.",
      },
      {
        id: "resonance-b-atten",
        label: "resonance b cv attenuverter",
        type: "knob",
        x: 85.5,
        y: 63.5,
        size: 10,
        description: "bipolar scaling for RESONANCE B CV.",
        tip: "opposite signs on the two resonance attenuverters make the lanes trade intensity under one modulator.",
      },
      {
        id: "spread-cv",
        label: "spread cv",
        type: "jack",
        x: 32.2,
        y: 64.0,
        size: 9,
        voltageRange: "0–10 V · mono",
        description: "shared A/B separation control — 10 V adds the full three-octave spread on top of the knob. Global: only the first channel is read.",
        tip: "a slow triangle here breathes the two cutoffs apart and back together without either lane moving on its own.",
      },
      {
        id: "freeze-gate",
        label: "freeze gate",
        type: "jack",
        x: 67.8,
        y: 64.0,
        size: 9,
        voltageRange: "gate ≥ 1 V",
        description: "pauses both attractors while held at 1 V or above. A hold, not a reset — the field resumes from the exact values at which it stopped. Independent of the CRT click latch.",
        tip: "gate this from a sequencer so the chaos only moves between phrases.",
      },
      {
        id: "chaos-rate",
        label: "chaos rate",
        type: "knob",
        x: 50.0,
        y: 65.6,
        size: 11,
        description: [
          "speed of the Lorenz attractor from 0.01 Hz to 10 Hz — shared by both lanes and every voice",
          "the fourth polyphonic voice and every voice after it invert their assigned axis, so a large chord never marches as one block",
        ],
        tip: "below 0.1 Hz the field feels like weather; above 2 Hz it starts to sound like a modulation source.",
      },
      {
        id: "couple",
        label: "couple",
        type: "knob",
        x: 14.5,
        y: 76.4,
        size: 13,
        description: [
          "feeds the previous output of A into B and B into A. The return is saturated and its gain bounded before it re-enters the filters",
          "low values tie the stereo movement together; high values create circulating harmonics, interacting peaks, and controlled instability",
          "COUPLE stays active in every routing topology, so serial routing and cross-coupling can coexist",
        ],
        tip: "bring it up slowly with both resonances high — the lanes start answering one another around the last third of the travel.",
      },
      {
        id: "spread",
        label: "spread",
        type: "knob",
        x: 38.2,
        y: 76.4,
        size: 13,
        description: [
          "lowers A and raises B by equal octave ratios. At maximum the cutoffs sit three octaves apart — A 1.5 octaves below its setting, B 1.5 above",
          "a small fixed per-voice offset remains on top of the panel spread so chord peaks never stack perfectly",
        ],
        tip: "with both cutoffs linked, SPREAD is the whole stereo image — sweep it for a widening that is spectral rather than spatial.",
      },
      {
        id: "chaos-depth",
        label: "chaos depth",
        type: "knob",
        x: 61.8,
        y: 76.4,
        size: 13,
        description: [
          "scales how far the Lorenz motion moves the field. A and B receive different attractor axes for cutoff; a third axis handles the rest when the destination allows it",
          "the context-menu Chaos Destination decides what moves: cutoff only, cutoff plus opposing resonance, or the full field including subtle Form and Couple motion",
        ],
        tip: "start with Cutoff only — the full field is glorious but easy to overdo on a lead line.",
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
          "the full cascade and resonance path keep running at every position, so the three responses feel like one instrument rather than three modes",
          "with Opposed Form (context menu), B moves backward — lowpass against highpass at either end, meeting at bandpass in the center",
        ],
        tip: "opposing vowels: enable Opposed Form, park FORM near center, and modulate Form CV slowly.",
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
        description: "polyphonic audio input for lane A. If only one input is connected it is normalled to both lanes; a mono source is broadcast across the voice count supplied by the other input.",
        tip: "leave B IN empty for a true stereo filter on a mono source — SPREAD and chaos do the imaging.",
      },
      {
        id: "audio-b-in",
        label: "b in",
        type: "jack",
        x: 21.3,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic audio input for lane B. The wider audio input determines the channel count, up to 16 — CV cables alone do not create voices.",
        tip: "in Mid / Side routing, feed a true stereo pair here: A filters the mid, B filters the side.",
      },
      {
        id: "couple-cv",
        label: "couple cv",
        type: "jack",
        x: 32.8,
        y: 89.1,
        size: 9,
        voltageRange: "0–10 V · poly",
        description: "adds to the COUPLE knob at 10 V for the full range. Polyphonic: each voice can have its own coupling amount.",
        tip: "a per-voice velocity here makes hard-played notes ring the lanes into each other.",
      },
      {
        id: "chaos-depth-cv",
        label: "chaos depth cv",
        type: "jack",
        x: 44.3,
        y: 89.1,
        size: 9,
        voltageRange: "0–10 V · poly",
        description: "adds to CHAOS DEPTH at 10 V for the full range, per voice.",
        tip: "gate it from a slow LFO so the field alternates between still and roaming.",
      },
      {
        id: "chaos-rate-cv",
        label: "chaos rate cv",
        type: "jack",
        x: 55.7,
        y: 89.1,
        size: 9,
        voltageRange: "0.5 Hz/V · mono",
        description: "shared attractor speed — adds 0.5 Hz per volt from the first channel, then clamps to the 0.01–10 Hz range.",
        tip: "a brief positive pulse here whips the attractor into a new region of its orbit.",
      },
      {
        id: "form-cv",
        label: "form cv",
        type: "jack",
        x: 67.2,
        y: 89.1,
        size: 9,
        voltageRange: "0–10 V · poly",
        description: "adds to FORM at 10 V for the full lowpass-to-highpass travel, per voice. Opposed Form is preserved under CV.",
        tip: "a per-voice envelope here sweeps each note from lowpass to bandpass on its own timeline.",
      },
      {
        id: "audio-a-out",
        label: "a out",
        type: "jack",
        x: 78.7,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic output of lane A. Each liquid filter is linear to about ±8 V and bends toward ±12 V; a module-level guard catches any remaining coupled peaks beyond ±10 V.",
        tip: "in Mid / Side routing this is already the decoded left channel — no external decoder needed.",
      },
      {
        id: "audio-b-out",
        label: "b out",
        type: "jack",
        x: 90.2,
        y: 89.1,
        size: 9,
        voltageRange: "audio · poly",
        description: "polyphonic output of lane B, with the same channel count as the audio inputs.",
        tip: "serial routing still lands here — A into B means this jack carries both filters in cascade.",
      },
    ],
    contextMenu: [
      {
        id: "screen-theme",
        group: "screen",
        label: "screen theme",
        kind: "choice",
        values: ["follow shapetaker theme", "local phosphor color"],
        description: "Follow the shared Shapetaker display theme or pick a local phosphor color for the CRT. Rendering only — the audio never changes."
      },
      {
        id: "screen-particles",
        group: "screen",
        label: "screen particles",
        kind: "choice",
        values: ["bloom (brighter, flickering)", "stable (steadier, softer)"],
        description: [
          "bloom: brighter, and deliberately flickers at its hottest points",
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
          "parallel stereo: A and B process their inputs independently",
          "serial a into b: A's filtered output is added into B's driven input",
          "serial b into a: the reverse cascade",
          "mid / side: A filters the stereo mid, B filters the side, then the pair is decoded back to A/B outputs. COUPLE stays active in every topology"
        ]
      },
      {
        id: "opposed-form",
        group: "filter routing",
        label: "opposed form (reverse b)",
        kind: "toggle",
        description: "A follows FORM normally while B moves backward. At one end A is lowpass and B is highpass; they meet at bandpass in the center and exchange places at the other end. Form CV and full-field chaos preserve the opposition."
      },
      {
        id: "chaos-destination",
        group: "chaos",
        label: "chaos destination",
        kind: "choice",
        values: ["cutoff", "cutoff + resonance", "full filter field"],
        description: [
          "cutoff: only the two cutoff frequencies move",
          "cutoff + resonance: adds opposing resonance motion from the third attractor axis",
          "full filter field: cutoff and resonance, plus subtler movement of Form and Couple"
        ]
      },
      {
        id: "freeze-chaos",
        group: "chaos",
        label: "freeze chaos field",
        kind: "toggle",
        description: "The menu equivalent of clicking the CRT — latches both attractors (the main one and the slower drift source) at their present values until released."
      },
      {
        id: "filter-character",
        group: "filter character",
        label: "filter character",
        kind: "choice",
        values: ["still", "liquid", "volatile"],
        description: [
          "still: removes the level-dependent movement while keeping the filter, resonance, saturation, and chaos",
          "liquid: the calibrated response — transients breathe the cutoff upward, resonant blooms pull it back down",
          "volatile: exaggerates the breath, bloom, and sweep grip"
        ]
      },
      {
        id: "tracking-a",
        group: "cutoff cv mode",
        label: "filter a 1v/oct tracking",
        kind: "toggle",
        description: "Changes CUTOFF A CV from normalized modulation to pitch tracking. The attenuverter becomes tracking amount and direction: +1 is one octave per volt, −1 tracks in reverse."
      },
      {
        id: "tracking-b",
        group: "cutoff cv mode",
        label: "filter b 1v/oct tracking",
        kind: "toggle",
        description: "The same pitch-tracking mode for CUTOFF B CV, set independently of A."
      }
    ],
    manual: [
      {
        title: "liquid filters",
        body: "Each lane cascades three 2-pole state-variable stages at 4× oversampling with a global ladder-style resonance return, driven deliberately into asymmetric saturation while protecting the low end from the feedback loop. FORM crossfades the real responses inside that core — 6-pole lowpass, resonant bandpass, 2-pole highpass — so the whole cascade keeps running at every position. In the Liquid character, transients breathe the cutoff upward and resonant blooms pull it back down."
      },
      {
        title: "the lorenz field",
        body: "A Lorenz attractor supplies three related, non-repeating signals: A and B receive different axes for cutoff, and the third axis moves resonance, Form, and Couple when the destination permits. CHAOS DEPTH scales the motion, CHAOS RATE runs 0.01–10 Hz, and a second, slower attractor adds microscopic drift. Click the CRT or hold FREEZE GATE to latch the field in place — a hold, never a reset."
      },
      {
        title: "spread, couple, routing",
        body: "SPREAD lowers A and raises B by equal ratios, up to three octaves apart. COUPLE circulates each lane's previous output into the other through a saturated, bounded return, and stays active in every topology: parallel, serial in either order, or Mid / Side, where A filters the center and B the width. Sixteen voices follow the audio inputs; cutoff, resonance, Couple, Depth, and Form CV are per voice, while Rate, Spread, and Freeze are global."
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
    subtitle: "dual peak meter with vu scales and mechanical needle ballistics — polyphonic detection, transparent pass-through",
    summary: "Two watchful needles with the inertia of a real movement: 15 ms rise, 450 ms fall, calibrated so a full-scale ±10 V signal reaches the red edge at +3 VU. Every input sample and every polyphonic channel is copied straight to the matching output.",
    category: "vcv rack module",
    status: "vu meter",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Gauge,
    hp: 10,
    panelImage: {
      src: "/modules/specula/panel-v4.webp",
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
          "dial spans −20 VU to +3 VU. The detector reads absolute peak voltage with ±10 V peak as Rack full scale",
          "0 VU: −3 dBFS, about 7.08 V peak — the center of the needle travel",
          "+3 VU: 0 dBFS, 10 V peak — the red edge. A standard ±5 V audio signal reads about −3 VU",
          "the needle rises with a 15 ms time constant and falls with 450 ms: fast enough to reveal a transient, slow enough to read without vibrating",
        ],
        tip: "the red half of the dial is the final 3 dB of headroom — if it lives there, your interface input is about to clip.",
      },
      {
        id: "right-meter",
        label: "right meter",
        type: "meter",
        x: 50.0,
        y: 63.0,
        size: 72,
        description: [
          "identical scale and ballistics to the left meter, evaluated independently — there is no L-to-R normalization",
          "with a polyphonic cable, the needle follows the hottest channel, so one loud voice cannot hide inside a chord",
          "dial illumination is set in the context menu (factory 62%) and affects the artwork only",
        ],
        tip: "insert one side into a poly cable to confirm that at least one voice is crossing the threshold, even if the meter cannot say which.",
      },
      {
        id: "left-in",
        label: "l in",
        type: "jack",
        x: 18.3,
        y: 89.1,
        size: 16,
        voltageRange: "any · poly ≤16",
        description: "independent mono or polyphonic input for the left meter. Slow control voltages meter too — the detector uses absolute magnitude, so positive and negative swings move the needle the same way.",
        tip: "an unpatched input gives its output zero channels rather than a silent mono cable.",
      },
      {
        id: "right-in",
        label: "r in",
        type: "jack",
        x: 40.1,
        y: 89.1,
        size: 16,
        voltageRange: "any · poly ≤16",
        description: "independent input for the right meter. Patching only L does not feed R — each side must be patched on its own.",
        tip: "meter a bipolar LFO here to watch its excursion without an oscilloscope.",
      },
      {
        id: "left-out",
        label: "l out",
        type: "jack",
        x: 62.0,
        y: 89.1,
        size: 16,
        voltageRange: "= input",
        description: "an exact per-sample copy of L IN, including every polyphonic channel. No filtering, gain, saturation, or delay — Specula can sit anywhere in a chain.",
        tip: "place it immediately before your audio interface module so the red half of the dial means what it says.",
      },
      {
        id: "right-out",
        label: "r out",
        type: "jack",
        x: 83.8,
        y: 89.1,
        size: 16,
        voltageRange: "= input",
        description: "an exact per-sample copy of R IN with its channel count preserved.",
        tip: "bit-transparent, so it is safe on a recording bus.",
      },
    ],
    contextMenu: [
      {
        id: "screen-brightness",
        group: "meter display",
        label: "screen brightness",
        kind: "slider",
        description: "Sets the dial illumination from dark to fully lit. The factory setting is 62%. Artwork only — it does not alter the needle or the signal path."
      }
    ],
    manual: [
      {
        title: "scale and calibration",
        body: "Each dial spans −20 VU to +3 VU. The detector reads absolute peak voltage against Rack's ±10 V full scale: 0 VU is −3 dBFS (about 7.08 V peak) at the center of the travel, +3 VU is 0 dBFS at the red edge, and a standard ±5 V signal sits near −3 VU. The final three decibels occupy the red half of the scale, so remaining headroom is easy to see."
      },
      {
        title: "ballistics",
        body: "An electronic peak detector feeds a display smoother that behaves like a mechanical movement: the needle rises with a 15 ms time constant and falls with 450 ms. It is peak-oriented metering with vintage motion, not a standards-compliant RMS VU — a steady sine and a sharp transient with the same peak can look different."
      },
      {
        title: "polyphony and pass-through",
        body: "Each side accepts up to 16 channels and displays the largest absolute voltage on any active channel. The outputs are direct copies of the inputs with the exact channel count preserved, and the two sides are fully independent — no L-to-R normalization, no gain, no delay."
      }
    ]
  },
  {
    slug: "utility-panel",
    name: "utility panel",
    subtitle: "a blank panel that knows when the gap is the wrong size — resizable from 2 to 64 hp, with auto-fit to its neighbors",
    summary: "Fills the unused space between modules without a drawer full of fixed-width blanks. Drag either edge to resize in whole-HP steps, or double-click to fit the surrounding gap. The leather grain stays at a consistent scale and the width is saved with the patch.",
    category: "vcv rack module",
    status: "resizable blank",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Square,
    hp: 2,
    panelImage: {
      src: "/modules/utility-panel/panel-v2.webp",
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
          "a narrow strip along each edge is the resize handle. Drag the right edge to move the right boundary while the left stays put; drag the left edge to move the left boundary while the right stays put",
          "width is rounded to the nearest whole HP and clamped between 2 HP and 64 HP",
          "Rack still owns collision checking — if a requested width would overlap another module, the panel returns to its previous size and position",
        ],
        tip: "grab the edge closest to the module you want to stay anchored.",
      },
      {
        id: "panel-body",
        label: "panel body",
        type: "meter",
        x: 50.0,
        y: 55.0,
        size: 90,
        description: [
          "double-click anywhere on the body (or either edge) to run auto-fit: the panel finds the nearest module ending to its left and the nearest module beginning to its right, moves to the left boundary, and fills the measured space",
          "the rack's left edge (x = 0) can serve as the left boundary; the right side must be bounded by a module, so an open-ended row leaves the panel unchanged",
          "the leather background tiles at a fixed density instead of stretching, and the screws stay centered on the current width",
        ],
        tip: "rearranged the row? double-click the blank and it re-measures the gap.",
      },
      {
        id: "placement",
        label: "placement behavior",
        type: "meter",
        x: 50.0,
        y: 80.0,
        size: 90,
        description: [
          "a new instance enters at 2 HP and, during its first few display frames, expands to fill a bounded gap on the same row",
          "a panel loaded from a saved patch restores its saved width and does not auto-fit over the recalled layout",
          "neighbors displaced substantially above or below the panel are ignored — only modules on the same rack row count",
        ],
        tip: "drop it into the hole first, then add the modules on either side — it will size itself when you double-click.",
      },
    ],
    contextMenu: [
      {
        id: "fit-gap",
        group: "sizing",
        label: "fit to surrounding gap",
        kind: "toggle",
        description: "Runs the same measurement used when a new Utility Panel is placed: nearest module to the left, nearest module to the right, whole-HP rounding, 64 HP cap."
      }
    ],
    manual: [
      {
        title: "resizing",
        body: "Drag either edge to resize. The right handle moves the right boundary with the left fixed; the left handle does the reverse. Width rounds to whole HP between 2 and 64. Rack keeps collision checking, so a size that would overlap a neighbor simply reverts."
      },
      {
        title: "auto-fit",
        body: "Double-click the panel or choose Fit to surrounding gap. The panel finds the nearest module ending to its left and the nearest beginning to its right, snaps to the left boundary, and fills the gap. The rack edge counts as a left boundary; an open right side leaves the width unchanged."
      },
      {
        title: "recall and appearance",
        body: "A fresh panel starts at 2 HP and auto-fits once; a panel restored from a patch keeps its saved width. The leather grain is tiled at a fixed density rather than stretched, and the upper and lower screws remain centered at every width."
      }
    ]
  },
  {
    slug: "incantation",
    name: "incantation",
    subtitle: "eight-band resonant filter array with a 24-pattern animation sequencer, envelope morphing, and analog-modeled drive",
    summary: "Eight resonant bands, each gated by its own envelope and sequenced by selectable rhythmic patterns. A dynamic resonator rather than a static equalizer — it gives any source motion and vocalic character, and folds a mono input into a bouncing stereo field.",
    category: "vcv rack module",
    status: "resonant filter array",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Layers,
    hp: 20,
    panelImage: {
      src: "/modules/incantation/panel-v4.webp",
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
          "sets the level feeding the array and, at the same time, how hard the summed bank output is saturated. Gain is applied before the filters; the analog-modeled curve after them, so pushing past center adds harmonics and compression without smearing the bands together",
          "0–200%, center is unity",
        ],
        tip: "center to start; past noon with High Q is where it begins to sound like a circuit.",
      },
      {
        id: "bank",
        label: "bank",
        type: "switch",
        x: 30.9,
        y: 16.0,
        size: 8,
        description: "selects pattern bank A or B — 12 patterns each, 24 in all. Pattern 1 in both banks is static (no animation). The bank switch never overrides the sweep mode.",
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
        description: "blends the dry input with the filtered, animated wet signal. The wet path carries inherent makeup gain so narrow, gated bands stand level with the bypassed signal.",
        tip: "start at 100% to hear the array, then back off for parallel vowels under the original.",
      },
      {
        id: "tap",
        label: "tap tempo",
        type: "switch",
        x: 69.1,
        y: 16.0,
        size: 9,
        description: "tap twice or more to set the sequencer tempo; the lamp blinks the animation rate. The tapped tempo stays active until the Rate knob is moved or Rate CV is applied. Clear Tap Tempo lives in the context menu.",
        tip: "tap in time with the track, then leave the Rate knob alone.",
      },
      {
        id: "output",
        label: "output",
        type: "knob",
        x: 88.3,
        y: 12.5,
        size: 12,
        description: "final makeup gain, 0–200%. Headroom limiting at the output stage prevents harsh digital clipping under extreme Drive and High Q.",
        tip: "trim here rather than at Drive when you want the same color at a lower level.",
      },
      {
        id: "rate",
        label: "rate",
        type: "knob",
        x: 11.7,
        y: 28.8,
        size: 12,
        description: [
          "animation sequencer speed from 0.08 Hz to 4.0 Hz; each revolution advances eight sequencer steps",
          "in Internal LFO mode the frequency sweep's base speed follows this rate too",
        ],
        tip: "below 0.3 Hz the patterns read as slow vowels; above 2 Hz they become tremolo rhythms.",
      },
      {
        id: "freq",
        label: "freq voicing",
        type: "switch",
        x: 30.9,
        y: 30.7,
        size: 8,
        description: [
          "mids: all eight bands are bandpass, voiced from 200 Hz to 3.4 kHz — guitars, synths, vocal articulation",
          "bass: band 1 becomes a 110 Hz lowpass to protect the fundamental while bands 2–8 run bandpass up to 1.8 kHz — bass instruments and drum loops",
        ],
        tip: "BASS with a drum loop keeps the kick intact while the top bounces.",
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
        description: "12-position rotary switch selecting a pattern within the active bank. Position 1 is always static, letting the module work as a fixed filter bank or as eight externally sequenced bands.",
        tip: "external sequencing: pattern 1, sliders at zero, gates or envelopes into the eight FILTER CV inputs.",
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
          "internal lfo: an internal sine sweeps all band frequencies together for phaser-like motion; its speed follows Rate and the LFO/SWEEP CV input raises or lowers it",
          "external sweep: the internal oscillator stops and a signal at LFO/SWEEP CV shifts the whole bank up or down directly — nothing patched, no sweep",
        ],
        tip: "external sweep with an envelope is a vowel that opens on every hit.",
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
          "0–4: sharp attack with a quick, choppy decay",
          "5: attack and decay equal — smooth, tremolo-like crossfades",
          "6–10: slow swelling attack with an abrupt decay, like reversed audio",
        ],
        tip: "sit at 7 for backwards pads; drop to 2 when you want the pattern to read as a rhythm.",
        diagrams: [
          { id: "env-choppy", label: "choppy", icon: "Zap", rotation: -135 },
          { id: "env-tremolo", label: "tremolo", icon: "Waves", rotation: 0 },
          { id: "env-swell", label: "reverse swell", icon: "ChevronUp", rotation: 135 },
        ],
      },
      { id: "fader-1", label: "filter 1", type: "knob", x: 9.8, y: 54.9, size: 7, description: "maximum level of band 1 — the lowest band, a 110 Hz lowpass in BASS voicing. The cap glows with the band's activity in the theme color.", tip: "the context menu can set every slider to 0%, 50%, 100%, or a random scatter in one move." },
      { id: "fader-2", label: "filter 2", type: "knob", x: 21.3, y: 54.9, size: 7, description: "maximum level of band 2. Even-numbered bands pan right when only the left input is patched and both outputs are used.", tip: "pull the even bands down for a lopsided image." },
      { id: "fader-3", label: "filter 3", type: "knob", x: 32.8, y: 54.9, size: 7, description: "maximum level of band 3 (odd — left side in the mono-to-stereo topology).", tip: "odd bands high, even bands low: the animation leans left." },
      { id: "fader-4", label: "filter 4", type: "knob", x: 44.3, y: 54.9, size: 7, description: "maximum level of band 4.", tip: "the middle bands carry most of the vowel." },
      { id: "fader-5", label: "filter 5", type: "knob", x: 55.7, y: 54.9, size: 7, description: "maximum level of band 5.", tip: "a single band at full with the rest at zero is a resonant ping under any pattern." },
      { id: "fader-6", label: "filter 6", type: "knob", x: 67.2, y: 54.9, size: 7, description: "maximum level of band 6.", tip: "High Q narrows every band — revisit the sliders after switching it on." },
      { id: "fader-7", label: "filter 7", type: "knob", x: 78.7, y: 54.9, size: 7, description: "maximum level of band 7.", tip: "the upper bands are where MIDS voicing gets its sibilance." },
      { id: "fader-8", label: "filter 8", type: "knob", x: 90.2, y: 54.9, size: 7, description: "maximum level of band 8 — the highest band, 3.4 kHz in MIDS or 1.8 kHz in BASS.", tip: "roll it back on bright sources before reaching for Drive." },
      { id: "filter-cv-1", label: "filter 1 cv", type: "jack", x: 9.8, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 1, added to its slider. The context menu can bypass all eight CV inputs at once.", tip: "external envelopes here replace the internal patterns entirely when Pattern is at 1." },
      { id: "filter-cv-2", label: "filter 2 cv", type: "jack", x: 21.3, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 2.", tip: "a Euclidean gate per band is a rhythm no internal pattern has." },
      { id: "filter-cv-3", label: "filter 3 cv", type: "jack", x: 32.8, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 3.", tip: "negative CV pulls a band below its slider — useful for carving a hole on the beat." },
      { id: "filter-cv-4", label: "filter 4 cv", type: "jack", x: 44.3, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 4.", tip: "one LFO into two neighboring bands, one inverted, hands the vowel back and forth." },
      { id: "filter-cv-5", label: "filter 5 cv", type: "jack", x: 55.7, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 5.", tip: "sample-and-hold here scatters the resonance on every step." },
      { id: "filter-cv-6", label: "filter 6 cv", type: "jack", x: 67.2, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 6.", tip: "slow ramps across the eight inputs make a formant sweep the patterns cannot." },
      { id: "filter-cv-7", label: "filter 7 cv", type: "jack", x: 78.7, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 7.", tip: "gate the top two bands from a hi-hat pattern for articulated air." },
      { id: "filter-cv-8", label: "filter 8 cv", type: "jack", x: 90.2, y: 78.6, size: 8.5, voltageRange: "±5 V", description: "direct level control for band 8.", tip: "Filter CV → Bypass in the context menu silences all eight jacks without unpatching." },
      { id: "in-l", label: "audio l / mono", type: "jack", x: 9.8, y: 89.1, size: 8.5, voltageRange: "audio · poly ≤16", description: "left or mono input. Patch only this jack and take both outputs for the mono-to-stereo topology: odd bands pan left, even bands pan right, and the animation bounces across the field. Polyphonic signals are processed per channel in true stereo.", tip: "the signature move: left in, both outs." },
      { id: "in-r", label: "audio r", type: "jack", x: 21.3, y: 89.1, size: 8.5, voltageRange: "audio · poly ≤16", description: "right input for stereo operation — patch both inputs for independent left and right processing.", tip: "with R patched the odd/even panning is off and each side runs its own array." },
      { id: "env-cv", label: "envelope cv", type: "jack", x: 32.8, y: 89.1, size: 8.5, voltageRange: "cv", description: "modulates the Envelope shape from choppy through tremolo to reverse swell.", tip: "an LFO here morphs the same pattern between rhythm and swell." },
      { id: "rate-cv", label: "rate cv", type: "jack", x: 44.3, y: 89.1, size: 8.5, voltageRange: "1 V/oct", description: "modulates animation speed at 1V/oct — each volt doubles the rate, scaling the knob rather than adding to it. A ±5 V LFO sweeps five octaves from any knob position. Applying CV releases a tapped tempo.", tip: "a sequencer step of +1 V is exactly double-time." },
      { id: "sweep-cv", label: "lfo / sweep cv", type: "jack", x: 55.7, y: 89.1, size: 8.5, voltageRange: "cv", description: "in Internal LFO mode: raises or lowers the sweep oscillator's rate. In External Sweep mode: shifts the whole filter bank up or down directly. Smoothed by a ~2 ms one-pole filter so audio-rate input stays stable.", tip: "external sweep + envelope follower on the input = a talk-box that tracks dynamics." },
      { id: "mix-cv", label: "mix cv", type: "jack", x: 67.2, y: 89.1, size: 8.5, voltageRange: "cv", description: "modulates the dry/wet blend.", tip: "gate it from the pattern's own downbeat for a wet burst per bar." },
      { id: "out-l", label: "left / mono out", type: "jack", x: 78.7, y: 89.1, size: 8.5, voltageRange: "audio · poly", description: "main left output. With only the right output unpatched, this carries the full mono bank.", tip: "mono out on its own is a classic fixed filter bank with a sequencer." },
      { id: "out-r", label: "right out", type: "jack", x: 90.2, y: 89.1, size: 8.5, voltageRange: "audio · poly", description: "patching this jack selects a stereo topology — it does not fold polyphonic voices to mono. Both outputs stay polyphonic.", tip: "patch it even on a mono source: that is what turns on the odd/even panning." },
    ],
    contextMenu: [
      {
        id: "resonance",
        group: "filter resonance",
        label: "filter resonance",
        kind: "choice",
        values: ["normal", "high q"],
        description: "High Q narrows the bands significantly for sharper, more pronounced resonances — pinging and pronounced vowels."
      },
      {
        id: "filter-cv",
        group: "filter cv",
        label: "filter cv",
        kind: "choice",
        values: ["active", "bypass"],
        description: "Temporarily ignore all patched Filter 1–8 CV cables without unpatching them."
      },
      {
        id: "level-presets",
        group: "filter level presets",
        label: "filter level presets",
        kind: "choice",
        values: ["set all faders to 0%", "set all faders to 50%", "set all faders to 100%", "randomize filters"],
        description: "Instantly set all eight sliders, or scatter them randomly."
      },
      {
        id: "clear-tap",
        group: "tap tempo",
        label: "clear tap tempo",
        kind: "toggle",
        description: "Manually clears the internal tap-tempo clock and returns control to the Rate knob."
      },
      {
        id: "screen-theme",
        group: "screen theme",
        label: "screen theme",
        kind: "choice",
        values: ["amber", "phosphor", "and the shared shapetaker themes"],
        description: "Adjusts the illumination color of the slider caps and rate lamp."
      }
    ],
    manual: [
      {
        title: "the filter array",
        body: "Eight topology-preserving state-variable filters. In MIDS every band is bandpass from 200 Hz to 3.4 kHz; in BASS band 1 becomes a 110 Hz lowpass to guard the fundamental while the rest run up to 1.8 kHz. Each band has a slider for its maximum amplitude and a ±5 V CV input. Drive gains the input before the array and saturates the summed output after it, so harmonics arrive without smearing the bands together."
      },
      {
        title: "animation sequencer",
        body: "Twenty-four patterns across banks A and B animate the band VCAs from 0.08 to 4 Hz, with tap tempo and 1V/oct rate CV. Pattern 1 is always static. Envelope morphs each band's gate from sharp and choppy through equal tremolo crossfades to slow reverse-style swells. Internal LFO mode sweeps all bands together like a phaser; External Sweep hands that motion to a CV input."
      },
      {
        title: "stereo imaging",
        body: "Patch only the left input and take both outputs: bands 1, 3, 5, and 7 route left, bands 2, 4, 6, and 8 route right, and the animation bounces across the stereo field. Patching the right input gives true stereo with independent arrays per side. Up to sixteen polyphonic channels per side are processed separately and both outputs stay polyphonic."
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
            detail: "Leave the right input empty — that is what enables odd-left, even-right routing. Choose MIDS and an animated pattern in bank A, then set Rate around 0.5 Hz.",
            cableIds: ["audio"]
          },
          {
            instruction: "Take both outputs to your mixer as a stereo pair.",
            detail: "Patching the right output selects the stereo topology. The animation now hands the vowels back and forth across the field.",
            cableIds: ["out-l", "out-r"]
          },
          {
            instruction: "Flip Sweep Mode to External and patch an envelope follower into LFO / SWEEP CV.",
            detail: "The internal sine stops and the follower shifts the whole bank up on loud passages and back down as the pad decays — a formant that tracks dynamics. Nudge Envelope toward 7 for swells.",
            cableIds: ["sweep"]
          }
        ]
      }
    ]
  },
  {
    slug: "torsion",
    name: "torsion",
    subtitle: "cz-inspired phase distortion oscillator — five warp shapes, dual lines with cross-mod and ring mod, a six-stage rate/level dcw envelope, sub, and bbd chorus",
    summary: "Phase distortion in the CZ tradition, expanded for the modular world. The carrier is always a pure sine; every harmonic comes from warping its phase under a six-stage envelope whose stages are true rate/level pairs. Two lines with five ratios, bidirectional sync, feedback, and a bucket-brigade chorus finish the voice.",
    category: "vcv rack module",
    status: "phase distortion osc",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Waves,
    hp: 18,
    panelImage: {
      src: "/modules/torsion/panel-v4.webp",
      width: 1350,
      height: 1900,
      alt: "torsion vcv rack module panel"
    },
    media: {},
    typeplate: {
      unit: "UNIT 03190",
      type: "PHASE ABBERATION",
    },
    controls: [
      { id: "coarse", label: "octave", type: "knob", x: 11.5, y: 14.8, size: 13, description: "coarse pitch in whole octaves, ±2, on top of the V/OCT input.", tip: "drop an octave and raise SUB for the bass patches the CZ was famous for.",
        diagrams: [
          { id: "oct--2", label: "−2 oct", icon: "ChevronsDown", rotation: -135 },
          { id: "oct-0", label: "0", icon: "Minus", rotation: 0 },
          { id: "oct-+2", label: "+2 oct", icon: "ChevronsUp", rotation: 135 },
        ] },
      { id: "sub", label: "sub level", type: "knob", x: 33.1, y: 14.8, size: 13, description: "level of the dedicated sub oscillator, a sub-octave fundamental under line A. 0–200%.", tip: "a little sub anchors a resonant warp that would otherwise float." },
      { id: "symmetry", label: "symmetry", type: "knob", x: 54.7, y: 14.8, size: 13, description: "shifts the bias of the distortion curve. 50% is neutral; below and above center bias the warp in opposite directions, dynamically altering the harmonic structure.", tip: "off-center symmetry on the Resonant warp is the difference between a filter sweep and a vowel." },
      { id: "sync", label: "bidirectional sync", type: "switch", x: 72.4, y: 14.8, size: 9, description: [
          "off: both lines free-run",
          "a resets b: line B restarts whenever A completes a cycle — locked harmonic structures at integer ratios, aggressive repeating contours at 3:2 or with Detune",
          "b resets a: the reverse relationship",
        ], tip: "sync plus a 3:2 ratio plus DCW envelope is the classic scream.",
        diagrams: [
          { id: "sync-off", label: "off", icon: "Minus" },
          { id: "sync-ab", label: "a resets b", icon: "ArrowRight" },
          { id: "sync-ba", label: "b resets a", icon: "RefreshCw" },
        ] },
      { id: "detune", label: "detune", type: "knob", x: 88.5, y: 14.8, size: 13, description: "adds up to 20 cents of fine upward tuning to line B around its selected ratio.", tip: "5–8 cents at 1:1 is chorus without the chorus." },
      { id: "line-a-warp", label: "line a warp", type: "knob", x: 18.8, y: 28.2, size: 12, description: [
          "single sine: the classic phase distortion curve",
          "resonant: emulates a resonant filter sweep with synthetic peaks",
          "double sine: a hollow, square-like timbre",
          "saw pulse: a hybrid with biting, brass-like overtones",
          "pulse: sharp, narrow pulses for cutting leads",
        ], tip: "the carrier stays a pure sine — every harmonic you hear is the warp, not an added wave.",
        diagrams: [
          { id: "wa-sine", label: "single sine", icon: "Waves", rotation: -135 },
          { id: "wa-res", label: "resonant", icon: "Activity", rotation: -67.5 },
          { id: "wa-dbl", label: "double sine", icon: "Repeat", rotation: 0 },
          { id: "wa-sawp", label: "saw pulse", icon: "Zap", rotation: 67.5 },
          { id: "wa-pulse", label: "pulse", icon: "Square", rotation: 135 },
        ] },
      { id: "line-b-warp", label: "line b warp", type: "knob", x: 50.0, y: 28.2, size: 12, description: "the same five warp shapes, selected independently for line B.", tip: "resonant on A and pulse on B with cross phase mod is a bell that bites." },
      { id: "line-b-ratio", label: "line b ratio", type: "switch", x: 72.4, y: 27.5, size: 9, description: "five-position toggle setting line B relative to A: 1:2 (octave below), 1:1, 3:2 (fifth), 2:1 (octave above), or 3:1 (octave plus fifth).", tip: "3:2 with sync engaged is where the CZ lineage lives.",
        diagrams: [
          { id: "ratio-12", label: "1:2", icon: "ChevronsDown" },
          { id: "ratio-11", label: "1:1", icon: "Minus" },
          { id: "ratio-32", label: "3:2", icon: "ChevronUp" },
          { id: "ratio-21", label: "2:1", icon: "ChevronsUp" },
          { id: "ratio-31", label: "3:1", icon: "Plus" },
        ] },
      { id: "stage-rate", label: "stage rate", type: "knob", x: 88.5, y: 30.2, size: 13, description: "master speed for the whole six-stage contour, ×0.25 to ×4. Design the shape with the sliders; perform the overall duration here. Its CV input makes envelope-time tracking a one-cable patch.", tip: "key-follow (context menu) shortens the envelope as pitch rises, like the hardware." },
      { id: "torsion", label: "torsion", type: "knob", x: 11.5, y: 45.9, size: 13, description: "the depth of the phase distortion — how far the DCW envelope can warp the sine. A fixed line (context menu) still follows this knob and its CV; only the envelope movement is bypassed.", tip: "at zero you get a sine no matter what the envelope does." },
      { id: "level-1", label: "stage 1 level", type: "knob", x: 25.6, y: 44.0, size: 8, description: "target level of envelope stage 1. The envelope interpolates smoothly between the six levels; the slider glows with its stage's activity.", tip: "stage 1 high, stage 2 low, stage 3 high is the two-peak brass attack." },
      { id: "level-2", label: "stage 2 level", type: "knob", x: 35.4, y: 44.0, size: 8, description: "target level of stage 2.", tip: "a dip here after a high stage 1 is the CZ 'wow'." },
      { id: "level-3", label: "stage 3 level", type: "knob", x: 45.1, y: 44.0, size: 8, description: "target level of stage 3.", tip: "the default sustain stage — hold it where the body of the note should sit." },
      { id: "level-4", label: "stage 4 level", type: "knob", x: 54.9, y: 44.0, size: 8, description: "target level of stage 4.", tip: "stages between the sustain and end stage become a sculpted, multi-segment release." },
      { id: "level-5", label: "stage 5 level", type: "knob", x: 64.6, y: 44.0, size: 8, description: "target level of stage 5.", tip: "a rise here during release gives a note that blooms as it leaves." },
      { id: "level-6", label: "stage 6 level", type: "knob", x: 74.4, y: 44.0, size: 8, description: "target level of stage 6 — the end stage by default.", tip: "set End stage earlier in the context menu to use fewer stages." },
      { id: "feedback", label: "feedback", type: "knob", x: 88.5, y: 45.9, size: 13, description: "feeds the output back into the oscillator phase for aggressive, tearing overtones. The source is the clean oscillators or the final output, chosen in the context menu.", tip: "if aliasing shows up here, raise Oversampling before taming the knob." },
      { id: "torsion-atten", label: "torsion cv attenuverter", type: "knob", x: 11.5, y: 59.7, size: 10, description: "bipolar scaling for TORSION CV.", tip: "negative amounts from an envelope make the note clean up as it opens." },
      { id: "feedback-atten", label: "feedback cv attenuverter", type: "knob", x: 88.5, y: 59.7, size: 10, description: "bipolar scaling for FEEDBACK CV.", tip: "velocity to feedback is the cheapest way to make hard notes tear." },
      { id: "torsion-cv", label: "torsion cv", type: "jack", x: 11.5, y: 69.8, size: 9, voltageRange: "cv", description: "modulates the overall phase distortion depth through its attenuverter, on top of the knob and envelope.", tip: "an LFO here under a slow envelope is a wobble that stays inside the contour." },
      { id: "rate-1", label: "stage 1 rate", type: "knob", x: 25.6, y: 70.5, size: 8, description: "speed of stage 1, from ×0.125 (eight times slower) at the bottom through ×1 at center to ×8 at the top. Each stage is a true rate/level pair, as on the hardware.", tip: "fast stage 1 into a slow stage 2 is the pluck-then-bloom." },
      { id: "rate-2", label: "stage 2 rate", type: "knob", x: 35.4, y: 70.5, size: 8, description: "speed of stage 2.", tip: "slow it right down for the swell after the attack." },
      { id: "rate-3", label: "stage 3 rate", type: "knob", x: 45.1, y: 70.5, size: 8, description: "speed of stage 3.", tip: "with Loop on, the rates from stage 1 to the sustain stage set the cycle's rhythm." },
      { id: "rate-4", label: "stage 4 rate", type: "knob", x: 54.9, y: 70.5, size: 8, description: "speed of stage 4.", tip: "a stuttering fall: alternate fast and slow rates through the release stages." },
      { id: "rate-5", label: "stage 5 rate", type: "knob", x: 64.6, y: 70.5, size: 8, description: "speed of stage 5.", tip: "rates below center lengthen the tail without touching STAGE RATE." },
      { id: "rate-6", label: "stage 6 rate", type: "knob", x: 74.4, y: 70.5, size: 8, description: "speed of stage 6.", tip: "very fast final stages can click — the click suppressor helps, but sharp warps still snap." },
      { id: "osc-interaction", label: "oscillator interaction", type: "switch", x: 11.5, y: 78.6, size: 9, description: [
          "independent: A and B run autonomously and mix at the output",
          "cross phase mod: mutual phase modulation between the lines — bell-like or chaotic",
          "b dcw follows a: line B's distortion depth is modulated by A's output",
          "ring mod: the lines multiply — metallic, inharmonic sums and differences",
        ], tip: "cross phase mod with heavy feedback wants 8× oversampling.",
        diagrams: [
          { id: "int-ind", label: "independent", icon: "Minus" },
          { id: "int-xpm", label: "cross phase mod", icon: "Shuffle" },
          { id: "int-dcw", label: "b dcw follows a", icon: "ArrowRight" },
          { id: "int-ring", label: "ring mod", icon: "Circle" },
        ] },
      { id: "feedback-cv", label: "feedback cv", type: "jack", x: 88.5, y: 69.8, size: 9, voltageRange: "cv", description: "modulates the feedback amount through its attenuverter.", tip: "gate it from the EDGE output for feedback that only tears during the attack." },
      { id: "chorus", label: "chorus", type: "switch", x: 88.5, y: 78.6, size: 9, description: "engages the integrated bucket-brigade style chorus, widening the stereo image at MAIN L / R and adding movement.", tip: "off for bass, on for everything the CZ did with its built-in chorus.",
        diagrams: [
          { id: "chorus-off", label: "off", icon: "Minus", state: "down" },
          { id: "chorus-on", label: "on", icon: "Waves", state: "up" },
        ] },
      { id: "voct", label: "v/oct", type: "jack", x: 10.9, y: 89.1, size: 9, voltageRange: "1 V/oct", description: "standard pitch tracking input for both lines and the sub.", tip: "key follow in the context menu also scales DCW depth and envelope time from this pitch." },
      { id: "gate", label: "gate", type: "jack", x: 24.4, y: 89.1, size: 9, voltageRange: "gate", description: "drives the DCW envelope: advances to the configured sustain stage while high, holds, and walks from sustain to the end stage on release. With Loop on, cycles from stage 1 to the sustain stage while held.", tip: "sustain = end gives classic hold-and-release; sustain before end gives a multi-segment release." },
      { id: "stage-trig", label: "stage trig", type: "jack", x: 37.2, y: 89.1, size: 9, voltageRange: "trigger", description: "with no Gate cable, fires the six-stage envelope as a one-shot. With Gate also patched, a trigger while the gate is high restarts the envelope while Gate keeps control of sustain and release.", tip: "a trigger with nothing at Gate and Loop on turns the envelope into a free-running shape LFO." },
      { id: "stage-rate-cv", label: "stage rate cv", type: "jack", x: 50.0, y: 89.1, size: 9, voltageRange: "cv", description: "modulates the overall speed of the envelope sequence.", tip: "velocity here makes hard notes faster, soft notes slower." },
      { id: "main-l", label: "main l", type: "jack", x: 62.8, y: 89.1, size: 9, voltageRange: "audio", description: "left audio output. With Chorus active the pair carries a wide stereo image; without it both sides are identical.", tip: "use it alone for mono bass." },
      { id: "main-r", label: "main r", type: "jack", x: 75.7, y: 89.1, size: 9, voltageRange: "audio", description: "right audio output.", tip: "the chorus's stereo offset lives between these two jacks." },
      { id: "edge", label: "edge", type: "jack", x: 88.5, y: 89.1, size: 9, voltageRange: "0–10 V", description: "the DCW envelope as a 0–10 V signal for modulating external modules.", tip: "send it to a filter so the outside world follows the same six stages." },
    ],
    contextMenu: [
      { id: "sustain-stage", group: "envelope", label: "sustain stage", kind: "choice", values: ["stage 1", "stage 2", "stage 3", "stage 4", "stage 5", "stage 6"], description: "The stage a held gate parks on. Stages between sustain and end become the release path." },
      { id: "end-stage", group: "envelope", label: "end stage", kind: "choice", values: ["stage 1", "stage 2", "stage 3", "stage 4", "stage 5", "stage 6"], description: "Where the sequence finishes. Set it early to use fewer stages; set it equal to sustain for classic hold-and-release." },
      { id: "loop", group: "envelope", label: "loop", kind: "toggle", description: "Gate loops from stage 1 to the sustain stage while held — rhythmic, wavetable-like motion. With nothing at Gate or Trig, the full sequence cycles continuously as a shape LFO." },
      { id: "dcw-relationship", group: "phase distortion", label: "dcw relationship", kind: "choice", values: ["parallel — both follow envelope", "opposed — b follows inverted envelope", "a envelope / b fixed", "a fixed / b envelope"], description: "How the six-stage contour is distributed between the two lines. A fixed line still responds to the Torsion knob, its CV, key follow, and velocity; only its envelope movement is bypassed." },
      { id: "key-follow", group: "phase distortion", label: "key follow (depth + envelope time)", kind: "toggle", description: "Scales distortion depth and envelope time from pitch, as the hardware did — higher notes brighter and shorter." },
      { id: "velocity", group: "phase distortion", label: "velocity sensitivity (depth)", kind: "toggle", description: "Lets gate level scale the distortion depth." },
      { id: "oversampling", group: "engine", label: "oversampling", kind: "choice", values: ["1x", "2x", "4x", "8x"], description: "New modules default to 4×. Raise it when feedback or cross phase modulation makes aliasing audible." },
      { id: "feedback-source", group: "engine", label: "feedback source", kind: "choice", values: ["classic (output)", "clean (oscillators)"], description: "Tap the feedback from the final output (Classic, the default) or from the clean oscillators before chorus and saturation." },
      { id: "phase-reset", group: "engine", label: "reset oscillator phases on gate/trig", kind: "toggle", description: "Off by default: the oscillators keep running while a gated or triggered envelope is idle. Enable it when every attack should begin from the same phase." },
      { id: "vintage", group: "engine", label: "vintage drift/noise/bleed", kind: "toggle", description: "On by default: gentle drift plus a very low hiss and clock-bleed floor while the envelope is idle. Disable for digital silence." },
      { id: "theme", group: "theme", label: "slider light theme", kind: "choice", values: ["global shapetaker theme", "local color"], description: "Color of the illuminated stage sliders. Presets deliberately leave this alone." }
    ],
    manual: [
      {
        title: "phase distortion engine",
        body: "Digitally controlled waveforms warp the phase of a pure sine carrier under the TORSION control; every harmonic you hear is the warp itself. Each line picks one of five shapes — single sine, resonant, double sine, saw pulse, pulse — and SYMMETRY biases the curve. The DCW Relationship setting decides whether both lines follow the envelope, oppose it, or one stays fixed at the current depth."
      },
      {
        title: "six-stage dcw envelope",
        body: "Six level sliders set targets, six rate sliders beneath them set each stage's speed from ×0.125 to ×8, and STAGE RATE scales the whole contour. Gate holds at the sustain stage and walks the remaining stages to the end stage on release; Stage Trig fires the sequence as a one-shot; Loop cycles it. The envelope is available at EDGE and visualized on the illuminated sliders."
      },
      {
        title: "lines, sync, character",
        body: "Line B sits at 1:2, 1:1, 3:2, 2:1, or 3:1 to A with up to 20 cents of Detune, and Bidirectional Sync lets either line reset the other. The interaction switch chooses independent, cross phase mod, B-follows-A depth, or ring mod. A sub oscillator, feedback tapped from the output or the clean lines, vintage drift and noise, and a bucket-brigade chorus finish the voice. Twenty-five factory presets cover keys, pads, bass, leads, and bells."
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
    subtitle: "dattorro plate reverb wrapped in five character modes — field blur, afterimage, reverse, lo-fi, and modulated",
    summary: "A finely tuned plate tank surrounded by five pre- and post-processors: shoegaze chorus and shimmer, ghostly spectral resonance with sub-octave shadows, reverse granular swells, degraded wow-and-flutter texture, and deep classic modulation. One small blend knob fades the chosen mode in without disturbing the plate.",
    category: "vcv rack module",
    status: "multi-mode reverb",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Sparkles,
    hp: 16,
    panelImage: {
      src: "/modules/reverie/panel-v4.webp",
      width: 1200,
      height: 1900,
      alt: "reverie vcv rack module panel"
    },
    media: {},
    controls: [
      { id: "mode-led", label: "mode jewel", type: "meter", x: 50.0, y: 12.2, size: 9, description: "the jewel LED changes color with the active mode: teal for Field Blur, purple for Afterimage, amber for Reverse, blue for Lo-Fi, cyan for Modulated.", tip: "the dot-matrix screens below name the two parameters for whatever color is lit." },
      { id: "decay", label: "decay", type: "knob", x: 20.8, y: 15.3, size: 23, description: "regeneration within the polyphonic Dattorro plate tank, from short room-like bursts to near-infinite atmosphere. A soft-knee limiter at the output keeps extreme settings from clipping.", tip: "50% is the starting point the manual suggests — long enough to hear the modes, short enough to hear the source." },
      { id: "mix", label: "mix", type: "knob", x: 79.2, y: 15.3, size: 23, description: "dry/wet balance. The dry path through this knob is completely uncolored below the limiter's knee, so it is safe as an insert.", tip: "when the module is bypassed by Rack, dry audio passes through rather than muting." },
      { id: "tone", label: "tone", type: "knob", x: 50.0, y: 27.5, size: 16, description: "damping inside the tank. Counter-clockwise increases high-frequency absorption for a darker reverb; clockwise opens the high end for a brilliant, expansive decay.", tip: "dark tone with long decay is the plate that sits behind a mix instead of on top of it." },
      { id: "param-1", label: "param 1", type: "knob", x: 20.8, y: 38.7, size: 16, description: [
          "field blur · chor: depth and thickness of the stereo ensemble chorus on the tail",
          "afterimage · rate: rate and depth of modulation inside the tank — a wandering, unstable image",
          "reverse · size: window size of the grain buffer ahead of the tank",
          "lo-fi · degd: sample-rate crush, soft saturation, and a lowpass sweeping from 18 kHz down to 1.5 kHz",
          "modulated · dpth: depth of the tank's internal modulation",
        ], tip: "the left LCD names this parameter for the current mode; so does the context menu." },
      { id: "param-2", label: "param 2", type: "knob", x: 79.2, y: 38.7, size: 16, description: [
          "field blur · shmr: regenerative shimmer — the tank's output pitched up an octave and fed back in",
          "afterimage · diff: spectral intensity — a resonant bandpass from warm to vocal plus an octave-down shift beneath the tail",
          "reverse · fdbk: plate output fed back into the reverse buffer, self-oscillating at maximum",
          "lo-fi · wow: wow and flutter pitch modulation like warped media",
          "modulated · tune: asymmetric left/right chorus rates and detuning after the tank for width",
        ], tip: "SHMR past halfway with a long decay is the cascading upper-harmonic wash." },
      { id: "mode", label: "mode", type: "knob", x: 50.0, y: 44.6, size: 16, description: [
          "field blur: shoegaze soft focus — stereo chorus plus regenerative shimmer",
          "afterimage: ghostly spectral resonance with sub-octave shadows",
          "reverse: a reverse granular buffer in front of the tank for backward swells",
          "lo-fi: mechanical failure — crush, saturation, lowpass, wow and flutter",
          "modulated: a classic, deeply modulated hall/plate hybrid",
        ], tip: "the blade switch changes the mode instantly; ride EFFECT BLEND to fade a mode in rather than switching hard.",
        diagrams: [
          { id: "mode-blur", label: "field blur", icon: "Waves", rotation: -135 },
          { id: "mode-after", label: "afterimage", icon: "Circle", rotation: -67.5 },
          { id: "mode-rev", label: "reverse", icon: "RefreshCw", rotation: 0 },
          { id: "mode-lofi", label: "lo-fi", icon: "Grid3x3", rotation: 67.5 },
          { id: "mode-mod", label: "modulated", icon: "Activity", rotation: 135 },
        ] },
      { id: "lcd-1", label: "param 1 screen", type: "meter", x: 30.7, y: 53.4, size: 12, description: "dot-matrix readout naming the active mode's first parameter (CHOR, RATE, SIZE, DEGD, or DPTH) and its value.", tip: "glance here instead of the manual when you switch modes." },
      { id: "lcd-2", label: "param 2 screen", type: "meter", x: 69.3, y: 53.4, size: 12, description: "dot-matrix readout naming the active mode's second parameter (SHMR, DIFF, FDBK, WOW, or TUNE).", tip: "both screens follow the shared display theme." },
      { id: "param-1-atten", label: "param 1 cv attenuverter", type: "knob", x: 12.4, y: 57.3, size: 11, description: "oscilloscope-style attenuverter scaling and inverting PARAM 1 CV.", tip: "a small negative amount from an envelope cleans the mode up on each attack." },
      { id: "blend", label: "effect blend", type: "knob", x: 50.0, y: 62.1, size: 12, description: [
          "a master scale for the active mode's parameters. Fully counter-clockwise zeroes them out for a pristine, unmodulated plate",
          "turning clockwise progressively introduces the PARAM 1 and PARAM 2 settings, so a complex texture can be faded in or out without losing the relationship between them",
        ], tip: "dial the mode in fully, then use this one knob to perform it." },
      { id: "param-2-atten", label: "param 2 cv attenuverter", type: "knob", x: 87.6, y: 57.3, size: 11, description: "attenuverter for PARAM 2 CV.", tip: "in Reverse mode, keep this modest — FDBK self-oscillates at the top." },
      { id: "decay-atten", label: "decay cv attenuverter", type: "knob", x: 30.7, y: 67.6, size: 11, description: "attenuverter for DECAY CV.", tip: "an inverted envelope here shortens the tail on every hit and lets it bloom between them." },
      { id: "mix-atten", label: "mix cv attenuverter", type: "knob", x: 69.3, y: 67.6, size: 11, description: "attenuverter for MIX CV.", tip: "gate the mix for reverb that only appears on held notes." },
      { id: "param-1-cv", label: "param 1 cv", type: "jack", x: 12.4, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates PARAM 1 through its attenuverter. All primary parameters are smoothed by a one-pole lowpass, so audio-rate CV is safe.", tip: "in Lo-Fi mode a slow ramp here is a tape machine dying over eight bars." },
      { id: "decay-cv", label: "decay cv", type: "jack", x: 30.7, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates DECAY through its attenuverter.", tip: "a sample-and-hold here gives every phrase a different room." },
      { id: "mix-cv", label: "mix cv", type: "jack", x: 69.3, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates MIX through its attenuverter.", tip: "an envelope follower, inverted: reverb that ducks under the source and swells in the gaps." },
      { id: "param-2-cv", label: "param 2 cv", type: "jack", x: 87.6, y: 77.3, size: 10.5, voltageRange: "cv", description: "modulates PARAM 2 through its attenuverter.", tip: "an LFO on SHMR in Field Blur makes the shimmer breathe in and out of the tail." },
      { id: "delta-lens", label: "delta indicators", type: "meter", x: 50.0, y: 83.7, size: 20, description: [
          "left triangle (up): input level",
          "right triangle (up): output level",
          "top triangle (down): mode effect energy",
          "center triangle (up): wet reverb level and phase state — its pulsing changes with the mode, stepped in Lo-Fi, sweeping in Reverse",
        ], tip: "if the center triangle stays lit with no input, Reverse FDBK or Afterimage is self-sustaining — that is the DC blocker earning its keep." },
      { id: "in-l", label: "audio in l", type: "jack", x: 9.9, y: 88.4, size: 10.5, voltageRange: "audio · poly ≤16", description: "left audio input. If only this jack is patched it is normalled to the right input for mono-to-stereo operation. Polyphonic up to 16 voices, with the tank and mode processors instanced per voice.", tip: "a polyphonic chord here gets sixteen plates, not one." },
      { id: "in-r", label: "audio in r", type: "jack", x: 24.5, y: 88.4, size: 10.5, voltageRange: "audio · poly ≤16", description: "right audio input for true stereo sources.", tip: "leave it empty for a mono source — the normalization does the work." },
      { id: "out-l", label: "audio out l", type: "jack", x: 75.5, y: 88.4, size: 10.5, voltageRange: "audio · poly", description: "left output through a transparent soft-knee limiter: perfectly linear below the knee, tanh only above it to catch resonant peaks.", tip: "nominal ±5 V levels pass bit-transparent through the dry path." },
      { id: "out-r", label: "audio out r", type: "jack", x: 90.1, y: 88.4, size: 10.5, voltageRange: "audio · poly", description: "right output.", tip: "Modulated mode's TUNE parameter is the only thing that detunes left against right — check width here." },
    ],
    contextMenu: [
      {
        id: "current-params",
        group: "current mode parameters",
        label: "current mode parameters",
        kind: "choice",
        values: ["param 1: full name", "param 2: full name"],
        description: "Displays the full names of the active mode's two parameters as a quick reference — the same information the two dot-matrix screens abbreviate."
      }
    ],
    manual: [
      {
        title: "the tank",
        body: "A polyphonic Dattorro plate network sits at the core, instanced per voice up to sixteen. DECAY runs from short room bursts to near-infinite atmosphere; TONE damps the tail dark or opens it brilliant. Every primary parameter is smoothed against zipper noise, the wet path is DC-blocked for stability under extreme feedback, and a soft-knee limiter at the output stays linear until it is actually needed."
      },
      {
        title: "five modes",
        body: "The blade switch selects the character and the jewel LED shows it: Field Blur (stereo ensemble chorus plus regenerative octave-up shimmer), Afterimage (in-tank modulation plus a resonant bandpass and octave-down shadow), Reverse (a granular buffer ahead of the tank, with feedback from the plate back into it), Lo-Fi (crush, saturation, a sweeping lowpass, wow and flutter), and Modulated (deep internal modulation plus asymmetric post-tank chorus). The two dot-matrix screens name PARAM 1 and PARAM 2 for whichever mode is active."
      },
      {
        title: "effect blend and cv",
        body: "One small knob scales both mode parameters at once: fully counter-clockwise leaves a pristine plate, clockwise fades the dialed-in texture back in without losing the Param 1/2 relationship. DECAY, MIX, and both Params take CV through oscilloscope-style attenuverters. Four delta indicators around the lens show input, output, mode energy, and the wet signal's level and phase."
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
            detail: "Turn the attenuverter to about half. The octave-up regeneration now rises and falls over twelve seconds or so — the tail inhales harmonics and lets them go.",
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
    summary: "A rhythmic polytap delay where line 1 is the master timebase and lines 2 and 3 follow in musical — or irrational golden-ratio — subdivisions. Three voicings per line, a global modulation LFO, kill switches that keep recording while muted, and X-FEED to turn the whole module into one circulating wash.",
    category: "vcv rack module",
    status: "triple delay",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Layers,
    hp: 26,
    panelImage: {
      src: "/modules/tessellation/panel-v4.webp",
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
      { id: "time-1", label: "time 1", type: "knob", x: 11.9, y: 15.6, size: 11, description: "the master timebase, 20 ms to 1.6 s. Set it by knob, tap it in with TAP TEMPO, or override it with EXT CLK IN.", tip: "everything else is measured against this knob." },
      { id: "voice-1", label: "voice 1", type: "switch", x: 24.6, y: 15.6, size: 6.5, description: [
          "24/96 (up): pristine full-bandwidth digital",
          "adm (center): adaptive delta modulation compander grit — soft drive, compressed and saturated",
          "12-bit (down): SDD-style converters with pre-emphasis saturation, dither, 13-bit stepped conversion, and an analog-style DAC filter",
        ], tip: "the factory ships line 1 clean, 2 as ADM, 3 as 12-bit — three eras stacked.",
        diagrams: [
          { id: "v1-2496", label: "24/96", icon: "Minus" },
          { id: "v1-adm", label: "adm", icon: "Activity" },
          { id: "v1-12", label: "12-bit", icon: "Grid3x3" },
        ] },
      { id: "mix-1", label: "mix 1", type: "knob", x: 37.3, y: 15.6, size: 9.5, description: "balance of line 1's delayed signal against the dry input. The jewel beside the kill row shows the line's output level.", tip: "mix is per line — a quiet line 3 under a loud line 1 is a rhythm, not a wash." },
      { id: "repeats-1", label: "repeats 1", type: "knob", x: 54.5, y: 15.6, size: 9.5, description: "feedback for line 1. High settings approach unity; with a bright TONE the loop can exceed it and sustain into the soft limiters.", tip: "REPEATS CV moves all three lines at once." },
      { id: "tone-1", label: "tone 1", type: "knob", x: 71.7, y: 15.6, size: 9.5, description: "a tilt filter inside line 1's feedback loop. Center is flat, counter-clockwise darkens the repeats, clockwise boosts highs — and because the boost is inside the loop, bright settings push gain above unity into a saturated wash. An 18 Hz rumble filter keeps DC out when it self-oscillates.", tip: "dark on line 1, bright on line 3: the repeats age in different directions." },
      { id: "tap", label: "tap tempo", type: "switch", x: 83.9, y: 15.6, size: 7, description: "momentary button to tap the master tempo for line 1. The lamp blinks the master phase — useful for monitoring an external clock too.", tip: "tap on the downbeats; the subdivided lines follow." },
      { id: "ext-clk", label: "ext clk in", type: "jack", x: 92.7, y: 15.6, size: 6.5, voltageRange: "clock", description: "overrides line 1's timebase with an external clock. Lines 2 and 3 keep their subdivisions relative to it.", tip: "clock it from your sequencer and the golden ratios stay locked to the song." },
      { id: "time-2", label: "time 2", type: "knob", x: 11.9, y: 35.0, size: 11, description: "line 2's time. In Free it is a plain 20 ms – 1.6 s knob; with any subdivision selected it becomes a trim that multiplies the subdivision factor from 0.5× to 2×. In Golden, sweeping it explores golden short (φ⁻²), golden (φ⁻¹), unity, golden long (φ), and golden double (φ²).", tip: "in Golden, park it between detents for repeats that never quite land." },
      { id: "voice-2", label: "voice 2", type: "switch", x: 24.6, y: 35.0, size: 6.5, description: "24/96, ADM, or 12-bit voicing for line 2.", tip: "give each line a different voice before raising X-FEED — the circulation picks up all three characters.",
        diagrams: [
          { id: "v2-2496", label: "24/96", icon: "Minus" },
          { id: "v2-adm", label: "adm", icon: "Activity" },
          { id: "v2-12", label: "12-bit", icon: "Grid3x3" },
        ] },
      { id: "mix-2", label: "mix 2", type: "knob", x: 37.3, y: 35.0, size: 9.5, description: "wet/dry balance for line 2.", tip: "as X-FEED rises, less dry enters lines 2 and 3 — MIX 2 becomes the level of the circulation." },
      { id: "repeats-2", label: "repeats 2", type: "knob", x: 54.5, y: 35.0, size: 9.5, description: "feedback for line 2.", tip: "keep it below line 1's when the subdivision is short, or the fast taps swamp the pulse." },
      { id: "tone-2", label: "tone 2", type: "knob", x: 71.7, y: 35.0, size: 9.5, description: "tilt filter in line 2's feedback loop.", tip: "ADM voicing plus a slightly bright tone is the early-digital-delay sound." },
      { id: "subdiv-2", label: "subdivision 2", type: "knob", x: 89.0, y: 35.0, size: 9.5, description: [
          "triplet, eighth, golden, dotted 8th, dotted quarter, free",
          "golden locks the line to powers of φ — irrational ratios that keep repeats from stacking into metallic comb filtering",
          "free unlinks the line from line 1 entirely",
        ], tip: "golden on both lines plus X-FEED is the golden wash.",
        diagrams: [
          { id: "sd2-trip", label: "triplet", icon: "ChevronsDown", rotation: -135 },
          { id: "sd2-8", label: "eighth", icon: "ChevronDown", rotation: -81 },
          { id: "sd2-gold", label: "golden", icon: "Spline", rotation: -27 },
          { id: "sd2-d8", label: "dotted 8th", icon: "ChevronUp", rotation: 27 },
          { id: "sd2-dq", label: "dotted quarter", icon: "ChevronsUp", rotation: 81 },
          { id: "sd2-free", label: "free", icon: "Unlink", rotation: 135 },
        ] },
      { id: "time-3", label: "time 3", type: "knob", x: 11.9, y: 54.5, size: 11, description: "line 3's time — free, or a 0.5×–2× trim on its subdivision, with the same golden detents as line 2.", tip: "golden short on 2 and golden long on 3 brackets line 1 on both sides." },
      { id: "voice-3", label: "voice 3", type: "switch", x: 24.6, y: 54.5, size: 6.5, description: "24/96, ADM, or 12-bit voicing for line 3.", tip: "12-bit on the longest line: the oldest echo sounds the oldest.",
        diagrams: [
          { id: "v3-2496", label: "24/96", icon: "Minus" },
          { id: "v3-adm", label: "adm", icon: "Activity" },
          { id: "v3-12", label: "12-bit", icon: "Grid3x3" },
        ] },
      { id: "mix-3", label: "mix 3", type: "knob", x: 37.3, y: 54.5, size: 9.5, description: "wet/dry balance for line 3.", tip: "the third line is the one to sneak in last." },
      { id: "repeats-3", label: "repeats 3", type: "knob", x: 54.5, y: 54.5, size: 9.5, description: "feedback for line 3.", tip: "line 3 is where the runaway usually starts — keep a finger near KILL 3." },
      { id: "tone-3", label: "tone 3", type: "knob", x: 71.7, y: 54.5, size: 9.5, description: "tilt filter in line 3's feedback loop.", tip: "roll it dark to keep 12-bit dither from piling up in the circulation." },
      { id: "subdiv-3", label: "subdivision 3", type: "knob", x: 89.0, y: 54.5, size: 9.5, description: "the same six positions as line 2's subdivision switch, for line 3.", tip: "dotted quarter on 3 against triplet on 2 is a polyrhythm from one tempo." },
      { id: "kill-1", label: "kill 1", type: "switch", x: 70.4, y: 66.5, size: 7, description: "latching mute for line 1. It silences the line's output and severs its contribution to the cross-feedback network while the buffer keeps recording — release it and the echoes resume seamlessly.", tip: "the panic button when the network runs away." },
      { id: "kill-2", label: "kill 2", type: "switch", x: 80.4, y: 66.5, size: 7, description: "latching mute for line 2 with the buffer still recording underneath.", tip: "chop it in rhythm for gated echoes that pick up exactly where they left off." },
      { id: "kill-3", label: "kill 3", type: "switch", x: 90.5, y: 66.5, size: 7, description: "latching mute for line 3.", tip: "kill 3 and 2 together and the circulation collapses to a single line without losing what was in the buffers." },
      { id: "xfeed", label: "x-feed", type: "knob", x: 11.9, y: 73.9, size: 9.5, description: [
          "at zero the three lines process the dry input in parallel",
          "as it rises, a circular routing appears: 1 → 2 → 3 → 1. At maximum, less dry enters lines 2 and 3 and the module becomes one massive circulating feedback network",
          "the network is explicitly allowed past unity into its soft limiters",
        ], tip: "raise it slowly with three different voicings and the repeats start to blur into one another." },
      { id: "pingpong", label: "ping-pong", type: "switch", x: 24.6, y: 73.9, size: 6.5, description: [
          "off (up): standard stereo",
          "ping-pong (center): alternates the stereo image of the delayed signals",
          "inverted (down): a phase-inverted ping-pong for wider field manipulation",
        ], tip: "inverted with a mono input is the widest this box gets.",
        diagrams: [
          { id: "pp-off", label: "off", icon: "Minus" },
          { id: "pp-on", label: "ping-pong", icon: "ArrowLeftRight" },
          { id: "pp-inv", label: "inverted", icon: "Shuffle" },
        ] },
      { id: "mod-depth", label: "mod depth", type: "knob", x: 37.3, y: 73.9, size: 9.5, description: "depth of the global LFO on all three delay times, in milliseconds, with a slight stereo offset for width. Chorus at low settings, vibrato and pitch wobble higher.", tip: "a hair of depth on the 12-bit line is the tape-machine flutter." },
      { id: "mod-rate", label: "mod rate", type: "knob", x: 54.5, y: 73.9, size: 9.5, description: "speed of the global modulation LFO, 0.1 Hz to 2.0 Hz.", tip: "very slow rates drift the golden ratios so nothing ever repeats exactly." },
      { id: "in-l", label: "in l", type: "jack", x: 10.2, y: 89.1, size: 6.5, voltageRange: "audio", description: "left audio input. Normalled to mono if only this jack is patched. When inputs are disconnected the buffers clear to prevent clicks or infinite runaway.", tip: "mono in, PING-PONG on: instant stereo." },
      { id: "in-r", label: "in r", type: "jack", x: 20.3, y: 89.1, size: 6.5, voltageRange: "audio", description: "right audio input.", tip: "patch a true stereo pair and leave PING-PONG off to keep the original image." },
      { id: "time-1-cv", label: "time 1 cv", type: "jack", x: 30.3, y: 89.1, size: 6.5, voltageRange: "bipolar cv", description: "modulates line 1's time — and, through the subdivisions, lines 2 and 3 as well.", tip: "slow CV here bends the whole grid; fast CV pitch-shifts it." },
      { id: "time-2-cv", label: "time 2 cv", type: "jack", x: 40.3, y: 89.1, size: 6.5, voltageRange: "bipolar cv", description: "modulates line 2's time independently.", tip: "an envelope here smears line 2 on every hit." },
      { id: "time-3-cv", label: "time 3 cv", type: "jack", x: 50.3, y: 89.1, size: 6.5, voltageRange: "bipolar cv", description: "modulates line 3's time independently.", tip: "random voltage here makes the longest line the most unstable." },
      { id: "mod-cv", label: "mod cv", type: "jack", x: 60.4, y: 89.1, size: 6.5, voltageRange: "cv", description: "modulates the global MOD DEPTH.", tip: "gate it to add flutter only on the chorus of the song." },
      { id: "repeats-cv", label: "repeats cv", type: "jack", x: 70.4, y: 89.1, size: 6.5, voltageRange: "cv", description: "global feedback modulation for all three lines at once.", tip: "an envelope follower here makes loud passages ring longer." },
      { id: "out-l", label: "out l", type: "jack", x: 80.4, y: 89.1, size: 6.5, voltageRange: "audio", description: "left stereo output.", tip: "the soft limiters sit here — the runaway is loud but bounded." },
      { id: "out-r", label: "out r", type: "jack", x: 90.5, y: 89.1, size: 6.5, voltageRange: "audio", description: "right stereo output.", tip: "check the width with PING-PONG inverted before committing to a mono mix." },
    ],
    manual: [
      {
        title: "three delay lines",
        body: "Three parallel stereo lines from 20 ms to 1.6 s. Line 1 is the master timebase — knob, tap, or external clock. Lines 2 and 3 lock to it through triplet, eighth, dotted, or golden-ratio subdivisions, with their Time knobs acting as 0.5×–2× trims, or run free. A global LFO modulates all three times with a slight stereo offset."
      },
      {
        title: "voicing and tone",
        body: "Each line chooses pristine 24/96, ADM compander grit, or 12-bit vintage converters with pre-emphasis, dither, and a DAC filter. TONE is a tilt filter inside each feedback loop: dark repeats one way, a high boost the other — and because the boost lives inside the loop, bright settings push past unity into a sustained, saturated wash held in check by soft limiters and an 18 Hz rumble filter."
      },
      {
        title: "x-feed and kill",
        body: "X-FEED routes 1 → 2 → 3 → 1 into a circulating network that is allowed to run past unity. Golden subdivisions keep the circulation from stacking into comb filtering. The three KILL switches mute a line and sever it from the network while its buffer keeps recording, so echoes resume the instant you release — performance tools and panic buttons in one."
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
    subtitle: "chord-and-strum instrument modeled on the 1984 suzuki om-84 omnichord — 84 chords, a 13-position sonicstrings strip, and a 51-step chord memory",
    summary: "Twelve root buttons in circle-of-fifths order and seven quality buttons select any of the OM-84's 84 chords. A brass touch strip strums four octaves of the voicing, a divider-style organ chord holds underneath, and a melody voice tracks V/oct. Panel layout is still in flux — control positions here will move.",
    category: "vcv rack module",
    status: "chord strummer",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Music,
    hp: 22,
    panelImage: {
      src: "/modules/athanor/panel-v2.webp",
      width: 1650,
      height: 1900,
      alt: "athanor vcv rack module panel (pre-release layout)"
    },
    media: {},
    controls: [
      { id: "master", label: "master", type: "knob", x: 8.5, y: 14.0, size: 9, description: "overall level of the MIX output. Factory 72%.", tip: "the individual STRUM and CHORD buses ignore this knob." },
      { id: "voice-1", label: "voice 1", type: "knob", x: 25.1, y: 14.0, size: 9, description: "level of the vibrato string layer of the SonicStrings strip.", tip: "the wobbly one — the Omnichord's signature." },
      { id: "voice-2", label: "voice 2", type: "knob", x: 41.6, y: 14.0, size: 9, description: "level of the steadier string layer.", tip: "voice 2 alone is closer to a harp; both together is the record." },
      { id: "sustain", label: "sustain", type: "knob", x: 58.2, y: 14.0, size: 9, description: "decay time of all 13 independently ringing strip regions. SUS CV adds to it.", tip: "long sustain and a slow drag is the arpeggio that never resolves." },
      { id: "chord-level", label: "chord", type: "knob", x: 74.7, y: 14.0, size: 9, description: "level of the continuous three-oscillator organ chord.", tip: "panel-only by design — patch an external VCA if you need it under voltage control." },
      { id: "key-level", label: "key", type: "knob", x: 91.3, y: 14.0, size: 9, description: "level of the monophonic melody voice driven by MELODY V/oct and M.GATE.", tip: "the melody voice is not transposed by TRANSPOSE, exactly as on the OM-84." },
      { id: "roots", label: "root buttons", type: "switch", x: 51.6, y: 26.5, size: 8, description: [
          "twelve root buttons in the OM-84's circle-of-fifths order. Selecting a root immediately plays the resulting chord with the active quality",
          "the chord and strum sections use the OM-84's F♯-through-F pitch group: notes from F♯ through B fold below C, so C major is voiced G3/C4/E4",
          "a change fires a 5 ms pulse at TRIG and updates the polyphonic PITCH output",
        ], tip: "with ROOT CV patched the buttons go quiet; unpatch it and they wake back up." },
      { id: "qualities", label: "quality buttons", type: "switch", x: 50.0, y: 38.5, size: 8, description: [
          "maj · min · 7th · maj7 · min7 · dim · aug — seven dedicated quality buttons, a deliberate interface difference from the OM-84's three rows and multi-button combinations",
          "seventh and diminished voicings keep the hardware's characteristic three-note omission of the fifth, so C dim sounds A3/C4/E♭4",
          "the selected quality stays active while roots change, and vice versa",
        ], tip: "84 chord names from 12 × 7 — the original set, addressed as two dimensions instead of one long list." },
      { id: "display", label: "display", type: "meter", x: 28.6, y: 48.6, size: 14, description: "shows the current chord name, memory position, and record/play status.", tip: "in record mode it confirms each ENTER with the stored chord." },
      { id: "tune", label: "tune", type: "knob", x: 9.8, y: 61.5, size: 9, description: "adjusts the whole instrument by ±50 cents. Included in the PITCH output so external voices track exactly.", tip: "the original had a recessed tuning screw; this is it." },
      { id: "transpose", label: "transpose", type: "knob", x: 25.9, y: 61.5, size: 9, description: "moves the chord and strum sections by ±12 semitones. The melody voice is not transposed, as on the hardware.", tip: "transpose down an octave for the bass-register strum." },
      { id: "mem", label: "mem", type: "switch", x: 42.9, y: 61.5, size: 8, description: "latching: enables the 51-chord memory. With MEM on and REC off, ENTER or ADV steps through the stored sequence; advancing past the last entry lands on a silent end position rather than wrapping.", tip: "REPEAT in playback returns to a silent ready state at the start." },
      { id: "rec", label: "rec", type: "switch", x: 53.7, y: 61.5, size: 8, description: "latching: record mode. Select a chord and press ENTER to store it — the chord stops, matching the OM-84's confirmation. ENTER with no chord sounding records a blank measure. Turn REC off to arm playback silently at the start.", tip: "in record mode, REPEAT deletes and recalls the last entry so you can fix it." },
      { id: "repeat", label: "repeat", type: "switch", x: 65.3, y: 61.5, size: 8, description: "record mode: delete and recall the most recent entry. Playback mode: return to the silent ready state before entry 1.", tip: "the OM-84's Cancel, Omit, and Skip commands are not implemented — REPEAT is the whole editing toolkit." },
      { id: "enter", label: "enter", type: "switch", x: 77.8, y: 61.5, size: 8, description: "record mode: store the current chord (or a blank). Playback mode: play the first entry, then advance one step per press.", tip: "ADV does the same thing under trigger control." },
      { id: "off", label: "off", type: "switch", x: 92.2, y: 61.5, size: 8, description: "immediately silences the organ and all ringing strip voices. Selecting a root or quality, or touching the strip, resumes the instrument.", tip: "the Instant Off pad, as a button." },
      { id: "strip", label: "sonicstrings strip", type: "meter", x: 50.0, y: 73.5, size: 12, description: [
          "a horizontal 13-position strumplate: four complete three-note octaves plus the first pitch of a fifth, matching Suzuki's published strumplate diagrams",
          "drag left to right for a rising four-octave arpeggio, right to left for a falling one, or touch a position directly. Each chord change remaps the strip automatically",
          "each of the 13 regions rings independently under SUSTAIN",
        ], tip: "STRUM CV maps 0–10 V across the 13 regions and triggers each newly crossed one — a sequencer can play the strip." },
      { id: "in-root", label: "root cv", type: "jack", x: 7.2, y: 84.3, size: 7.5, voltageRange: "1 V/oct · 0 V = C", description: "quantized chord root at 1 V/oct. Octaves wrap to the same pitch class. While patched, the root buttons are inactive.", tip: "a quantizer or sequencer chooses roots; three gates choose quality." },
      { id: "in-maj", label: "maj gate", type: "jack", x: 17.9, y: 84.3, size: 7.5, voltageRange: "gate", description: "quality gate. MAJ, MIN, and 7TH combinations encode all seven qualities — MAJ7, MIN7, DIM, and AUG come from pairs and triples. If any quality gate is patched, the three inputs replace the manual quality selection.", tip: "no table lookup, no scrolling index — three ordinary gates." },
      { id: "in-min", label: "min gate", type: "jack", x: 28.6, y: 84.3, size: 7.5, voltageRange: "gate", description: "quality gate, combined with MAJ and 7TH.", tip: "MIN + 7TH is a minor seventh." },
      { id: "in-7th", label: "7th gate", type: "jack", x: 39.4, y: 84.3, size: 7.5, voltageRange: "gate", description: "quality gate, combined with MAJ and MIN.", tip: "MAJ + 7TH is a major seventh." },
      { id: "in-strum", label: "strum cv", type: "jack", x: 50.1, y: 84.3, size: 7.5, voltageRange: "0–10 V", description: "maps 0–10 V across the 13 strip regions and triggers each newly crossed region — a ramp is a strum, a stepped sequence is a picked pattern.", tip: "a slow triangle here is an endless up-and-down arpeggio." },
      { id: "in-adv", label: "adv", type: "jack", x: 60.8, y: 84.3, size: 7.5, voltageRange: "trigger", description: "advances the chord memory one entry per trigger in playback mode, exactly like pressing ENTER.", tip: "clock it from a sequencer's bar output for a chord progression that follows the song." },
      { id: "in-sus", label: "sus cv", type: "jack", x: 71.6, y: 84.3, size: 7.5, voltageRange: "cv", description: "additive voltage control of the SonicStrings decay on top of the SUSTAIN knob.", tip: "the one level control with a jack — the rest are deliberately panel-only." },
      { id: "in-melody", label: "melody v/oct", type: "jack", x: 82.3, y: 84.3, size: 7.5, voltageRange: "1 V/oct", description: "pitch for the monophonic keyboard voice over an unrestricted range — a wider keyboard than the OM-84's C-through-G chord buttons.", tip: "TUNE applies; TRANSPOSE does not." },
      { id: "in-mgate", label: "m.gate", type: "jack", x: 93.1, y: 84.3, size: 7.5, voltageRange: "gate", description: "gate for the melody voice.", tip: "level is set by KEY." },
      { id: "out-mix", label: "mix", type: "jack", x: 23.2, y: 94.6, size: 7.5, voltageRange: "audio", description: "the complete instrument mix under MASTER.", tip: "the mono output the original had, plus everything the original did not." },
      { id: "out-strum", label: "strum", type: "jack", x: 36.6, y: 94.6, size: 7.5, voltageRange: "audio", description: "the SonicStrings bus alone.", tip: "send the strum to its own reverb and keep the organ dry." },
      { id: "out-chord", label: "chord", type: "jack", x: 50.0, y: 94.6, size: 7.5, voltageRange: "audio", description: "the organ chord bus alone. Releasing a chord decays over roughly 85 ms rather than cutting off.", tip: "a separate bus means a separate filter for the pad underneath." },
      { id: "out-pitch", label: "pitch", type: "jack", x: 63.4, y: 94.6, size: 7.5, voltageRange: "V/oct · 3 ch", description: "three-channel polyphonic V/oct for the current voicing, including TUNE, so external voices track the internal ones exactly.", tip: "drive three oscillators from this and TRIG for an external Omnichord." },
      { id: "out-trig", label: "trig", type: "jack", x: 76.8, y: 94.6, size: 7.5, voltageRange: "5 ms pulse", description: "a 5 ms pulse whenever the selected chord changes, including memory advances.", tip: "retrigger envelopes for voices driven from PITCH." },
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
        body: "Twelve root buttons in circle-of-fifths order and seven quality buttons produce the OM-84's 84 chord names as two persistent dimensions. ROOT is a 1 V/oct input with 0 V = C; MAJ, MIN, and 7TH gates encode the seven qualities through their combinations and replace the buttons while any is patched. The chord and strum sections use the OM-84's F♯-through-F pitch group and its fifth-omitting seventh and diminished voicings."
      },
      {
        title: "sonicstrings and voices",
        body: "The brass strip is a horizontal 13-position strumplate — four three-note octaves plus one — remapped on every chord change. VOICE 1 is the vibrato layer, VOICE 2 the steady one, SUSTAIN sets the decay of all 13 ringing regions, and STRUM CV plays the strip from 0–10 V. Independently synthesized divider-style square waves, hardware-inspired filtering, and gentle saturation make the sound; no Omnichord samples are used. CHORD holds the organ, MELODY and M.GATE drive a mono keyboard voice at the KEY level."
      },
      {
        title: "chord memory",
        body: "Up to 51 chords, matching the OM-84. With MEM and REC on, select a chord and press ENTER to store it; the chord stops to confirm. REC off arms playback silently at the start, and ENTER or a trigger at ADV plays and advances one entry per press, ending on a silent position rather than wrapping. REPEAT deletes the last entry while recording or resets to the start during playback. The rhythm, drum, and auto-bass sections of the original are intentionally absent."
      }
    ]
  },
  {
    slug: "fatebinder",
    hidden: true,
    name: "fatebinder",
    subtitle: "four euclidean-articulated lfos with a radar-screen playhead — the rhythm leans on the outputs, it never steps them",
    summary: "Four related LFOs articulated by a rhythm you can see. The radar sweep is the playhead; when it crosses a blip, that lane inhales, surges, or shifts — but the outputs stay continuous. No steps, no clicks.",
    category: "vcv rack module",
    status: "rhythmic quad lfo",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Activity,
    hp: 14,
    panelImage: {
      src: "/modules/fatebinder/panel-v3.webp",
      width: 1050,
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
        body: "Four concentric rings are the four lanes — A teal, B violet, C azure, D amber. Small stationary dots are Euclidean rhythm steps; the one larger moving dot per ring is the LFO itself. The amber sweep is the playhead, one revolution per rhythmic cycle."
      },
      {
        title: "articulation",
        body: "Blips never touch the outputs directly — they kick slewed envelopes that modulate each lane's amplitude, rate, and waveform. Intensity is the LFO-to-rhythm crossfader: at zero, a pure quad LFO; raised, every hit breathes harder. Memory sets how long articulations linger."
      },
      {
        title: "scenes and outputs",
        body: "Six scenes — Tide, Pulse, Drift, Teeth, Eclipse, Fracture — set what a blip does and each lane's rate ratio. Outputs A–D are correlated motions, while TRIG and ACCENT make the radar's rhythm patchable. Bind rerolls the pattern, Freeze holds the sweep mid-breath."
      }
    ]
  },
  {
    slug: "chimera",
    hidden: true,
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
      src: "/modules/chimera/panel-v3.webp",
      width: 3300,
      height: 1900,
      alt: "chimera vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "channels and looper",
        body: "Four polyphonic channels with level, pan, and bus assignment. Arm a channel and the tape buffer waits for the downbeat, records the selected bar length, and plays back instantly. Loops sent to the morph busses degrade gracefully — a fraction of the saturated, filtered output writes back into the buffer each pass."
      },
      {
        title: "morphing busses",
        body: "Slot A offers Ensemble, Phasewash, and Tape; slot B offers Jet, Trem/Pan, and Shimmer — each with Rate, Depth, and Texture under CV. A channel assigned to A+B uses its morph knob as a crossfader between slots, and patching the Returns swaps in external processors."
      },
      {
        title: "glue compressor",
        body: "A VCA-style bus compressor coheres the final mix with 2:1, 4:1, or 10:1 Crush ratios, selectable sidechain source, high-pass detector filtering, and a dry/wet mix for parallel compression."
      }
    ]
  },
  {
    slug: "tetrarch",
    hidden: true,
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
      src: "/modules/tetrarch/panel-v3.webp",
      width: 2100,
      height: 1900,
      alt: "tetrarch vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "generative sequencer",
        body: "Five patterns set the core groove — four fixed styles plus a generative fifth that rerolls its seed on selection. Variations A–F escalate from bare foundation to maximum density, Fill arms a turnaround, and Density and Humanize push ghost notes and micro-timing."
      },
      {
        title: "hybrid voices",
        body: "Each lane is a meticulous circuit model: a bridged-T kick with beater knock, a dual-resonator snare with crack and tail envelopes, six square oscillators behind the hats, cowbell/bongo/clap percussion, and a sweepable tom for fills."
      },
      {
        title: "sample layer",
        body: "Vintage PCM samples run in parallel with the synthesis, crossfaded by a single Sample Blend control. Converter modes emulate 12-bit/32 kHz grit or 8-bit µ-law companding, and every voice has its own output beside the stereo master."
      }
    ]
  },
  {
    slug: "nocturne-tv",
    hidden: true,
    name: "nocturne tv",
    subtitle: "vhs-era crt video synthesizer with four render engines, fourteen aesthetic programs, and cv-controlled chaos",
    summary: "A purely visual module that converts CV and audio into evolving video art — sync tearing, luma keying, recursive feedback, and glitched tape mechanics, rendered through fourteen aesthetic programs.",
    category: "vcv rack module",
    status: "video synth",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Tv,
    hp: 18,
    panelImage: {
      src: "/modules/nocturne-tv/panel-v3.webp",
      width: 1350,
      height: 1900,
      alt: "nocturne tv vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "video engines",
        body: "Four rendering topologies: Sync emulates CRT sync tearing, Keyer generates hard-edged quantized shapes, Feedback points a virtual camera at its own monitor for blooming spirals, and Glitch evokes tracking errors and broken tape transport."
      },
      {
        title: "fourteen programs",
        body: "Aesthetic scenes dictate palette and post-processing — phosphor burn-in, scanlines, RF snow, chroma storms, datamosh corruption, neon wireframes, self-consuming ouroboros loops, and more."
      },
      {
        title: "buses and chaos",
        body: "Deflect, Hold, Luma key, and Chroma buses map signals to warp, roll, contrast, and tint, with eight further CV inputs including a transient-reactive Explode. Unpatched, an internal chaotic motion generator keeps the screen alive as a standalone display."
      }
    ]
  },
  {
    slug: "divergence",
    hidden: true,
    name: "divergence",
    subtitle: "1-to-3 sequential stereo routing switch with polyphonic fidelity and jewel-lamp lane indication",
    summary: "A precision router that sends one stereo source to one of three stereo destinations, advanced by pushbutton or trigger. Pristine switching — no attenuation, no slew, exact voltages.",
    category: "vcv rack module",
    status: "stereo router",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Split,
    hp: 6,
    panelImage: {
      src: "/modules/divergence/panel-v3.webp",
      width: 450,
      height: 1900,
      alt: "divergence vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "routing",
        body: "One stereo input pair feeds lanes A, B, and C in sequence. The Change Lane button advances manually; a Schmitt-trigger CV input advances on every rising edge for clocked routing."
      },
      {
        title: "signal integrity",
        body: "Polyphonic channel counts are preserved — the active lane carries the exact input voltages while inactive lanes output precisely zero volts. Mono sources normalize left-to-right automatically."
      },
      {
        title: "indication",
        body: "The main jewel lamp shows the active lane by color — dark teal for A, dark green for B, shapetaker purple for C — with per-lane LEDs between each output pair for confirmation at the jacks."
      }
    ]
  },
  {
    slug: "augury",
    hidden: true,
    name: "augury",
    subtitle: "polyphonic chord identifier scoring 31 templates, with a live crt readout and root, type, and confidence cv outputs",
    summary: "Feed it polyphonic pitches and it names the chord — root, quality, inversion, and spelling — on a CRT-style display, while emitting the analysis as control voltages. Audio passes through untouched.",
    category: "vcv rack module",
    status: "chord analyzer",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Eye,
    hp: 8,
    panelImage: {
      src: "/modules/augury/panel-v3.webp",
      width: 600,
      height: 1900,
      alt: "augury vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "detection engine",
        body: "Incoming polyphonic V/oct is quantized to semitones with hysteresis, then scored against 31 chord templates from power chords to altered dominants. Gate-settling logic waits ~60 ms for all voices to land before committing to a new chord."
      },
      {
        title: "the readout",
        body: "The display renders root and suffix (Cmaj7, Dm9), slash chords when the bass differs from the root, note spellings biased by the Key knob, and a confidence percentage. The CONF lamp shifts from amber through green to cyan as certainty rises."
      },
      {
        title: "cv outputs",
        body: "ROOT emits 1 V/oct for the detected root, TYPE steps 0.4 V per template index, and CONF scales 0–10 V with confidence — enough to drive arpeggiators or a second voice that follows a generative progression."
      }
    ]
  },
  {
    slug: "reliquary",
    hidden: true,
    name: "reliquary",
    subtitle: "granular memory instrument — a 60-second buffer that forgets, where recall reinforces and neglect dissolves into the vessel resonator",
    summary: "A granular buffer treated as memory rather than tape. Regions fade unless recalled; replaying them reinforces their vitality. As memories degrade they excite the Vessel, an inharmonic modal resonator that slowly replaces what is forgotten.",
    category: "vcv rack module",
    status: "granular memory",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Hourglass,
    hp: 16,
    panelImage: {
      src: "/modules/reliquary/panel-v3.webp",
      width: 1200,
      height: 1900,
      alt: "reliquary vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "memory buffer",
        body: "Recall draws grains from up to 60 seconds of history; Size, Density, Dispersion, and Pitch shape the cloud. Every region of the buffer has a vitality that decays over time — faded memories return darker, wobblier, and quieter."
      },
      {
        title: "consolidation",
        body: "Recalling a region reinforces it. Freeze the buffer and it becomes self-curating: phrases you keep revisiting stay vivid and pristine while untouched sections dissolve into ghostly noise and, eventually, silence. The phosphor display maps vitality across the timeline."
      },
      {
        title: "the vessel",
        body: "An eight-mode inharmonic resonator rings sympathetically beneath the grains — and degraded memories excite it hardest, so the module's body gradually replaces the audio it forgets. A YIN tracker keeps it tuned to the input, with lane voicings for smeared, shoegaze glissandi."
      }
    ]
  }
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
