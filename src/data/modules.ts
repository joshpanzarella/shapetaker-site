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
      src: "/modules/reverie/panel-v5.webp",
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
    hp: 24,
    panelImage: {
      src: "/modules/athanor/panel-v3.webp",
      width: 1800,
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
  },
  {
    slug: "alembic",
    name: "alembic",
    subtitle: "transmutation's output expander — twelve breakout jacks for transport, expression, and voices, with no controls of its own",
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
        description: "reports the state of the expander link to the transmutation on the left. green while a linked source is transporting, amber while linked and stopped, red when a transmutation is present but its message cannot be used, dark when there is nothing on the left.",
        tip: "if the jewel stays dark, alembic is not immediately to transmutation's right — move it until the lamp lights.",
      },
      {
        id: "clock",
        label: "clock",
        type: "jack",
        x: 28.2,
        y: 26.3,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "fires a pulse on each clock step the sequencer accepts, so downstream sequencers, clocks, and trigger inputs can follow transmutation's transport. the pulse is 10 V for 1 ms, driven by an event counter in the expander message.",
        tip: "mult it to a clock divider to derive bar-length gates from the same transport.",
      },
      {
        id: "reset",
        label: "reset",
        type: "jack",
        x: 71.8,
        y: 26.3,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "fires a 10 V, 1 ms pulse when the transport resets, restarting anything patched to it alongside transmutation. like the other event jacks it is driven by a counter, so a missed frame coalesces into one pulse rather than firing twice.",
        tip: "patch it to the reset inputs of every sequencer slaved to clock so they all restart on the same beat.",
      },
      {
        id: "phrase",
        label: "phrase",
        type: "jack",
        x: 28.2,
        y: 39.2,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "fires a 10 V, 1 ms pulse at the end of a phrase — the shared harmony loop boundary — marking where one cycle ends and the next begins. use it to trigger fills, scene-adjacent modulation, or anything that should happen once per phrase.",
        tip: "run it through a Bernoulli gate to make phrase-boundary fills probabilistic.",
      },
      {
        id: "scene",
        label: "scene",
        type: "jack",
        x: 71.8,
        y: 39.2,
        size: 24,
        voltageRange: "10V pulse, 1 ms",
        description: "fires a 10 V, 1 ms pulse when a variation actually launches, not when it is queued, so the pulse always lands on the audible change. patch it to anything that should react to scene motion: sample-and-holds, switches, envelope triggers.",
        tip: "sample a slow random voltage on each scene pulse to give every scene its own modulation offset.",
      },
      {
        id: "vel-a",
        label: "vel a",
        type: "jack",
        x: 28.2,
        y: 51.8,
        size: 24,
        voltageRange: "0-10V · poly ≤6",
        description: "per-voice velocity for lane A: 0-10 V with one channel per voice, up to six. each voice latches its value on the attack and holds it through the release, so editing velocity mid-note never moves the CV under a sustaining envelope. velocity is not audible on its own — patch it to a VCA or an envelope depth.",
        tip: "patch it beside the lane's audio into a polyphonic VCA for per-voice dynamics with no extra modules.",
      },
      {
        id: "vel-b",
        label: "vel b",
        type: "jack",
        x: 71.8,
        y: 51.8,
        size: 24,
        voltageRange: "0-10V · poly ≤6",
        description: "per-voice velocity for lane B, identical in behavior to vel A: 0-10 V, one channel per voice, latched at the attack and held through the release. left is lane A and right is lane B through the expression group.",
        tip: "cross-patch vel B to lane A's filter cutoff for accents in one lane to shape the tone of the other.",
      },
      {
        id: "acc-a",
        label: "acc a",
        type: "jack",
        x: 28.2,
        y: 64.5,
        size: 24,
        voltageRange: "0/10V gate · poly ≤6",
        description: "per-lane accent for lane A: 10 V while an accented voice has its gate up, 0 V otherwise, with one channel per voice up to six. use it to punch accented notes through a VCA, open a filter, or ping anything that takes a gate.",
        tip: "OR it with the lane's main gate through a mixer to make accented notes strike harder without a second envelope.",
      },
      {
        id: "acc-b",
        label: "acc b",
        type: "jack",
        x: 71.8,
        y: 64.5,
        size: 24,
        voltageRange: "0/10V gate · poly ≤6",
        description: "per-lane accent for lane B, matching acc A channel for channel: 10 V while an accented voice of lane B has its gate up. pair it with vel B to separate how loud a note plays from whether it is accented.",
        tip: "drive a hi-hat's accent input from acc B while vel B shapes its decay for a two-dimensional groove.",
      },
      {
        id: "harm-cv",
        label: "harmony cv",
        type: "jack",
        x: 28.2,
        y: 77.4,
        size: 24,
        voltageRange: "1V/OCT · poly ≤6",
        description: "the scene's voiced global harmony as pitch CV, up to six channels, present even while lane A rests. voiced global harmony does not exist in transmutation's engine yet, so this jack currently sits at 0 V and says so in its tooltip; it comes alive with no change to alembic once the engine grows the feature.",
        tip: "hover the jack to check whether your transmutation version supplies harmony yet — the tooltip reports the live state.",
      },
      {
        id: "harm-gate",
        label: "harmony gate",
        type: "jack",
        x: 71.8,
        y: 77.4,
        size: 24,
        voltageRange: "gate · poly ≤6",
        description: "gates for the harmony tones, matched channel for channel with harm cv. like its cv partner it is quiet today — 0 V with the gate low — until transmutation's engine supplies voiced global harmony.",
        tip: "leave the cable patched even while quiet: the jack starts firing the moment the engine feature lands.",
      },
      {
        id: "bass-cv",
        label: "bass cv",
        type: "jack",
        x: 28.2,
        y: 90.0,
        size: 24,
        voltageRange: "1V/OCT",
        description: "the lowest sounding voice of lane A as pitch CV. the pitch is held through the release so a tail does not jump — only the gate falls. bass needs no engine state beyond the voices themselves, so it is live today rather than waiting on a feature.",
        tip: "patch it to a dedicated bass oscillator to double the lowest voice an octave down.",
      },
      {
        id: "bass-gate",
        label: "bass gate",
        type: "jack",
        x: 71.8,
        y: 90.0,
        size: 24,
        voltageRange: "gate",
        description: "high at 10 V while lane A has any voice sounding, low otherwise. pair it with bass cv to articulate a separate bass voice that tracks the bottom of the lane.",
        tip: "use it as the gate for a sidechain envelope keyed to lane A's lowest voice.",
      },
    ],
    manual: [
      {
        title: "what it is",
        body: "Alembic is Transmutation's output expander: twelve jacks and no controls. Place it immediately to Transmutation's right and every jack becomes a view of a value Transmutation has already computed, brought out where a patch can reach it. There are no knobs, no switches, and no inputs — it adds nothing musical of its own."
      },
      {
        title: "the twelve outputs",
        body: "The jacks fall into three groups of two pairs. Transport carries CLOCK, RESET, PHRASE, and SCENE — 10 V, 1 ms pulses on the master clock, transport resets, phrase ends, and launched scene changes. Expression carries VEL A, VEL B, ACC A, and ACC B: per-lane velocity (0-10 V, latched on the attack, held through the release) and per-lane accent (10 V while an accented voice has its gate up), each polyphonic with one channel per voice up to six. Voices carries BASS CV with BASS GATE — the lowest sounding voice of lane A — and HARM CV with HARM GATE, the shared harmony. Left is lane A and right is lane B through the expression group; left is CV and right is its gate through the voices group."
      },
      {
        title: "link lamp and broken link",
        body: "The LINK jewel reports the expander link: green while a linked source is transporting, amber while linked and stopped, red when a Transmutation is present but its message cannot be used, and dark when there is nothing on the left. Dragging the Transmutation away drops every gate low and every CV to 0 V, with all twelve tooltips reporting the broken link — Alembic never keeps playing the last message it received."
      },
      {
        title: "timing",
        body: "All twelve jacks come out of one message, so they are all late by the same amount and each CV arrives together with its gate. Events are counted rather than flagged: Rack swaps expander buffers at a block boundary, so a repeated frame fires nothing, a run of missed frames coalesces into a single 1 ms pulse, and attaching Alembic to a running sequencer never fires a spurious pulse on the first sample."
      },
      {
        title: "jacks waiting on the engine",
        body: "Voiced global harmony does not exist in Transmutation's engine yet, so HARM CV and HARM GATE sit at 0 V with the gate low. The producer declares exactly what it supplies and Alembic holds every unsupplied jack quiet, reporting the state in that jack's tooltip — hover any jack to see what it currently carries. When the engine gains a feature those jacks come alive with no change to Alembic; velocity and accent were in that state until Transmutation grew them, and they are live now."
      }
    ]
  },
  {
    slug: "campanile",
    name: "campanile",
    subtitle: "three bells walk a polyphonic chord on interlocking paths — seven spreads, polyrhythmic ratios, ratchet, register-safe bass",
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
          "sets the order one bell walks the note pool: Up, Down, Up/Down, Down/Up, Up&Down, Random, As played, Converge",
          "Up/Down sounds the endpoints once per cycle; Up&Down repeats both endpoints for a bouncing feel",
          "Random is a deterministic walk that avoids immediate repeats where it can; As played keeps the source chord's channel order; Converge walks outside in — lowest, highest, second lowest, second highest",
          "octave duplicates are removed from the chord before RANGE extends it, so the pool holds distinct pitch classes; every pattern except As played walks them in ascending pitch order",
        ],
        tip: "learn the spreads on Up first — the patterns change the path, the spreads change the relationship, and hearing them separately helps.",
      },
      {
        id: "spread",
        label: "spread",
        type: "knob",
        x: 36.1,
        y: 15.6,
        size: 12,
        description: [
          "sets how the three bells relate: Unison, Octave, Chord, Canon, Contrary, Hunt, Dodge. Octave is the default",
          "Unison puts all three on the same note; Octave stacks the same line at pitch, one octave up and two octaves up; Chord moves three adjacent chord places in parallel",
          "Canon delays B two rows behind A and C two rows behind B, for a three-part round; Contrary runs A forward against B and C backward with C an octave higher",
          "Hunt and Dodge walk with golden-ratio related strides so the figure keeps evolving instead of looping, and a collision pass keeps the bells on distinct pitch classes whenever the chord supplies at least three",
        ],
        tip: "Hunt with RANGE at 3 and three contrasting oscillators is the fastest way to hear what the module is for.",
      },
      {
        id: "range",
        label: "range",
        type: "knob",
        x: 58.6,
        y: 15.6,
        size: 12,
        description: "extends the note pool upward by whole octaves, 1 to 4 with 2 as the default. It widens the territory the patterns walk without transposing the source chord itself.",
        tip: "raise RANGE instead of transposing the chord when a line feels cramped — the chord stays put and the walk gets longer.",
      },
      {
        id: "pattern-trim",
        label: "pattern trim",
        type: "knob",
        x: 13.5,
        y: 33.2,
        size: 8,
        description: "attenuverter for PATTERN CV. Fully clockwise, 0 to 10 V spans the whole pattern list and adds to the knob. The sum is quantized to a valid setting, never interpolated — halfway between Up and Random has no meaning.",
        tip: "a stepped random source here with the trim barely open wanders between neighboring patterns.",
      },
      {
        id: "spread-trim",
        label: "spread trim",
        type: "knob",
        x: 36.1,
        y: 33.2,
        size: 8,
        description: "attenuverter for SPREAD CV. Fully clockwise, 0 to 10 V spans the whole spread list and adds to the knob, quantized to whole settings.",
        tip: "a slow LFO into SPREAD CV with the trim near noon reorganizes a held chord without touching a knob.",
      },
      {
        id: "range-trim",
        label: "range trim",
        type: "knob",
        x: 58.6,
        y: 33.2,
        size: 8,
        description: "attenuverter for RANGE CV. Fully clockwise, 0 to 10 V spans 1 to 4 octaves and adds to the knob, quantized to whole octaves.",
        tip: "sequence this with a slow gate pattern to alternate tight and wide voicings across sections.",
      },
      {
        id: "rate",
        label: "rate",
        type: "knob",
        x: 11.5,
        y: 49.7,
        size: 12,
        description: "internal note-clock rate from 0.25 to 16 Hz, 2 Hz at default. It sets how fast the bells advance until CLK is patched, which takes over completely.",
        tip: "leave CLK unpatched while composing the figure, then patch the master clock last — the pattern survives the handover.",
      },
      {
        id: "gate-length",
        label: "gate length",
        type: "knob",
        x: 27.9,
        y: 49.7,
        size: 12,
        description: "gate length as a share of each bell's current slot, 5 to 95 percent with 50 as the default. In RHY mode each bell's slot follows its own multi-row period, so slow bells hold longer notes.",
        tip: "short gates under 25 percent keep 1:2:4 ratchets articulate instead of smeared.",
      },
      {
        id: "chord-rate",
        label: "chord rate",
        type: "knob",
        x: 44.3,
        y: 49.7,
        size: 10,
        description: "how often the bass updates and the CHORD trigger fires: every 4, 8, 16 or 32 note rows, with every 16 as the default. Longer divisions let the bells roam over a steady bass.",
        tip: "at every 32 with a slow clock the bass becomes a section marker — pair it with a long filter sweep.",
      },
      {
        id: "bass",
        label: "bass",
        type: "knob",
        x: 60.7,
        y: 49.7,
        size: 10,
        description: "moves the bass register window from −2 to +2 octaves, 0 at default. At 0 the window is C2 to B2; the knob shifts that floor up or down by whole octaves.",
        tip: "drop it to −1 when the chord sits high so the bass still reads as bass.",
      },
      {
        id: "ratio-trim",
        label: "ratio trim",
        type: "knob",
        x: 9.2,
        y: 65.9,
        size: 8,
        description: "attenuverter for RATIO CV. Fully clockwise, 0 to 10 V spans the whole seven-ratio list and adds to the knob, quantized to whole ratios.",
        tip: "a sample-and-hold into RATIO CV with a small trim setting jumps between adjacent ratios on each trigger.",
      },
      {
        id: "ratio",
        label: "ratio",
        type: "knob",
        x: 23.2,
        y: 65.9,
        size: 10,
        description: "picks one of seven activity relationships for the three bells: 1:1:1, 1:2:2, 1:2:3, 1:2:4, 1:3:5, 2:3:4, 1:4:8. The RATIO MODE lever decides what the numbers do to the sound.",
        tip: "1:2:4 is the showcase: try it in RAT mode first, then flip to RHY without changing anything else.",
      },
      {
        id: "ratio-mode",
        label: "ratio mode",
        type: "switch",
        x: 37.8,
        y: 65.9,
        size: 8,
        description: [
          "lower position is RAT (the default): every bell advances every row and its number is how many strikes it fires inside that row — 1:2:4 gives A one strike, B two and C four on one shared step",
          "upper position is RHY: a number N means that bell strikes every Nth row and holds its last pitch between, with its gate stretched across its own period",
        ],
        tip: "flip this live mid-pattern — the pitches keep walking while the rhythm reorganizes underneath.",
      },
      {
        id: "shape",
        label: "shape",
        type: "knob",
        x: 51.1,
        y: 65.9,
        size: 10,
        description: "skews ratchet strikes inside the row; it only affects RAT mode. Centered they are evenly spaced, turned left they cluster at the start with growing gaps (DRAG), turned right the gaps shrink toward the end (ROLL).",
        tip: "set 1:2:4 in RAT with a short gate, then sweep SHAPE slowly — one gesture moves from march to stagger to flam.",
      },
      {
        id: "call",
        label: "call",
        type: "switch",
        x: 63.2,
        y: 65.9,
        size: 8,
        description: "momentary pushbutton that shifts all three paths starting on the next row. It is deterministic and stays on the note clock — the same call at the same place always does the same thing. The button lights while sounding, including calls arriving at the trigger input.",
        tip: "tap it every few bars during a Canon to rotate the round without stopping the clock.",
      },
      {
        id: "ratio-cv",
        label: "ratio cv",
        type: "jack",
        x: 9.2,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "stepped CV over the ratio list, scaled by the RATIO trim directly above it. Adds to the knob and quantizes to whole ratios.",
        tip: "quantized, so audio-rate modulation here aliases into stepped chaos rather than smooth sweeps — usually a feature.",
      },
      {
        id: "clk",
        label: "clk",
        type: "jack",
        x: 19.2,
        y: 77.3,
        size: 8,
        voltageRange: "clock",
        description: "external note clock. Each rising edge advances the bells one row and the RATE knob is ignored while this is patched.",
        tip: "swing the incoming clock rather than the module — every ratio and the chord divider follow it together.",
      },
      {
        id: "reset",
        label: "reset",
        type: "jack",
        x: 29.3,
        y: 77.3,
        size: 8,
        voltageRange: "trigger",
        description: "returns the path, call offset, chord divider and clock measurement to their starting state. The next clock edge begins the figure again.",
        tip: "mult your transport reset here so the figure always starts from row one with the sequencer.",
      },
      {
        id: "call-in",
        label: "call in",
        type: "jack",
        x: 39.3,
        y: 77.3,
        size: 8,
        voltageRange: "trigger",
        description: "trigger input identical to the CALL button: shifts all three paths from the next row. The button lights when a trigger arrives here too.",
        tip: "drive it from a divided clock for a call that lands in the same place every cycle.",
      },
      {
        id: "pattern-cv",
        label: "pattern cv",
        type: "jack",
        x: 49.3,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "CV over the pattern list, scaled by the PATTERN trim. Fully clockwise on the trim, 0 to 10 V spans all eight patterns and adds to the knob, quantized.",
        tip: "negative trim settings let an envelope pull the pattern backward from the knob position and release back to it.",
      },
      {
        id: "spread-cv",
        label: "spread cv",
        type: "jack",
        x: 59.3,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "CV over the spread list, scaled by the SPREAD trim. Fully clockwise on the trim, 0 to 10 V spans all seven spreads and adds to the knob, quantized.",
        tip: "hold a chord and feed this slow triangle motion — the voicing breathes between neighboring spreads.",
      },
      {
        id: "range-cv",
        label: "range cv",
        type: "jack",
        x: 69.3,
        y: 77.3,
        size: 8,
        voltageRange: "0-10V",
        description: "CV over the 1 to 4 octave range, scaled by the RANGE trim. Fully clockwise on the trim, 0 to 10 V spans the full range and adds to the knob, quantized to octaves.",
        tip: "a gate here with the trim set makes verses narrow and choruses wide with one cable.",
      },
      {
        id: "rate-cv",
        label: "rate cv",
        type: "jack",
        x: 79.4,
        y: 77.3,
        size: 8,
        voltageRange: "1V/oct",
        description: "exponential FM on the internal clock at 1 V/oct: +1 V doubles the rate, −1 V halves it. The combined rate is limited to 0.02 to 100 Hz. It does nothing while CLK is patched.",
        tip: "a decaying envelope here gives a figure that rushes in and settles onto the knob rate.",
      },
      {
        id: "chord-in",
        label: "chord in",
        type: "jack",
        x: 89.4,
        y: 77.3,
        size: 8,
        voltageRange: "V/oct · poly ≤16",
        description: "the note pool: polyphonic V/oct, up to 16 channels. Octave duplicates are folded out so at most 12 distinct pitch classes remain, then RANGE extends them upward by whole octaves.",
        tip: "feed it from a chord sequencer and change chords freely — the bells re-voice on the next row without a glitch.",
      },
      {
        id: "a",
        label: "a",
        type: "jack",
        x: 17.2,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "bell A pitch in V/oct. With no chord patched it holds its last voltage so connected oscillators do not fall to C4.",
        tip: "start with A alone into one voice and add B and C once the figure feels right.",
      },
      {
        id: "b",
        label: "b",
        type: "jack",
        x: 30.3,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "bell B pitch in V/oct, related to A by the current SPREAD. Holds its last voltage with no chord patched.",
        tip: "give B a contrasting timbre from A — the spreads are written to be heard as separate lines.",
      },
      {
        id: "c",
        label: "c",
        type: "jack",
        x: 43.4,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "bell C pitch in V/oct, the third line of the figure. Holds its last voltage with no chord patched.",
        tip: "in Octave spread, C sits two octaves above A — a triangle sub two octaves down balances it.",
      },
      {
        id: "gate",
        label: "gate",
        type: "jack",
        x: 56.6,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V · poly 3",
        description: "three-channel polyphonic gate: channels 1, 2 and 3 belong to bells A, B and C. Patch it to a polyphonic envelope and VCA, or split it to three monophonic voices. At the default 1:1:1 ratio all three channels match; with no chord patched every channel stays low.",
        tip: "split the channels to three envelopes with different decays to separate the bells in time as well as pitch.",
      },
      {
        id: "bass-out",
        label: "bass out",
        type: "jack",
        x: 69.7,
        y: 89.1,
        size: 8,
        voltageRange: "V/oct",
        description: "the literal lowest incoming chord note in V/oct — not an inferred root, so inversions and slash voicings keep their lowest played note. It folds into the BASS window and only moves on the chord clock, plus one catch-up row when the input chord changes.",
        tip: "run BASS into a sub oscillator with CHORD triggering its envelope for a bass line that never fights the bells.",
      },
      {
        id: "chord-out",
        label: "chord out",
        type: "jack",
        x: 82.8,
        y: 89.1,
        size: 8,
        voltageRange: "10V trigger",
        description: "fires a short 10 V trigger whenever the chord clock ticks — every 4, 8, 16 or 32 rows per CHORD RATE. The context menu can restrict it to rows where the input chord actually changed.",
        tip: "use it to advance a chord sequencer and the harmony steps in lock with the bass.",
      },
      {
        id: "blue-line",
        label: "blue-line display",
        type: "meter",
        x: 79.3,
        y: 39.7,
        size: 26,
        description: [
          "the figure drawn as change-ringing blue lines: time runs down the screen with the current row highlighted, columns are the chord's distinct pitch classes low to high, and nine rows of history stay visible",
          "bells A, B and C draw in aged teal, purple and amber, matching their jack labels; bells sharing a column fan apart so unisons still read as three",
          "the top readout shows pattern, spread, sounding pitch names, bass note, ratio mode and the size of the active note pool, and a horizontal rule marks rows where the bass and chord trigger update",
        ],
        tip: "watch for the horizontal rule — it shows exactly when the next bass move and chord trigger land.",
      },
    ],
    contextMenu: [
      {
        id: "bass-fold",
        group: "Bass",
        label: "Fold",
        kind: "choice",
        values: ["Fixed window", "Nearest to previous"],
        description: "Fixed window folds the bass into C2 to B2, moved by the BASS knob. Nearest to previous allows octaves outside that window when they make a smaller melodic move from the last bass note."
      },
      {
        id: "chord-trigger-change-only",
        group: "Chord trigger",
        label: "Only on chord change",
        kind: "toggle",
        description: "When off, CHORD fires on every division of the chord clock. When on, it fires only on rows where the input chord changed, so a static harmony stays silent."
      },
      {
        id: "theme-follow",
        group: "Theme",
        label: "Follow global theme",
        kind: "toggle",
        description: "Follows the shared phosphor theme by default; picking a local theme for this module switches following off. Display only — it never touches the sound."
      }
    ],
    manual: [
      {
        title: "what it does",
        body: "Campanile is an arpeggiator built on change ringing: patch a polyphonic V/oct chord into CHORD and three bells walk it as related melody lines on A, B and C, with a three-channel gate, a register-safe bass pitch and a slower chord trigger. PATTERN sets how one bell walks the chord, SPREAD sets how the other two relate to it, and RATIO puts them on different rhythms. It borrows ringing ideas as a musical model — it does not reproduce traditional methods or enforce legal changes between rows."
      },
      {
        title: "patterns and spreads",
        body: "PATTERN walks one bell through the pool: Up, Down, both Up/Down shapes, Random, As played, and Converge from the outside in. SPREAD relates the other two bells to it, from Unison and Octave through parallel Chord motion, a two-row Canon round, Contrary motion, and the golden-ratio Hunt and Dodge figures that keep evolving instead of looping. RANGE extends the pool upward by 1 to 4 whole octaves without transposing the source chord."
      },
      {
        title: "ratios and shape",
        body: "RATIO picks one of seven relationships — 1:1:1, 1:2:2, 1:2:3, 1:2:4, 1:3:5, 2:3:4, 1:4:8 — and the mode lever decides what the numbers mean. In RAT every bell advances each row and fires its number of strikes inside it; in RHY a bell with number N strikes every Nth row and holds its pitch between, with its gate stretched over its own period. SHAPE only affects RAT: centered the strikes are even, left clusters them into a DRAG, right tightens them into a ROLL."
      },
      {
        title: "two clocks",
        body: "The note clock advances the bells and comes from CLK or the 0.25 to 16 Hz RATE knob; the chord clock divides it by 4, 8, 16 or 32 and is the only thing that moves BASS and fires CHORD. Changing the input chord latches an extra bass update on the next note row, so a live player never waits up to 32 rows for the bass to catch up. RST returns the path, call offset, chord divider and clock measurement to their starting state."
      },
      {
        title: "calls and the display",
        body: "CALL, from the button or its trigger input, shifts all three paths starting on the next row — deterministic, on the note clock, and named for the change-ringing term for an instruction that alters a course. The blue-line display plots the last nine rows with time running down and pitch classes left to right, colors the bells teal, purple and amber, and rules a horizontal line wherever the bass and chord trigger update."
      }
    ]
  },
  {
    slug: "concordance",
    name: "concordance",
    subtitle: "master-clock divide-down paraphonic ensemble with twelve pitch-class clocks, traveler band filter and eight-stop registration — polyphonic in, stereo pair out",
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
        description: "one of eight whole-instrument stops: Newsreel, Tutti, Vox humana, Tibia, Celeste, Bourdon, Regal and Aeolian. Turning to a stop writes its values into wave, expand, the five drawbars, the envelope, the traveler, vibrato, ensemble and voicing, then leaves every knob editable; tune is never touched. A stop only loads when the selection changes, so the instrument stays yours to adjust.",
        tip: "the tooltip names the current stop — turn to one, read what it set, then edit from there.",
      },
      {
        id: "tune",
        label: "tune",
        type: "knob",
        x: 25.8,
        y: 66.9,
        size: 13,
        description: "moves the whole chord ±100 cents around concert pitch. It offsets the shared master clock, so vibrato and drift move with it and everything stays one instrument.",
        tip: "match a detuned tape loop here instead of retuning every oscillator in the patch.",
      },
      {
        id: "wave",
        label: "wave",
        type: "switch",
        x: 9.6,
        y: 66.9,
        size: 9,
        description: "ramp, square, narrow pulse, or a string stack of the 8 foot saw with its phase-locked 4 foot octave. All four are level-matched, so switching changes timbre only.",
        tip: "the string stack through a narrow traveler band is the closest this gets to a real ensemble keyboard.",
      },
      {
        id: "expand",
        label: "expand",
        type: "knob",
        x: 41.9,
        y: 66.9,
        size: 13,
        description: "blends a quieter, key-dependent stretched copy around the locked divider core — at zero every pitch relationship is strictly divided, higher settings loosen into the honky-tonk pitch expansion of the PE-1000.",
        tip: "a little expand under slow chords; more under stabs, where the beating hides inside the attack.",
      },
      {
        id: "attack",
        label: "attack",
        type: "knob",
        x: 9.6,
        y: 33.1,
        size: 13,
        description: "shared envelope attack, 2 ms to 3.2 s. One envelope drives every voice, so a new chord swells as a section rather than as sixteen separate notes.",
        tip: "slow attacks with the Tibia stop score a landscape with two fingers.",
      },
      {
        id: "decay",
        label: "decay",
        type: "knob",
        x: 25.8,
        y: 33.1,
        size: 13,
        description: "shared envelope decay, 0.16 s to 32 s. It shapes the fall of held chords through the single paraphonic envelope.",
        tip: "long decays let the section movement wander audibly inside a held chord.",
      },
      {
        id: "release",
        label: "release",
        type: "knob",
        x: 41.9,
        y: 33.1,
        size: 13,
        description: "shared envelope release, 25 ms to 11 s. It sets how long the chord rings after the last gate falls.",
        tip: "match release to the room — long tails want long reverbs.",
      },
      {
        id: "breath",
        label: "breath",
        type: "switch",
        x: 58.1,
        y: 33.1,
        size: 9,
        description: "one shared paraphonic envelope, independent bass and treble groups split at C2, C3 or C4, or a PE-style mode with grouped attack and individual key decay.",
        tip: "split mode keeps bass notes from retriggering the treble tail under a held chord.",
      },
      {
        id: "traveler-low",
        label: "traveler low",
        type: "knob",
        x: 50.0,
        y: 12.1,
        size: 10,
        description: "the lower edge of the traveler band, 22 Hz to 2.3 kHz at the knob. Both faders run low to high left to right, so the band you hear is the gap between the two handles.",
        tip: "close the gap to a slit at high peak and sweep both handles together for a formant wah.",
      },
      {
        id: "traveler-high",
        label: "traveler high",
        type: "knob",
        x: 50.0,
        y: 20.2,
        size: 10,
        description: "the upper edge of the traveler band, 420 Hz to 18.5 kHz at the knob. SOFT pulls it down by up to 48%, and leaning on SWELL opens it by up to a sixth of its travel.",
        tip: "park it low with the Bourdon stop for bass that never leaves the room.",
      },
      {
        id: "peak",
        label: "peak",
        type: "knob",
        x: 9.6,
        y: 16.2,
        size: 10,
        description: "resonance at both band edges, Q from 0.68 to about 5.5. Narrow bands at high peak ring like formants on every chord.",
        tip: "high peak plus traveler CV turns block chords into talking vowels.",
      },
      {
        id: "soft",
        label: "soft",
        type: "knob",
        x: 90.4,
        y: 16.2,
        size: 10,
        description: "tone control in the mellow-tab tradition: it darkens the band and, toward the top, rounds chords with gentle warmth — the dry bus never distorts outright. The Vintage range tops out at tanh drive 1.6; the Modern context-menu range turns the top half into a full overdrive sweep to drive 3.4.",
        tip: "Modern range, high peak, closed band: a screaming formant filter that still tracks chords.",
      },
      {
        id: "vib-depth",
        label: "vib depth",
        type: "knob",
        x: 75.4,
        y: 33.1,
        size: 13,
        description: "vibrato amount up to 38 cents on the shared master clock, so the whole chord bends as one instrument. By default it swells in over about a second after the first key of a phrase, the PE-1000 way; the context menu can make it constant.",
        tip: "deep slow vibrato with delayed onset is what sells a chord as bowed rather than keyed.",
      },
      {
        id: "vib-rate",
        label: "vib rate",
        type: "knob",
        x: 90.4,
        y: 33.1,
        size: 13,
        description: "vibrato rate, 0.18 to 8.2 Hz, into the same shared master clock as drift and tune.",
        tip: "rates near 5 Hz with shallow depth read as nervous chorus rather than pitch wobble.",
      },
      {
        id: "ensemble",
        label: "ensemble",
        type: "knob",
        x: 58.1,
        y: 66.9,
        size: 13,
        description: "chorus amount. The wet path runs through a BBD-style input limiter, so it squashes and warms like bucket-brigade hardware while the dry signal stays clean.",
        tip: "halfway up is the string-machine seat; full up is seasick — both are useful.",
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 74.2,
        y: 66.9,
        size: 13,
        description: "separation of the chorus taps — narrows or widens the stereo image of the wet path around the dry center.",
        tip: "narrow the width before a mono club system so the chorus survives the sum.",
      },
      {
        id: "voicing",
        label: "voicing",
        type: "switch",
        x: 90.4,
        y: 66.9,
        size: 9,
        description: "two chorus characters. Classic is a three-delay chorus at a slow 0.62 Hz sweep plus a faster 5.71 Hz shimmer, the Roland way; 3-phase reads one delay at three points 120 degrees apart. Classic is wider, 3-phase is narrower and denser.",
        tip: "3-phase sits under a vocal; Classic sits in front of one.",
      },
      {
        id: "swell",
        label: "swell",
        type: "knob",
        x: 74.2,
        y: 50.0,
        size: 13,
        description: "overall expression level, in the manner of an organ swell pedal: leaning in makes the instrument louder, brighter and wider at once. It scales output gain from 0.35 to full of LEVEL, opens the top of the traveler band by up to a sixth, and adds up to a quarter of ENSEMBLE.",
        tip: "park it at 70% with a pedal on SWELL CV so every phrase has somewhere to go.",
      },
      {
        id: "level",
        label: "level",
        type: "knob",
        x: 90.4,
        y: 50.0,
        size: 13,
        description: "output level, a plain gain after everything. The magic eye reads after it, so turning down closes the eye.",
        tip: "set the loudest stop first, then match the rest with level as you audition them.",
      },
      {
        id: "magic-eye",
        label: "magic eye",
        type: "meter",
        x: 50.0,
        y: 50.0,
        size: 20,
        description: "output meter styled as a magic-eye tuning tube. The dark wedge is wide at rest and closes as the output grows, so a shut eye means the instrument is singing. It reads after LEVEL and SWELL with 8 ms rise and 120 ms fall, and follows the shared display palette: Phosphor, Lunar, Solar and Amber.",
        tip: "ride SWELL until the wedge just kisses shut on chord peaks.",
      },
      {
        id: "voct",
        label: "v/oct",
        type: "jack",
        x: 25.8,
        y: 79.0,
        size: 9,
        voltageRange: "1V/OCT · poly ≤16",
        description: "polyphonic pitch for up to 16 channels, quantized to semitones around C4 at 0 V. Unpatched, the module assumes 0 V.",
        tip: "a mono sequence on channel 1 alone still plays — a chord of one is valid here.",
      },
      {
        id: "gate",
        label: "gate",
        type: "jack",
        x: 9.6,
        y: 79.0,
        size: 9,
        voltageRange: "gate · poly ≤16",
        description: "polyphonic gates, high at 1 V and above. Unpatched, every channel reads as held, so the module drones at C4 until a gate is patched.",
        tip: "mult one gate to every channel for block chords that breathe as a single section.",
      },
      {
        id: "register-cv",
        label: "register cv",
        type: "jack",
        x: 33.9,
        y: 89.1,
        size: 9,
        voltageRange: "1 V per stop",
        description: "1 V per stop, added to the REGISTRATION selector, so a sequencer steps through the eight stops. The new stop only loads when the selection changes.",
        tip: "a slow stepped random here re-registers the instrument between phrases.",
      },
      {
        id: "expand-cv",
        label: "expand cv",
        type: "jack",
        x: 41.9,
        y: 79.0,
        size: 9,
        voltageRange: "bipolar, 0.1 per volt",
        description: "bipolar CV adding to the EXPAND knob at a tenth of its travel per volt.",
        tip: "an envelope here stretches the attack, then lets the sustain lock back to the dividers.",
      },
      {
        id: "traveler-cv",
        label: "traveler cv",
        type: "jack",
        x: 50.0,
        y: 89.1,
        size: 9,
        voltageRange: "bipolar, ±3 octaves",
        description: "bipolar CV shifting the whole traveler band up or down without changing its width, 0.28 octaves per volt up to ±3 octaves.",
        tip: "an envelope here is a wah the entire chord rides together.",
      },
      {
        id: "ensemble-cv",
        label: "ensemble cv",
        type: "jack",
        x: 58.1,
        y: 79.0,
        size: 9,
        voltageRange: "bipolar, 0.1 per volt",
        description: "bipolar CV adding to the ENSEMBLE knob at a tenth of its travel per volt.",
        tip: "gate-driven swells of chorus depth make verse and chorus out of one held pad.",
      },
      {
        id: "swell-cv",
        label: "swell cv",
        type: "jack",
        x: 66.1,
        y: 89.1,
        size: 9,
        voltageRange: "bipolar, 0.1 per volt",
        description: "bipolar CV adding to the SWELL knob at a tenth of its travel per volt — loudness, brightness and width in one gesture.",
        tip: "a slow LFO here breathes the whole section without touching a knob.",
      },
      {
        id: "left",
        label: "left",
        type: "jack",
        x: 74.2,
        y: 79.0,
        size: 9,
        voltageRange: "mono audio",
        description: "left side of the stereo output pair, mono. The polyphony lives inside the module so the filter, articulation and ensemble stay genuinely shared.",
        tip: "this jack alone is a valid mono feed — the chorus folds down cleanly.",
      },
      {
        id: "right",
        label: "right",
        type: "jack",
        x: 90.4,
        y: 79.0,
        size: 9,
        voltageRange: "mono audio",
        description: "right side of the stereo output pair, mono. Take both for the full chorus image set by WIDTH and VOICING.",
        tip: "hard-pan the pair in the mixer; the module already did the imaging work.",
      },
    ],
    contextMenu: [
      {
        id: "drawbar-16",
        group: "drawbars",
        label: "16'",
        kind: "slider",
        description: "Mix level of the 16 foot rank, an octave below the played note — the bass foundation. Every rank stays phase-locked to the same divider family, so moving bars changes timbre and never tuning."
      },
      {
        id: "drawbar-8",
        group: "drawbars",
        label: "8'",
        kind: "slider",
        description: "Mix level of the 8 foot rank, the played note itself. It rests out at full, so the module sounds without touching anything."
      },
      {
        id: "drawbar-4",
        group: "drawbars",
        label: "4'",
        kind: "slider",
        description: "Mix level of the 4 foot rank, an octave above the played note."
      },
      {
        id: "drawbar-quint",
        group: "drawbars",
        label: "2 2/3'",
        kind: "slider",
        description: "Mix level of the 2 2/3 foot rank, a twelfth up — the quint that gives the reedy organ colour."
      },
      {
        id: "drawbar-2",
        group: "drawbars",
        label: "2'",
        kind: "slider",
        description: "Mix level of the 2 foot rank, two octaves up — the bright top."
      },
      {
        id: "registration",
        group: "registration",
        label: "registration",
        kind: "choice",
        values: ["Newsreel", "Tutti", "Vox humana", "Tibia", "Celeste", "Bourdon", "Regal", "Aeolian"],
        description: "Applies one of the eight stops, exactly as the REGISTRATION selector on the panel does."
      },
      {
        id: "retrigger",
        group: "retrigger shared envelope on new note",
        label: "retrigger shared envelope on new note",
        kind: "toggle",
        description: "On by default: a new note restarts the shared envelope even while other keys are held. Turn off for legato phrasing over a sustained chord."
      },
      {
        id: "delayed-vibrato",
        group: "delayed vibrato onset",
        label: "delayed vibrato onset",
        kind: "toggle",
        description: "On by default: the PE-style vibrato swell per phrase, rising over about a second after the first key down from silence. Turn off for constant vibrato."
      },
      {
        id: "clock-drift",
        group: "vintage clock drift",
        label: "vintage clock drift",
        kind: "toggle",
        description: "On by default: the master clock's slow ±0.9 cent wander from two stacked modulation phases. Turn off and the clock ticks perfectly, so every divider relationship stays exact until vibrato is dialled in."
      },
      {
        id: "soft-range",
        group: "soft drive range",
        label: "soft drive range",
        kind: "choice",
        values: ["vintage (tone + warmth)", "modern (tone + overdrive)"],
        description: "Vintage keeps SOFT a tone control whose top is chord warmth; Modern turns the top half into a full overdrive sweep."
      },
      {
        id: "living-ensemble",
        group: "living ensemble",
        label: "living ensemble",
        kind: "choice",
        values: ["off", "subtle", "natural", "loose"],
        description: "Gives each of the twelve pitch classes its own slow tuning and level drift — Subtle wanders ±3.2 cents, Natural ±7.0, Loose ±15.0 — so the chord is twelve players rather than one machine. Off is bit-identical to its own absence."
      },
      {
        id: "section-movement",
        group: "section movement",
        label: "section movement",
        kind: "choice",
        values: ["off", "subtle", "natural", "loose"],
        description: "Separate from Living ensemble: that one is who the players are, this one is how they come and go during a held chord. Only rearranges while a section is actually sounding."
      },
      {
        id: "oversampling",
        group: "saturation oversampling",
        label: "saturation oversampling",
        kind: "choice",
        values: ["1× (off)", "2× (default)", "4×", "8×"],
        description: "Saturation is the only stage that makes harmonics above Nyquist, so higher factors stop bright chords at high SOFT folding back, at a little more CPU."
      },
      {
        id: "split-point",
        group: "bass/treble split point",
        label: "bass/treble split point",
        kind: "choice",
        values: ["C2", "C3 (default)", "C4"],
        description: "The MIDI split between the bass and treble envelope groups for the grouped BREATH modes: note 36, 48 or 60."
      },
      {
        id: "theme",
        group: "theme",
        label: "theme",
        kind: "choice",
        values: ["follow global theme", "phosphor", "lunar", "solar", "amber"],
        description: "The magic eye follows the shared Shapetaker display palette, or takes its own local theme from Phosphor, Lunar, Solar or Amber."
      }
    ],
    manual: [
      {
        title: "twelve clocks, one instrument",
        body: "Twelve pitch-class clocks come off one master tuning source, and their octave taps stay locked in power-of-two relationships. Everything downstream — the traveler filter, the articulation and the ensemble — is shared, which is what makes Concordance paraphonic rather than polyphonic. TUNE, vibrato and drift all act on the same clock, so the whole chord moves as one instrument, and the tone controls take their cue from early polyphonic keyboards such as the Korg PE-1000."
      },
      {
        title: "stops and drawbars",
        body: "REGISTRATION is a bar selector with eight stops: Newsreel, Tutti, Vox humana, Tibia, Celeste, Bourdon, Regal and Aeolian. Turning to one writes those values into the other controls, so you can see what a stop did and edit from there — a stop loads a combination and leaves it editable, which is the whole difference from a preset slot. The five drawbars live in the context menu under Drawbars: 16, 8, 4, 2 2/3 and 2 foot ranks, all phase-locked to the same divider family, and each registration sets all five at once."
      },
      {
        title: "playing it",
        body: "Send matching polyphonic V/OCT and GATE, take audio from LEFT and RIGHT, turn ENSEMBLE up to about halfway, and try the eight stops. The traveler is two faders, LOW over HIGH, both running low to high left to right — the band you hear is the gap between the two handles, with PEAK resonating both edges and SOFT darkening it mellow-tab style. SWELL and LEVEL sit together as the output pair: LEVEL is a plain gain, while SWELL is the expression gesture that leans the whole instrument louder, brighter and wider at once."
      },
      {
        title: "articulation and vibrato",
        body: "ATTACK, DECAY and RELEASE drive the shared envelope, and BREATH chooses one paraphonic envelope, independent bass and treble groups split at C2, C3 or C4, or a PE-style mode with grouped attack and individual key decay. VIB DEPTH and VIB RATE modulate the shared master clock, and by default the vibrato swells in over about a second after the first key of a phrase; the context menu can make it constant. The Vintage clock drift wanders the master clock ±0.9 cents — turn it off and every divider relationship stays mathematically exact."
      },
      {
        title: "factory library",
        body: "The factory library holds 25 instruments in five folders: Keys, Pads, Bass, Leads and Percussion. Each preset stores every panel parameter plus the context-menu behaviours, so loading a sound never inherits settings from the previous patch."
      }
    ]
  },
  {
    slug: "crucible",
    name: "crucible",
    subtitle: "transmutation's input expander — ten jacks for record, harmony, performance, mute and solo, no controls, no outputs",
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
          "the pitch transmutation records from and auditions, polyphonic up to six notes. both record jacks must be patched before the recorder listens",
          "a mono gate on the record gate jack strikes every held pitch; a polyphonic gate strikes its own channel. a voice carrying a non-finite voltage is skipped rather than recorded as a wrong note",
        ],
        tip: "mult your sequencer's pitch here and its gate into rec gate to capture a phrase without touching transmutation's panel.",
      },
      {
        id: "rec-gate",
        label: "rec gate",
        type: "jack",
        x: 30.0,
        y: 22.2,
        size: 34,
        voltageRange: "gate · poly ≤6",
        description: "the gate transmutation records from, polyphonic up to six notes. a mono gate strikes every held pitch at once, while a polyphonic gate strikes only its own channel.",
        tip: "leave both record jacks unpatched and the recorder keeps listening to nothing — patch them as a pair or not at all.",
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
          "shifts both lanes by whole semitones at 1 V per octave. it adds to the panel control the way a pitch CV sums with a tune knob, so the knob still works with a cable in",
          "plus or minus two volts covers the full range of plus or minus 24 semitones. voltages between semitones are rounded, since a transpose between two semitones is a pitch nothing in the module can play",
        ],
        tip: "drive it from a keyboard or quantizer for key changes — it needs no scaling module.",
      },
      {
        id: "tension",
        label: "tension",
        type: "jack",
        x: 30.0,
        y: 38.9,
        size: 34,
        voltageRange: "0-10V",
        description: "opens and closes the chord voicings from 0 to 10 V. this one replaces the panel value rather than adding to it — the panel rests at full tension, so a jack that could only add would have nothing to do.",
        tip: "patch a slow envelope here to breathe colour in and out of the chords across a phrase.",
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
          "a gate: while it is high, steps marked fill play and steps marked not fill stay silent. it is OR'd with the panel button, so the button still works with a cable in",
          "switches high at 1 V and releases below 0.2 V, so a slow edge or a gate riding on a noisy bus does not chatter at the crossing",
        ],
        tip: "fire it from a manual gate button or an irregular clock division for fills on demand.",
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
          "picks one of the 16 scenes from 0 to 10 V. it fires only when the chosen scene changes, so holding a voltage does not relaunch the same scene forever",
          "sixteen scenes over ten volts puts a boundary every 0.625 V, so the jack asks for a quarter of a step of travel past a boundary before it changes scene — a voltage parked on a boundary never flips between two scenes",
          "launching by hand takes the wheel until the voltage moves to a different scene, and unpatching the jack forgets where it was so plugging back in chooses fresh",
        ],
        tip: "patch a slow stepped voltage to change scenes from a pattern rather than by hand.",
      },
      {
        id: "mute-a",
        label: "mute a",
        type: "jack",
        x: 30.0,
        y: 64.0,
        size: 34,
        voltageRange: "gate",
        description: "a gate that silences lane A while high. OR'd with the panel switch, so a lane muted by hand stays muted whatever the cable does.",
        tip: "sequence mutes from a gate sequencer for arrangement changes without touching the panel.",
      },
      {
        id: "mute-b",
        label: "mute b",
        type: "jack",
        x: 30.0,
        y: 72.4,
        size: 34,
        voltageRange: "gate",
        description: "a gate that silences lane B while high. OR'd with the panel switch, so hand and cable never fight over the lane.",
        tip: "hold both mute jacks from one multed gate to drop both lanes at once.",
      },
      {
        id: "solo-a",
        label: "solo a",
        type: "jack",
        x: 30.0,
        y: 80.7,
        size: 34,
        voltageRange: "gate",
        description: "a gate that solos lane A while high. solo wins over mute, the same as on the panel, and a lane the cable mutes can still be soloed by hand.",
        tip: "punch a solo from a footswitch gate so your hands stay on the main patch.",
      },
      {
        id: "solo-b",
        label: "solo b",
        type: "jack",
        x: 30.0,
        y: 89.1,
        size: 34,
        voltageRange: "gate",
        description: "a gate that solos lane B while high. solo wins over mute, the same as on the panel.",
        tip: "alternate solo A and solo B gates from a flip-flop for hands-free lane switching.",
      },
      {
        id: "link",
        label: "link",
        type: "meter",
        x: 83.0,
        y: 97.5,
        size: 20,
        description: [
          "lit when a transmutation is sitting immediately to the right. unlit means the jacks reach nothing — crucible only ever drives the module directly beside it",
          "green while patched cables carry voltages to the neighbour, amber when the link is good but every socket is empty, dark when there is nothing beside it",
        ],
        tip: "no response from any jack? check this lamp first — a dragged-away transmutation releases every jack at once.",
      },
    ],
    manual: [
      {
        title: "what it is",
        body: "crucible is transmutation's input expander: ten jacks in one column on a 4 HP panel covering the record pair, transpose, tension, fill, scene, mute and solo. place it immediately to transmutation's left and the link lamp lights when the two are talking. it adds nothing musical — every jack drives a control transmutation already has, and nothing comes back out of crucible except through transmutation."
      },
      {
        title: "playing it",
        body: "patch a gate into mute A and hold it high to silence lane A; patch 0 to 10 V into tension to open and close the chord voicings; patch a slow stepped voltage into scene to change scenes from a pattern rather than by hand. transpose adds to its panel knob like a tune CV, while tension replaces its panel value. the record pair needs both cables before the recorder listens — pitch alone records nothing."
      },
      {
        title: "gates do not chatter",
        body: "every gate goes high at 1 V, rack's convention, and does not let go until it falls back below 0.2 V. one threshold would let a slow edge, or a gate riding on a noisy bus, flip dozens of times around the crossing point; two mean the signal has to travel before the module changes its mind. fill, mute and solo are all OR'd with their panel controls, and solo wins over mute on the jacks exactly as on the panel."
      },
      {
        title: "scene select holds its choice",
        body: "sixteen scenes over ten volts puts a boundary every 0.625 V, well inside the noise on an ordinary CV bus — so the jack asks for a quarter of a step of travel past a boundary before it changes scene, and a voltage parked on a boundary never flips between two scenes. select is an event, not a level: it fires only when the chosen scene changes, launching by hand takes the wheel until the voltage moves elsewhere, and unpatching the jack forgets where it was so plugging back in chooses fresh rather than launching a leftover scene."
      },
      {
        title: "empty sockets and unlinking",
        body: "every jack reports whether it has a cable in it, separately from its voltage: zero volts on a patched jack is a value, while an unpatched jack leaves the panel control exactly as you set it. the jacks never move transmutation's knobs or switches, so pulling the cables returns the panel exactly as it was and nothing is written into the patch. dragging the transmutation away releases every jack at once — transpose returns to the panel value, tension to full, and no gate is left held."
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
          "round cathode-ray tube shared by all four channels in waveform mode; 1x2 & 3x4 mode splits it into two vector figures, channel I against II and III against IV",
          "each lane captures a 256-point min/max envelope per sweep and the beam is clipped to the circle, so a trace past the edge simply is not there",
          "the trigger-level line appears only while the trigger is in use (normal or single) — in auto or vector mode the threshold knob still sets the frequency-counter crossing level with no line drawn",
        ],
        tip: "with cursors on, click the face to grab the nearest cursor and drag it; otherwise the face is not clickable.",
      },
      {
        id: "pos-1",
        label: "channel i position",
        type: "knob",
        x: 10.6,
        y: 15.82,
        size: 11,
        description: "slides channel I's trace up or down by ±10 V so stacked signals can be separated. Display only — position never changes what leaves OUT-I.",
        tip: "offset a chord's voices a few volts apart to read four lines instead of one blur.",
      },
      {
        id: "pos-2",
        label: "channel ii position",
        type: "knob",
        x: 89.4,
        y: 15.82,
        size: 11,
        description: "slides channel II's trace up or down by ±10 V so stacked signals can be separated. Display only — position never changes what leaves OUT-II.",
        tip: "offset a chord's voices a few volts apart to read four lines instead of one blur.",
      },
      {
        id: "pos-3",
        label: "channel iii position",
        type: "knob",
        x: 10.6,
        y: 53.84,
        size: 11,
        description: "slides channel III's trace up or down by ±10 V so stacked signals can be separated. Display only — position never changes what leaves OUT-III.",
        tip: "offset a chord's voices a few volts apart to read four lines instead of one blur.",
      },
      {
        id: "pos-4",
        label: "channel iv position",
        type: "knob",
        x: 89.4,
        y: 53.84,
        size: 11,
        description: "slides channel IV's trace up or down by ±10 V so stacked signals can be separated. Display only — position never changes what leaves OUT-IV.",
        tip: "offset a chord's voices a few volts apart to read four lines instead of one blur.",
      },
      {
        id: "gain-1",
        label: "channel i gain",
        type: "knob",
        x: 10.6,
        y: 29.4,
        size: 7,
        description: [
          "sets channel I's vertical scale in volts per screen, snapped through 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16 and 0.08 V/screen",
          "starts at 10 V/screen, so a ±5 V signal fills the tube edge to edge. Display only — gain never touches the outputs",
          "while any gain knob moves, every readout temporarily shows its own channel's volts per screen for 1.6 s instead of the selected statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest around it with position.",
      },
      {
        id: "gain-2",
        label: "channel ii gain",
        type: "knob",
        x: 89.4,
        y: 29.4,
        size: 7,
        description: [
          "sets channel II's vertical scale in volts per screen, snapped through 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16 and 0.08 V/screen",
          "starts at 10 V/screen, so a ±5 V signal fills the tube edge to edge. Display only — gain never touches the outputs",
          "while any gain knob moves, every readout temporarily shows its own channel's volts per screen for 1.6 s instead of the selected statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest around it with position.",
      },
      {
        id: "gain-3",
        label: "channel iii gain",
        type: "knob",
        x: 10.6,
        y: 67.43,
        size: 7,
        description: [
          "sets channel III's vertical scale in volts per screen, snapped through 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16 and 0.08 V/screen",
          "starts at 10 V/screen, so a ±5 V signal fills the tube edge to edge. Display only — gain never touches the outputs",
          "while any gain knob moves, every readout temporarily shows its own channel's volts per screen for 1.6 s instead of the selected statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest around it with position.",
      },
      {
        id: "gain-4",
        label: "channel iv gain",
        type: "knob",
        x: 89.4,
        y: 67.43,
        size: 7,
        description: [
          "sets channel IV's vertical scale in volts per screen, snapped through 9 detents: 20, 10, 5, 2.5, 1.25, 0.625, 0.31, 0.16 and 0.08 V/screen",
          "starts at 10 V/screen, so a ±5 V signal fills the tube edge to edge. Display only — gain never touches the outputs",
          "while any gain knob moves, every readout temporarily shows its own channel's volts per screen for 1.6 s instead of the selected statistic",
        ],
        tip: "frame the loudest voice first, then stack the rest around it with position.",
      },
      {
        id: "seg-1",
        label: "channel i readout",
        type: "meter",
        x: 10.6,
        y: 38.92,
        size: 11,
        description: [
          "four-digit readout for channel I showing the selected statistic: peak-to-peak, minimum, maximum, frequency, rms or volts per screen, refreshed a few times a second like a bench meter",
          "click it to hide or show the trace — a muted lane reads blank rather than stale. Minimum, maximum and rms span the whole sweep buffer across every polyphonic channel; frequency counts threshold crossings on the first channel only",
        ],
        tip: "click a readout to solo the trace you are tuning without repatching.",
      },
      {
        id: "seg-2",
        label: "channel ii readout",
        type: "meter",
        x: 89.4,
        y: 38.92,
        size: 11,
        description: [
          "four-digit readout for channel II showing the selected statistic: peak-to-peak, minimum, maximum, frequency, rms or volts per screen, refreshed a few times a second like a bench meter",
          "click it to hide or show the trace — a muted lane reads blank rather than stale. Minimum, maximum and rms span the whole sweep buffer across every polyphonic channel; frequency counts threshold crossings on the first channel only",
        ],
        tip: "click a readout to solo the trace you are tuning without repatching.",
      },
      {
        id: "seg-3",
        label: "channel iii readout",
        type: "meter",
        x: 10.6,
        y: 77.06,
        size: 11,
        description: [
          "four-digit readout for channel III showing the selected statistic: peak-to-peak, minimum, maximum, frequency, rms or volts per screen, refreshed a few times a second like a bench meter",
          "click it to hide or show the trace — a muted lane reads blank rather than stale. Minimum, maximum and rms span the whole sweep buffer across every polyphonic channel; frequency counts threshold crossings on the first channel only",
        ],
        tip: "click a readout to solo the trace you are tuning without repatching.",
      },
      {
        id: "seg-4",
        label: "channel iv readout",
        type: "meter",
        x: 89.4,
        y: 77.06,
        size: 11,
        description: [
          "four-digit readout for channel IV showing the selected statistic: peak-to-peak, minimum, maximum, frequency, rms or volts per screen, refreshed a few times a second like a bench meter",
          "click it to hide or show the trace — a muted lane reads blank rather than stale. Minimum, maximum and rms span the whole sweep buffer across every polyphonic channel; frequency counts threshold crossings on the first channel only",
        ],
        tip: "click a readout to solo the trace you are tuning without repatching.",
      },
      {
        id: "mode",
        label: "mode",
        type: "switch",
        x: 23.31,
        y: 64.91,
        size: 7,
        description: [
          "waveform draws all four channels against time; 1x2 & 3x4 draws two vector figures instead, channel I against II and III against IV",
          "triggering is bypassed in vector mode: the threshold knob keeps setting the frequency-counter crossing level but no sweep waits on it",
        ],
        tip: "patch quadrature sines into I and II for the classic circle, then detune one voice and watch it turn.",
      },
      {
        id: "trig-mode",
        label: "trigger mode",
        type: "switch",
        x: 76.9,
        y: 64.91,
        size: 7,
        description: [
          "auto (down) draws whether or not the threshold is crossed, so there is always a picture while hunting for a signal; normal (center) draws only on a real crossing",
          "single (up) holds the current sweep until Arm single sweep is chosen in the menu, then captures one sweep on the next crossing and holds it",
        ],
        tip: "start in auto to find the signal, then move to normal once the trace stands still.",
      },
      {
        id: "time",
        label: "time",
        type: "knob",
        x: 23.31,
        y: 77.03,
        size: 11,
        description: [
          "horizontal scale in time per screen, detented through 15 steps from 1 ms to 50 s in the 1-2-5 sequence every bench scope uses",
          "starts at 500 ms per screen. At 1 s per screen and slower the display can roll instead of sweeping when Roll below 1 s/screen is on — the readable way to watch envelopes and slow LFOs",
        ],
        tip: "frame a few cycles, not dozens — a crowded sweep hides clipping and ringing.",
      },
      {
        id: "threshold",
        label: "threshold",
        type: "knob",
        x: 76.9,
        y: 77.03,
        size: 11,
        description: [
          "trigger threshold from −10 V to +10 V; the sweep starts when the trigger source crosses it on the selected edge",
          "also the crossing level for all four frequency counters at all times, even in auto or vector mode where no trigger line is drawn",
        ],
        tip: "park it mid-swing of the trigger source — near a peak or trough it fires on noise.",
      },
      {
        id: "stat-p2p",
        label: "p2p",
        type: "switch",
        x: 34.82,
        y: 75.55,
        size: 7,
        description: "shows peak-to-peak volts on all four readouts. One of four radio buttons with exactly one lit; the menu adds rms and volts per screen to the same choice.",
        tip: "peak-to-peak is the fastest clipping check — anything approaching 20 V is out of rack headroom.",
      },
      {
        id: "stat-min",
        label: "min",
        type: "switch",
        x: 45.01,
        y: 75.55,
        size: 7,
        description: "shows each lane's minimum volts across the sweep buffer. One of four radio buttons with exactly one lit; the menu adds rms and volts per screen to the same choice.",
        tip: "read min against max to see whether a waveform sits symmetric about zero.",
      },
      {
        id: "stat-max",
        label: "max",
        type: "switch",
        x: 55.19,
        y: 75.55,
        size: 7,
        description: "shows each lane's maximum volts across the sweep buffer. One of four radio buttons with exactly one lit; the menu adds rms and volts per screen to the same choice.",
        tip: "watch max while opening a filter to catch resonance peaks before they clip downstream.",
      },
      {
        id: "stat-freq",
        label: "freq",
        type: "switch",
        x: 65.38,
        y: 75.55,
        size: 7,
        description: "shows each lane's frequency in Hz, counted from threshold crossings on the first polyphonic channel and lightly smoothed against jitter. One of four radio buttons with exactly one lit.",
        tip: "if freq shows a dash on a slow LFO, the threshold sits outside the swing — move it mid-range.",
      },
      {
        id: "in-1",
        label: "ch-i",
        type: "jack",
        x: 10.6,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal to display on channel I. Accepts any voltage with up to 16 polyphonic channels, every one of them drawn, and an exact copy leaves OUT-I.",
        tip: "run the signal through dioptra inline instead of multing a copy to it.",
      },
      {
        id: "in-2",
        label: "ch-ii",
        type: "jack",
        x: 19.36,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal to display on channel II. Accepts any voltage with up to 16 polyphonic channels, every one of them drawn, and an exact copy leaves OUT-II.",
        tip: "run the signal through dioptra inline instead of multing a copy to it.",
      },
      {
        id: "in-3",
        label: "ch-iii",
        type: "jack",
        x: 28.11,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal to display on channel III. Accepts any voltage with up to 16 polyphonic channels, every one of them drawn, and an exact copy leaves OUT-III.",
        tip: "run the signal through dioptra inline instead of multing a copy to it.",
      },
      {
        id: "in-4",
        label: "ch-iv",
        type: "jack",
        x: 36.87,
        y: 89.29,
        size: 7,
        voltageRange: "any · poly ≤16",
        description: "signal to display on channel IV. Accepts any voltage with up to 16 polyphonic channels, every one of them drawn, and an exact copy leaves OUT-IV.",
        tip: "run the signal through dioptra inline instead of multing a copy to it.",
      },
      {
        id: "trig-in",
        label: "trig",
        type: "jack",
        x: 45.62,
        y: 89.29,
        size: 7,
        voltageRange: "any",
        description: "external trigger source. When patched it replaces the internal trigger input, and sweeps start on its crossings of the threshold level.",
        tip: "drive it from the master clock to hold every voice against the same downbeat.",
      },
      {
        id: "freeze-in",
        label: "freeze",
        type: "jack",
        x: 54.38,
        y: 89.29,
        size: 7,
        voltageRange: "gate",
        description: "holds the trace and readouts while at or above 1 V — the same as the Freeze menu latch. The outputs keep passing signal while the picture holds.",
        tip: "patch a gate here to freeze a transient mid-flight and measure it at leisure.",
      },
      {
        id: "out-1",
        label: "out-i",
        type: "jack",
        x: 63.13,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-I, channel count included. No gain, filtering or delay, so dioptra can sit anywhere in a chain.",
        tip: "place it just before the output module so the last thing you see is the last thing you hear.",
      },
      {
        id: "out-2",
        label: "out-ii",
        type: "jack",
        x: 71.89,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-II, channel count included. No gain, filtering or delay, so dioptra can sit anywhere in a chain.",
        tip: "place it just before the output module so the last thing you see is the last thing you hear.",
      },
      {
        id: "out-3",
        label: "out-iii",
        type: "jack",
        x: 80.64,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-III, channel count included. No gain, filtering or delay, so dioptra can sit anywhere in a chain.",
        tip: "place it just before the output module so the last thing you see is the last thing you hear.",
      },
      {
        id: "out-4",
        label: "out-iv",
        type: "jack",
        x: 89.4,
        y: 89.29,
        size: 7,
        voltageRange: "= input",
        description: "exact per-sample copy of CH-IV, channel count included. No gain, filtering or delay, so dioptra can sit anywhere in a chain.",
        tip: "place it just before the output module so the last thing you see is the last thing you hear.",
      },
    ],
    contextMenu: [
      {
        id: "readout",
        group: "readout",
        label: "readout",
        kind: "choice",
        values: ["Peak to peak", "Minimum", "Maximum", "Frequency", "RMS", "Volts / screen"],
        description: "Chooses the statistic on all four readouts. The panel buttons cover the first four; RMS and Volts / screen live only here."
      },
      {
        id: "trigger-edge",
        group: "trigger",
        label: "edge",
        kind: "choice",
        values: ["Rising", "Falling"],
        description: "Whether the sweep fires on a rising or falling crossing of the threshold. It also steers the frequency counters."
      },
      {
        id: "trigger-pre",
        group: "trigger",
        label: "pre-trigger",
        kind: "choice",
        values: ["Off", "25% of screen", "50% of screen"],
        description: "Fills the front of the sweep with history from before the crossing, so the display shows what caused the event, not just what followed it."
      },
      {
        id: "trigger-independent",
        group: "trigger",
        label: "each channel separately",
        kind: "toggle",
        description: "On (the default), every lane triggers on its own input so all four traces stand still. Off shares one sweep locked to the shared source, like a bench scope."
      },
      {
        id: "trigger-source",
        group: "trigger",
        label: "shared source",
        kind: "choice",
        values: ["Channel 1", "Channel 2", "Channel 3", "Channel 4"],
        description: "The lane every sweep locks to when Each channel separately is off. Only harmonically related traces stand still with it."
      },
      {
        id: "trigger-arm",
        group: "trigger",
        label: "arm single sweep",
        kind: "toggle",
        description: "Arms a one-shot capture in single mode: the next crossing draws one sweep and the display holds it."
      },
      {
        id: "channels-visible",
        group: "channels",
        label: "show trace",
        kind: "toggle",
        description: "Per-channel checkboxes for channels 1 to 4 hiding or showing each trace. Clicking a readout does the same thing faster."
      },
      {
        id: "channels-ac",
        group: "channels",
        label: "ac coupling",
        kind: "toggle",
        description: "Per-channel DC blockers for channels 1 to 4, for zooming into ripple or hum riding on a large offset."
      },
      {
        id: "freeze",
        group: "freeze",
        label: "freeze",
        kind: "toggle",
        description: "Latches the display, the same as holding the FREEZE input high. Initialize always clears it."
      },
      {
        id: "cursors",
        group: "cursors",
        label: "cursors",
        kind: "toggle",
        description: "Shows two time and two voltage cursors; click the tube to grab the nearest one and drag it, and read the difference off the screen."
      },
      {
        id: "persistence",
        group: "persistence",
        label: "persistence",
        kind: "toggle",
        description: "Leaves a decaying afterglow behind the beam, so repeated sweeps build up where the trace spends its time."
      },
      {
        id: "averaging",
        group: "averaging",
        label: "averaging",
        kind: "choice",
        values: ["Off", "2 sweeps", "4 sweeps", "8 sweeps", "16 sweeps"],
        description: "Combines consecutive sweeps to pull a repeating signal out of noise. Higher counts settle slower."
      },
      {
        id: "roll",
        group: "roll below 1 s/screen",
        label: "roll below 1 s/screen",
        kind: "toggle",
        description: "At 1 s per screen and slower the display scrolls continuously instead of sweeping — the readable way to watch very slow signals."
      },
      {
        id: "math",
        group: "math trace",
        label: "math trace",
        kind: "choice",
        values: ["Off", "1 - 2", "1 + 2", "3 - 4", "3 + 4"],
        description: "Draws the sum or difference of a channel pair as an extra trace."
      },
      {
        id: "crackle",
        group: "beam crackle",
        label: "beam crackle",
        kind: "choice",
        values: ["Off", "Light", "Heavy"],
        description: "Adds a tired tube's worth of beam noise. Cosmetic, and off by default so a scope being read does not lie about where the trace is."
      },
      {
        id: "theme",
        group: "theme",
        label: "theme",
        kind: "choice",
        values: ["Follow global theme", "Phosphor", "Lunar", "Solar", "Amber"],
        description: "Follows the shared Shapetaker display theme, or fixes this module to Phosphor green, Lunar cyan, Solar gold or Amber."
      },
    ],
    manual: [
      {
        title: "four traces on one tube",
        body: "Dioptra draws up to four signals against time on a round green-phosphor CRT, each lane capturing a 256-point min/max envelope per sweep. Every channel has a stepped gain knob in volts per screen and a ±10 V position knob, both display-only, plus a four-digit readout measuring peak-to-peak, minimum, maximum, frequency, RMS or scale. Flipping MODE to 1x2 & 3x4 trades the time display for two vector figures, channel I against II and III against IV, with triggering bypassed."
      },
      {
        title: "triggering",
        body: "TRIG offers Auto, which draws whether or not the threshold is crossed; Normal, which draws only on a real crossing; and Single, which holds the picture until Arm single sweep is chosen and then captures one sweep. THRESHOLD sets the crossing level from −10 V to +10 V, the TRIG input replaces the internal trigger source when patched, and the menu adds edge, 25% or 50% pre-trigger history, and a shared source for single-sweep scope behavior. Each lane triggers on its own input by default so unrelated signals all stand still; turn Each channel separately off for one locked sweep."
      },
      {
        title: "readouts and measurement",
        body: "The P2P, MIN, MAX and FREQ buttons pick one statistic for all four readouts, with RMS and volts per screen available in the menu; turning any gain knob briefly shows each lane's own scale instead. Clicking a readout hides its trace, and a muted lane reads blank. Cursors measure time and voltage differences on the face, averaging pulls repeats out of noise, the math trace sums or differences a pair, and THRESHOLD doubles as the frequency counter's crossing level even where no trigger line is drawn."
      },
      {
        title: "sitting inline",
        body: "Every input is copied exactly to its matching output, sample for sample and channel for channel, so Dioptra can be inserted anywhere in a patch without changing the sound. FREEZE holds the picture while high without stopping the passthrough, slow timebases can roll instead of sweeping, and persistence leaves an afterglow behind the beam. Beam crackle and the phosphor theme are cosmetic only."
      },
    ]
  },
  {
    slug: "entanglement",
    name: "entanglement",
    subtitle: "eight-operator fm oscillator in a mutating modulation constellation — hereditary algorithms, a morphing topology, stereo carriers",
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
          "coarse tunes the whole instrument in snapped whole-octave steps over ±3 octaves; fine trims ±100 cents around it",
          "the two ride as one concentric control — the large outer ring is coarse, the small inner cap is fine — and their sum offsets every voice's v/oct pitch before the exponential converter, clamped at ±30 V",
        ],
        tip: "park coarse on an octave and tune against the track with fine — the snap keeps layered takes honest.",
      },
      {
        id: "screen",
        label: "constellation screen",
        type: "meter",
        x: 50.0,
        y: 20.5,
        size: 43,
        description: [
          "draws the eight operators as numbered chips matching the faders, with the live modulation edges between them — the display follows the audio morph exactly",
          "an edge arriving as entangle turns warms up, one leaving cools down, so the middle of the knob shows a graph genuinely part way between the two",
          "a ring on a chip's top-right corner marks self-feedback and brightens with its amount, drawn in a contrasting colour: amber on phosphor and lunar, cyan on solar and amber",
          "the header names both endpoint algorithms and the bar below shows morph position between a and b; carriers glow brighter than pure modulators, with halos that follow per-operator activity",
        ],
        tip: "read the header before you mutate — it names the family you are about to leave.",
      },
      {
        id: "tension",
        label: "tension",
        type: "knob",
        x: 84.0,
        y: 15.8,
        size: 12,
        description: [
          "the global modulation index: nearly pure carriers at the bottom, through vocal and electric timbres, into folded metallic spectra at the top",
          "panel value plus cv at 0.1 per volt set tension, which the engine raises to the 1.45 power and scales by evolve and affinity to a phase index of up to about 5.3 radians",
        ],
        tip: "back tension off before raising evolve — the index grows with both, and the top of both is deliberate chaos.",
      },
      {
        id: "layer",
        label: "layer",
        type: "switch",
        x: 16.0,
        y: 31.0,
        size: 8,
        description: [
          "picks which of five attributes the eight faders edit: ratio, level, contour, bias or detune — a fresh module opens on level",
          "switching layers never moves a parameter: the newly shown caps travel from where the outgoing caps stood, so a fast double-flick continues the motion instead of jumping",
        ],
        tip: "flick to ratio for tuning, back to level for balance — the caps glide, the sound never jumps.",
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
          "spreads carrier operators across the stereo field and adds a complementary modulation-depth side signal, so the image gains fm detail rather than ordinary panning while the mono centre stays strong",
          "pan follows each carrier's constellation placement times width, and the side term grows with the square of width, alternating polarity across the audible carriers",
        ],
        tip: "at zero both sides carry the same centred mix — take either jack for mono.",
      },
      {
        id: "symmetry",
        label: "symmetry",
        type: "knob",
        x: 10.6,
        y: 48.9,
        size: 12,
        description: [
          "favours integer and simple fractional ratios over stranger ones in each new generation",
          "high settings draw operator ratios from 0.5, 1, 2, 3, 4, 5 and 6; low settings admit 1.5, 2.5, 3.5 and 7 as well, and also widen the random harmonic colour of fresh operators",
        ],
        tip: "for bells that still track a scale, keep symmetry high and let mutation move the graph instead.",
      },
      {
        id: "affinity",
        label: "affinity",
        type: "knob",
        x: 28.5,
        y: 48.9,
        size: 12,
        description: [
          "favours deeper, more interconnected graphs when mutating, and raises how much those relationships are heard in real time",
          "higher settings attach stray operators deeper in the graph, add up to three extra cross-links, allow feedback on up to four operators, and scale the live modulation index from 0.82 up to 1.05",
        ],
        tip: "raise affinity before a mutate when the graph feels thin — the child comes back denser.",
      },
      {
        id: "entangle",
        label: "entangle",
        type: "knob",
        x: 50.0,
        y: 48.9,
        size: 14,
        description: [
          "travels between constellation a and constellation b by morphing the modulation topology itself — edges, feedback, carrier roles, carrier power and stereo placement — while crossfading two independently ratio-locked operator banks",
          "both ends stay harmonic and the middle is a genuine hybrid graph, not an output crossfade of two finished sounds",
          "cv and the menu orbit add to the knob before a 4 ms slew, and the collar lights with the summed sweep",
        ],
        tip: "park the knob at an end after mutating and the origin sits exactly there, with the fresh descendant waiting at the other end.",
      },
      {
        id: "mutation",
        label: "mutation",
        type: "knob",
        x: 71.5,
        y: 48.9,
        size: 12,
        description: [
          "decides how far the next generation strays from its parent when mutate fires",
          "near zero the child keeps the parent's algorithm, ratios, edges, carrier roles and feedback; turned up, each relationship is re-rolled and the child can cross into another of the 32 structures",
        ],
        tip: "low mutation with repeated presses walks a family outward; high mutation re-deals the graph every press.",
      },
      {
        id: "evolve",
        label: "evolve",
        type: "knob",
        x: 89.4,
        y: 48.9,
        size: 12,
        description: [
          "adds harmonic colour to the operators and lengthens their individual spectral contours",
          "attack stretches from 4 ms toward 50 ms, spectral lifetimes grow from 25 ms toward 1.75 s, and modulator sustain rises — so with a gate patched, low settings give short struck transients and high settings bloom and sustain",
        ],
        tip: "with no gate patched the voice drones and the contours hold still — patch a gate to hear evolve move.",
      },
      {
        id: "mutate",
        label: "mutate",
        type: "switch",
        x: 9.7,
        y: 65.3,
        size: 8,
        description: [
          "generates the next constellation from wherever entangle stands: a 12 ms journey to the current descendant, which is promoted to the new origin while a related descendant is grown and travel is aimed so the origin rests at whichever end is nearest the knob",
          "every press yields one audible generation, and a trigger arriving mid-transition queues one more",
          "the momentary key's lip flashes on the press while the screen's morph marker travels out to the new constellation and back",
        ],
        tip: "sequence the mutate jack and sweep entangle between hits — each generation gets its own performance.",
      },
      { id: "fader-1", label: "operator 1", type: "knob", x: 20.3, y: 74.0, size: 8, description: ["edits operator 1 — the invariant root carrier every constellation keeps audible at ×1 and centre — for whichever layer is showing: ratio steps its multiplier through ×0.5 to ×2, level scales its output everywhere it sounds or modulates, contour stretches its struck spectral movement, bias bends its sine toward 2nd, 3rd and 5th harmonics, detune offsets it ±25 cents.", "edits apply to both constellation banks at once, so the instrument keeps its identity while the topology mutates underneath."], tip: "balance the graph against operator 1 first — it is the root everything else hangs from." },
      { id: "fader-2", label: "operator 2", type: "knob", x: 30.0, y: 74.0, size: 8, description: "edits operator 2 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "in the ratio layer, ×0.5 here against ×1 elsewhere drops an operator an octave without touching pitch." },
      { id: "fader-3", label: "operator 3", type: "knob", x: 39.7, y: 74.0, size: 8, description: "edits operator 3 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "pull level down on a harsh modulator rather than on a carrier — the screen shows which is which." },
      { id: "fader-4", label: "operator 4", type: "knob", x: 49.4, y: 74.0, size: 8, description: "edits operator 4 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "long contour on one operator and short on the rest stages the bloom across the attack." },
      { id: "fader-5", label: "operator 5", type: "knob", x: 59.1, y: 74.0, size: 8, description: "edits operator 5 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "bias up on carriers, down on modulators — colour is voiced strongest where it is heard." },
      { id: "fader-6", label: "operator 6", type: "knob", x: 68.8, y: 74.0, size: 8, description: "edits operator 6 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "detune in small opposing pairs for beating and stereo life; zero is exactly harmonic." },
      { id: "fader-7", label: "operator 7", type: "knob", x: 78.5, y: 74.0, size: 8, description: "edits operator 7 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "ghost carries what the carriers hide — solo it while setting modulator levels." },
      { id: "fader-8", label: "operator 8", type: "knob", x: 88.2, y: 74.0, size: 8, description: "edits operator 8 for the layer in force — ratio (×0.5 to ×2 in seven steps), level, contour, bias or detune (±25 cents) — applied to both banks.", tip: "set all eight in level first, then work one layer at a time — the caps travel, nothing jumps." },
      { id: "voct", label: "v/oct", type: "jack", x: 10.0, y: 81.1, size: 8, voltageRange: "1V/oct · poly ≤6", description: "pitch input, 1 V per octave across up to six voices — the voice count follows whichever of v/oct and gate carries more channels. coarse and fine offset it before the converter, and pitches clamp at ±30 V.", tip: "a polyphonic cable here with a mono gate still voices every channel." },
      { id: "gate", label: "gate in", type: "jack", x: 10.0, y: 93.2, size: 8, voltageRange: "gate · poly ≤6", description: "note gate: above 1 V the voice is gated, and articulation follows evolve — struck transients at low settings, bloom and sustain at high ones. with nothing patched the voice drones and the spectral contours hold still.", tip: "for freer drones, also turn off reset phases on gate in the context menu." },
      { id: "entangle-cv", label: "entangle cv", type: "jack", x: 21.5, y: 93.2, size: 8, voltageRange: "±10 V", description: "modulates entangle at 0.1 per volt, so +10 V sweeps the full a-to-b range. it adds to the knob and the menu orbit before the 4 ms morph slew, and the collar lights with the result.", tip: "a slow triangle here plus a centred knob plays both constellations in turn." },
      { id: "tension-cv", label: "tension cv", type: "jack", x: 33.3, y: 93.2, size: 8, voltageRange: "±10 V", description: "modulates tension at 0.1 per volt, clamped to the knob's range, with the collar showing the summed value.", tip: "an envelope here turns static chords into struck fm brass." },
      { id: "width-cv", label: "width cv", type: "jack", x: 45.2, y: 93.2, size: 8, voltageRange: "±10 V", description: "modulates width at 0.1 per volt, clamped to range and collar-lit like the other two morph controls.", tip: "open the image only on accents — narrow verses, wide hits." },
      { id: "mutate-trig", label: "mutate trig", type: "jack", x: 57.0, y: 93.2, size: 8, voltageRange: "trigger", description: "fires a mutation exactly like the panel key. a trigger arriving during the 12 ms transition queues one more generation rather than interrupting.", tip: "trigger it from a divided clock so the graph evolves one generation per bar." },
      { id: "ghost", label: "ghost", type: "jack", x: 68.5, y: 93.2, size: 8, voltageRange: "±5 V · poly ≤6", description: "a mix of the normally inaudible modulator operators at reduced weight — the sound of the graph's hidden machinery, tracking the voice count like the main pair.", tip: "run ghost through a lowpass in parallel — the modulators make a shadow voice." },
      { id: "left-out", label: "left out", type: "jack", x: 79.7, y: 93.2, size: 8, voltageRange: "±5 V · poly ≤6", description: "left channel of the saturated stereo carrier mix — tanh-saturated, sinc-decimated and dc-blocked — engraved + on the panel. tracks the v/oct and gate channel count up to six voices.", tip: "at width 0 this carries the same centred mix as the right — take either for mono." },
      { id: "right-out", label: "right out", type: "jack", x: 90.9, y: 93.2, size: 8, voltageRange: "±5 V · poly ≤6", description: "right channel of the saturated stereo carrier mix, engraved − on the panel. identical processing and channel count to the left.", tip: "width's modulation-depth side signal lives between these two jacks — audition it on headphones." },
    ],
    contextMenu: [
      {
        id: "theme",
        group: "theme",
        label: "theme",
        kind: "choice",
        values: ["follow global theme", "phosphor", "lunar", "solar", "amber"],
        description: "Follow global theme takes the colour every Shapetaker screen is set to; turn it off to pick Phosphor, Lunar, Solar or Amber for this module alone. The feedback rings follow too: amber on Phosphor and Lunar, cyan on Solar and Amber."
      },
      {
        id: "reset-phases",
        group: "reset phases on gate",
        label: "reset phases on gate",
        kind: "toggle",
        description: "On by default, so struck and sequenced sounds keep a dependable attack — though rapid retriggers still preserve phase while the previous release rings, so retriggering cannot click. Turn it off for freer-running drones."
      },
      {
        id: "algorithm",
        group: "algorithm",
        label: "algorithm",
        kind: "choice",
        values: ["tower", "branch", "choir", "pairs", "crown", "web", "spires", "vortex", "prism", "cross", "gravity", "labyrinth", "cascade", "fork", "trident", "quads", "pendulum", "halo", "anvil", "chime", "hive", "mirror", "stairs", "delta", "orbit", "furnace", "loom", "hydra", "cathedral", "relay", "fracture", "nexus"],
        description: "Pins both banks to one of the 32 curated structures, so the choice sounds wherever ENTANGLE is parked. MUTATE still works and replaces bank B with a fresh descendant."
      },
      {
        id: "orbit-rate",
        group: "orbit",
        label: "orbit rate",
        kind: "choice",
        values: ["off", "glacial (100 s)", "slow (40 s)", "drift (17 s)", "breathe (7 s)"],
        description: "A slow built-in drift of ENTANGLE between the banks, so a patch or preset moves on its own. Rate sets how long one sweep takes. Off by default, saved with the patch and with presets; Initialize turns it off."
      },
      {
        id: "orbit-depth",
        group: "orbit",
        label: "orbit depth",
        kind: "choice",
        values: ["subtle", "wide", "full"],
        description: "How far either side of the knob the orbit travels: ±0.15, ±0.30 or ±0.50. Full sweeps the whole A-to-B range when the knob is centred."
      },
      {
        id: "orbit-shape",
        group: "orbit",
        label: "orbit shape",
        kind: "choice",
        values: ["sine", "wander"],
        description: "Sine repeats exactly; Wander sums a second sine at the golden ratio so the path never quite repeats. The orbit adds to ENTANGLE CV, so a patched LFO still works on top, and the collar lights with the sweep."
      },
      {
        id: "oversampling",
        group: "oversampling",
        label: "oversampling",
        kind: "choice",
        values: ["1x (economy)", "2x", "4x (default, reference)", "8x (maximum)"],
        description: "4x is the default and the reference voicing — and not purely a quality trade, since operator self-feedback is delayed by one oversampled sample and voices slightly differently at each factor. 8x is the only setting where the index ceiling never engages at 44.1 and 48 kHz, at about twice the cost of 4x."
      }
    ],
    manual: [
      {
        title: "two constellations, one voice",
        body: "Entanglement is an eight-operator FM oscillator whose algorithm is a living structure rather than a numbered preset. Two constellations, A and B, descend from 32 curated structures — tower, branch, choir, pairs, crown, web and the rest — and ENTANGLE travels between them by morphing the topology itself: edges, feedback, carrier roles, carrier power and stereo placement, while two ratio-locked operator banks crossfade underneath. Both ends are harmonic and the middle is a genuine hybrid graph, never an output crossfade, and the screen follows the audio morph exactly."
      },
      {
        title: "playing the panel",
        body: "Patch V/oct and a gate, take LEFT and RIGHT, turn TENSION up to hear the operators modulate each other harder, then press MUTATE and sweep ENTANGLE end to end. With no gate patched the voice drones and EVOLVE's contours hold still; with a gate, low EVOLVE gives short struck transients and high EVOLVE blooms and sustains. WIDTH spreads carriers and adds modulation-depth stereo detail while the mono centre stays strong, and GHOST offers the hidden modulators for filtering or feedback."
      },
      {
        title: "layers and operators",
        body: "The eight lit faders edit one attribute across the whole constellation, and LAYER picks which: RATIO steps each operator through ×0.5 to ×2, LEVEL sets its presence, CONTOUR stretches its struck spectral movement, BIAS bends its sine toward 2nd, 3rd and 5th harmonics, and DETUNE offsets it ±25 cents. Edits apply to both banks at once, so the instrument keeps a stable identity while the topology mutates underneath. Operator 1 is the invariant root carrier every constellation keeps audible, and the screen numbers its chips to match the faders."
      },
      {
        title: "mutation and generations",
        body: "Press MUTATE from any ENTANGLE position and the module finishes its 12 ms journey to the current descendant, promotes it to the new origin, grows a related child, and aims travel so the origin rests at whichever end is nearest the knob — a parked knob settles exactly, and every press yields one audible generation. MUTATION sets how much of the parent the child inherits, from near-clone to a crossing into another structure; AFFINITY favours deeper, more interconnected graphs; SYMMETRY favours integer and simple fractional ratios. Every descendant is checked and repaired so all eight operators keep a path to an audible carrier, and mutation, travel direction and both constellations are saved with the patch."
      },
      {
        title: "character and voicing",
        body: "Modulator contours use a short onset guard so complex graphs bloom into their sidebands instead of firing a full-index spike on the first sample, and retriggered notes keep their phases running so resetting an eight-operator feedback graph cannot click. Subsampled operator feedback, harmonic-aware partial rolloff, high-ratio modulation damping, topology-aware normalization, saturation, sinc decimation and output DC blocking keep dense networks from turning brittle, with operator colour voiced strongest on audible carriers. Oversampling defaults to 4x as the reference voicing; self-feedback is delayed by one oversampled sample, so feedback-carrying algorithms voice slightly differently at each factor."
      },
      {
        title: "voices, outputs and presets",
        body: "Up to six polyphonic voices follow whichever of V/oct and GATE carries more channels, and all three outputs track that count. LEFT and RIGHT carry the saturated ±5 V stereo carrier mix; GHOST carries the modulator operators at reduced weight for parallel processing. Twenty-five factory instruments in Keys, Pads, Bass, Leads and Percussion exercise all 32 structures, each storing both algorithms and all 51 panel and operator parameters, so loading a sound never inherits settings from the previous patch."
      }
    ]
  },
  {
    slug: "figura",
    name: "figura",
    subtitle: "stereo polyphonic morphing filter — eight 14-pole filters at the corners of a cube, three knobs to move through it",
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
          "a brass plate dusted with sand, after Chladni's 1787 experiment: each resonance in the filter vibrates the plate in its own pattern, and the sand drifts off whatever moves to gather on the still lines, drawing a figure for the filter you are hearing",
          "only peaks that rise above the input level move the sand, so a notch or a flat section leaves it alone; as you move through the cube the sand drifts into the new figure",
          "shows the first voice's left filter, republished about 60 times a second. The plate is lit like the panel rather than from behind, so it dims with Rack's room lights",
        ],
        tip: "sweep MORPH slowly and watch the figure redraw itself — each cube has its own family of shapes.",
      },
      {
        id: "cube",
        label: "cube",
        type: "knob",
        x: 12.7,
        y: 14.4,
        size: 13,
        description: [
          "picks one of eight cubes, each a different family of eight 14-pole filters: Vox (vowels), Corpus (instrument bodies), Phasma (notches), Harmonia (harmonics), Metallum (bell to gong), Aether (breath to whistle), Terra (thump to body) and Ignis (talking formants)",
          "a stepped selector with one stop per cube; a saved patch keeps its position. The context menu lists all eight by name with what MORPH does in each",
        ],
        tip: "start on Vox and turn MORPH to hear AH melt into OO before exploring the rest.",
      },
      {
        id: "stereo",
        label: "stereo",
        type: "knob",
        x: 87.3,
        y: 14.4,
        size: 13,
        description: [
          "moves the left filter down the MORPH axis and the right one up it, up to 15% either way, so a mono source comes out as two related filters with the image widening as you turn it up",
          "near either end of MORPH the pair slides back inside the cube instead of clipping one side, so the spread does not fade out at the extremes",
        ],
        tip: "feed it a mono saw and turn STEREO up — the two sides diverge into related vowels.",
      },
      {
        id: "drive",
        label: "drive",
        type: "knob",
        x: 12.7,
        y: 32.3,
        size: 13,
        description: [
          "saturates the input before the filter. At 0 nothing is added and the path is exactly linear; turning it up raises quiet signals, rounds the loud ones and adds a little even-harmonic warmth while holding the loudness steady for a signal at a normal ±5 V level, so what you hear is the colour changing",
          "a very hot input still comes out quieter as you drive it, and a quiet one louder. A 5 Hz tracker removes only the DC the saturation adds, so the input's own offset passes as it does at DRIVE 0",
        ],
        tip: "drive a quiet pluck hard — it gets louder, rounder and warmer without touching the mixer.",
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 87.3,
        y: 32.3,
        size: 13,
        description: [
          "blends the dry input with the filtered signal: at 0 you hear the input untouched, at 100% only the filter",
          "a linear crossfade smoothed every sample, so sweeping it never zips",
        ],
        tip: "back MIX off to 30% to keep the attack of a drum while the filter colours the tail.",
      },
      {
        id: "morph",
        label: "morph",
        type: "knob",
        x: 13.3,
        y: 46.0,
        size: 13,
        description: [
          "moves along the cube's first axis — AH to OO on Vox, guitar body to cello body on Corpus, bell to gong on Metallum — morphing the timbre between the two corner filters",
          "the tooltip names the two corners you are between, for example 60% of the way from AH to OO. The knob's collar lights to show where the CV has taken it, and knob moves glide over about 10 ms so they never click",
        ],
        tip: "patch a slow envelope into MORPH CV and set the knob to the vowel the note should start on.",
      },
      {
        id: "freq",
        label: "freq",
        type: "knob",
        x: 37.6,
        y: 46.0,
        size: 13,
        description: [
          "moves along the second axis, which slides the whole filter up while keeping its shape, by an amount that suits the cube: half an octave on Vox, four octaves on Terra",
          "the tooltip names the corners as on MORPH, and the lit collar follows the CV. A section pushed above 45% of the sample rate by PITCH or V/OCT stops there",
        ],
        tip: "on Harmonia, FREQ glides the harmonic ladder upward — track it with an envelope for a rising shimmer.",
      },
      {
        id: "transform",
        label: "transform",
        type: "knob",
        x: 63.3,
        y: 46.0,
        size: 13,
        description: [
          "moves along the third axis, which changes the filter's character: open to nasal, wood to metal, soft to sharp, struck to bowed",
          "the tooltip names the corners as on MORPH, and the lit collar follows the CV",
        ],
        tip: "leave MORPH and FREQ still and sweep TRANSFORM alone to learn what a cube's third dimension does.",
      },
      {
        id: "emphasis",
        label: "emphasis",
        type: "knob",
        x: 86.1,
        y: 46.0,
        size: 13,
        description: [
          "sharpens or softens every resonance at once. Centre is the cube as designed; full right makes every peak four times as sharp, full left a quarter as sharp, and the tooltip shows the factor",
          "it changes how sharp the peaks are, not how loud the cube is. Its collar lights like the axis knobs",
        ],
        tip: "turn EMPHASIS full right on Metallum to hear the bell partials ring out at their longest.",
      },
      {
        id: "pitch",
        label: "pitch",
        type: "knob",
        x: 50.0,
        y: 69.7,
        size: 16,
        description: [
          "a ribbed thumbwheel, directly above V/OCT: roll it up to shift every section of the filter together, 4 octaves either way",
          "V/OCT adds to it at exactly one octave per volt, so the filter tracks a keyboard; the sum is clamped to ±12 octaves",
        ],
        tip: "mult your sequence pitch to V/OCT and roll PITCH until a Harmonia peak sits on the root.",
      },
      {
        id: "morph-att",
        label: "morph cv amount",
        type: "knob",
        x: 12.7,
        y: 64.4,
        size: 10,
        description: "scales the CV reaching MORPH, and inverts it to the left of centre. At full, 10 V covers the whole axis — 10% of the axis per volt.",
        tip: "turn it full right and feed ±5 V to sweep the entire axis from edge to edge.",
      },
      {
        id: "freq-att",
        label: "freq cv amount",
        type: "knob",
        x: 32.1,
        y: 64.4,
        size: 10,
        description: "scales the CV reaching FREQ, inverting to the left of centre. At full, 10 V covers the whole axis — 10% of the axis per volt.",
        tip: "a small amount of filtered noise here keeps a static vowel slowly drifting.",
      },
      {
        id: "transform-att",
        label: "transform cv amount",
        type: "knob",
        x: 67.9,
        y: 64.4,
        size: 10,
        description: "scales the CV reaching TRANSFORM, inverting to the left of centre. At full, 10 V covers the whole axis — 10% of the axis per volt.",
        tip: "invert a decay envelope here so a struck sound bows as it dies away.",
      },
      {
        id: "emphasis-att",
        label: "emphasis cv amount",
        type: "knob",
        x: 87.3,
        y: 64.4,
        size: 10,
        description: "scales the CV reaching EMPHASIS, inverting to the left of centre. EMPHASIS spans twice what an axis does, so its CV moves it twice as far per volt, and 10 V still covers the whole control.",
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
        description: "adds to the MORPH knob through its amount knob, 10% of the axis per volt at full. Polyphonic, so each voice can sit at its own point in the cube, and it is not smoothed, so modulation stays as fast as you patch it.",
        tip: "mult one envelope to all three axis CVs with different amounts for a single gesture that crosses the cube diagonally.",
      },
      {
        id: "freq-cv",
        label: "freq cv",
        type: "jack",
        x: 32.1,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full axis · poly ≤16",
        description: "adds to the FREQ knob through its amount knob, 10% of the axis per volt at full. Polyphonic per voice and unsmoothed like the other axis CVs.",
        tip: "patch audio-rate FM here at a low amount for sidebands that keep the cube's shape.",
      },
      {
        id: "transform-cv",
        label: "transform cv",
        type: "jack",
        x: 67.9,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full axis · poly ≤16",
        description: "adds to the TRANSFORM knob through its amount knob, 10% of the axis per volt at full. Polyphonic per voice and unsmoothed like the other axis CVs.",
        tip: "drive it with a random source on Corpus to wander between wood and steel.",
      },
      {
        id: "emphasis-cv",
        label: "emphasis cv",
        type: "jack",
        x: 87.3,
        y: 79.0,
        size: 9,
        voltageRange: "10V = full control · poly ≤16",
        description: "adds to EMPHASIS through its amount knob. EMPHASIS spans twice what an axis does, so this input moves it twice as far per volt, with 10 V covering the whole control at full. Polyphonic per voice and unsmoothed.",
        tip: "a slow LFO here breathes every resonance sharper and softer together.",
      },
      {
        id: "in-l",
        label: "in l",
        type: "jack",
        x: 12.7,
        y: 89.1,
        size: 9,
        voltageRange: "any · poly ≤16",
        description: "left audio input, polyphonic up to 16 channels. It feeds both sides until you patch IN R.",
        tip: "a mono input under a polyphonic V/OCT is filtered once per voice at each voice's pitch — one sound becomes a chord of formants.",
      },
      {
        id: "in-r",
        label: "in r",
        type: "jack",
        x: 31.3,
        y: 89.1,
        size: 9,
        voltageRange: "any · poly ≤16",
        description: "right audio input, polyphonic up to 16 channels. Unpatched, it takes IN L, and bypass keeps that behaviour.",
        tip: "patch left and right separately for true stereo filtering — STEREO then spreads two different signals.",
      },
      {
        id: "voct",
        label: "v/oct",
        type: "jack",
        x: 50.0,
        y: 89.1,
        size: 9,
        voltageRange: "1V/OCT · poly ≤16",
        description: "pitch for the filter at exactly one octave per volt, added to the PITCH wheel. Polyphonic, with each channel its own voice, and unsmoothed so pitch stays immediate.",
        tip: "sequence it a fifth above your oscillator pitch to park a formant on the harmony.",
      },
      {
        id: "out-l",
        label: "out l",
        type: "jack",
        x: 68.7,
        y: 89.1,
        size: 9,
        voltageRange: "≤11.7V peak · poly ≤16",
        description: "the filtered left signal, polyphonic. The output is exactly linear up to 8 V and then limits softly, never passing 11.7 V.",
        tip: "Metallum and Harmonia touch the limiter at their hottest settings — that edge is part of their sound.",
      },
      {
        id: "out-r",
        label: "out r",
        type: "jack",
        x: 87.3,
        y: 89.1,
        size: 9,
        voltageRange: "≤11.7V peak · poly ≤16",
        description: "the filtered right signal, polyphonic, through the same 8 V soft limiter as the left output.",
        tip: "with STEREO up and a mono input, compare the two outputs to hear how far apart the pair has moved.",
      },
    ],
    contextMenu: [
      {
        id: "cube-select",
        group: "cube",
        label: "cube select",
        kind: "choice",
        values: ["Vox: AH to OO", "Corpus: guitar to cello", "Phasma: 2 notches to 6 notches", "Harmonia: odd to even", "Metallum: bell to gong", "Aether: breath to whistle", "Terra: thump to body", "Ignis: ooh to aah"],
        description: "Lists all eight cubes by name, each with what MORPH does, for example Vox: AH to OO. Choosing one moves the CUBE selector."
      }
    ],
    manual: [
      {
        title: "the cube",
        body: "Each cube holds eight 14-pole filters, one at each corner, and MORPH, FREQ and TRANSFORM are its three axes — anywhere inside you hear a smooth blend of the corners. Vox moves AH to OO across MORPH, a man's voice to a child's across FREQ and open to nasal across TRANSFORM; the other seven cubes apply the same three-axis idea to instrument bodies, notch clusters, harmonic series, bells, breath, earth and fire. Every section keeps the same role at every corner, so a morph crossfades each formant, notch or partial with its counterpart rather than sweeping parts in from nowhere."
      },
      {
        title: "pitch and tone",
        body: "PITCH is a thumbwheel that shifts every section of the filter together, 4 octaves either way, and V/OCT adds to it at one octave per volt so the filter tracks a keyboard. EMPHASIS scales every resonance at once — four times as sharp full right, a quarter as sharp full left, the cube as designed at centre — changing sharpness without changing loudness. DRIVE saturates the input before the filter with a little even-harmonic colour while holding loudness steady at normal levels, STEREO splits the two sides up to 15% apart along MORPH, and MIX crossfades from dry input to filtered signal."
      },
      {
        title: "modulation",
        body: "Each of MORPH, FREQ, TRANSFORM and EMPHASIS has a CV input with an attenuverter amount knob directly under it: right scales, left of centre inverts, and at full 10 V covers the whole control. The knob's collar lights to show where the CV has taken it. Knob moves glide over about 10 ms so they never click, while the CVs and V/OCT are not smoothed, so modulation and pitch stay as fast as you patch them."
      },
      {
        title: "the plate",
        body: "The display is a brass plate dusted with sand: each resonance vibrates the plate in its own pattern and the sand gathers on the still lines, drawing a figure for the filter you are hearing. Only peaks above the input level move the sand, so notches leave it alone, and the sand drifts into each new figure as you move through the cube. It shows the first voice's left filter and dims with Rack's room lights."
      },
      {
        title: "voices and levels",
        body: "The module runs as many voices as the widest of IN L, IN R and V/OCT, up to 16, and the CV inputs are polyphonic too, so each voice can sit at its own point in the cube. Every cube is matched for loudness on noise within a couple of dB except Metallum and Harmonia, which sit lower (Metallum 4 to 8 dB, Harmonia up to 6.5 dB) so their tall peaks stay mostly out of the limiter — though on a harmonic source like a saw chord the level still moves as you sweep, by up to about 14 dB in the widest cube, because a narrow peak either lands on a harmonic or falls between two. The output limits softly past 8 V and never passes 11.7 V, bypass passes the dry input with IN R falling back to IN L, and any section pushed above 45% of the sample rate stops there."
      }
    ]
  },
  {
    slug: "legion",
    name: "legion",
    subtitle: "seven-saw super saw that drifts, tears and locks — synchroscope display, stereo spread",
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
          "shows poly channel 0 the way a power station brings a generator into step with the grid. the hub is the centre saw and glows brighter as mix turns toward it; three rings hold the other six saws as flat-and-sharp pairs, inner ring least detuned, outer ring most",
          "twelve o'clock is in step with the centre saw. clockwise (fast) is sharp, counter-clockwise (slow) is flat. motion runs in slow motion until the fastest saw takes at least two seconds per lap, rings keep their relative speeds, and a saw that locks stops the moment it locks",
          "a bright still dot is a locked saw, a comet tail is a slipping saw showing where it came from, and feedback shows as the beam losing focus because it bends every saw by the same amount",
        ],
        tip: "turn coupling slowly clockwise and watch the rings collapse into dots: inner three, then five, then all seven.",
      },
      {
        id: "freq",
        label: "freq",
        type: "knob",
        x: 15.6,
        y: 13.0,
        size: 14,
        description: "tunes the oscillator over 4 octaves either side of middle C, added to v/oct. hold ctrl (cmd on a mac) while dragging for fine tuning.",
        tip: "leave it centred and drive pitch from v/oct so the patch transposes cleanly.",
      },
      {
        id: "width",
        label: "width",
        type: "knob",
        x: 84.4,
        y: 13.0,
        size: 14,
        description: "0 is mono. turning it up pans the side saws out in pairs, so each side gets both flat and sharp saws.",
        tip: "full width with high mix is the widest image legion makes — narrow it before stacking voices.",
      },
      {
        id: "detune",
        label: "detune",
        type: "knob",
        x: 15.6,
        y: 30.8,
        size: 14,
        description: [
          "spreads the seven saws on a slow-then-steep curve: the first three quarters reach about 46 cents either side for the outer saws, and the last quarter runs out to about 2 semitones. the tooltip reads the spread in cents",
          "the spread follows a measured uneven curve, so the beating never repeats",
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
        description: "the level of the six side saws against the centre saw, shown in dB, while the overall loudness stays put.",
        tip: "pull toward the centre to hear what coupling is doing without the wash.",
      },
      {
        id: "drift",
        label: "drift",
        type: "knob",
        x: 15.6,
        y: 46.0,
        size: 14,
        description: "each saw's pitch wanders on its own. low settings sound like old analog drift; high settings run faster and wider, up to about 60 cents — a swarm. the tooltip reads depth in cents with the wander rate.",
        tip: "raise it against a half-locked coupling to find where the two fight.",
      },
      {
        id: "coupling",
        label: "coupling",
        type: "knob",
        x: 50.0,
        y: 45.5,
        size: 14,
        description: [
          "the saws pull on each other's timing. at the centre they run free; clockwise they gather — first nothing changes, then the inner three lock, then five, then all seven into one steady saw with no beating. just past the inner-three lock is the most unstable zone, where groups lock and break apart",
          "counter-clockwise pushes them apart, which thins and hollows the sound. the lock points sit at the same knob positions at every pitch and every detune setting, and the lock takes a moment — longer at small detune — while the saws drift into place",
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
        description: "the output bends the saws' pitch through a lowpass that follows the note. up to about 60% it roughens and thickens the tone; past that the pitch starts to wobble, and at full it is rough and unstable — a growl rather than hiss. the wobble stays centred on the note so tuning never drags, and it behaves the same at every sample rate.",
        tip: "push past 60% on a low note and let a slow filter sweep do the talking.",
      },
      {
        id: "drift-trim",
        label: "drift trim",
        type: "knob",
        x: 11.9,
        y: 69.0,
        size: 12,
        description: "scales the drift cv input from -100% to +100%. at full, 10 V sweeps drift end to end.",
        tip: "flip it negative to calm the swarm from an envelope.",
      },
      {
        id: "detune-trim",
        label: "detune trim",
        type: "knob",
        x: 30.9,
        y: 69.0,
        size: 12,
        description: "scales the detune cv input from -100% to +100%. at full, 10 V sweeps detune end to end.",
        tip: "a little positive amount from velocity widens loud notes and leaves soft ones narrow.",
      },
      {
        id: "coupling-trim",
        label: "coupling trim",
        type: "knob",
        x: 50.0,
        y: 69.0,
        size: 12,
        description: "scales the coupling cv input from -100% to +100%. coupling runs -100% to +100%, so the cv reads 0.2 per volt and a ±5 V lfo sweeps it end to end from the centre.",
        tip: "park coupling just below the first lock and let a slow lfo push it over the edge.",
      },
      {
        id: "mix-trim",
        label: "mix trim",
        type: "knob",
        x: 69.1,
        y: 69.0,
        size: 12,
        description: "scales the mix cv input from -100% to +100%. at full, 10 V sweeps mix end to end.",
        tip: "fade the side saws in and out against a steady centre for movement without level jumps.",
      },
      {
        id: "feedback-trim",
        label: "feedback trim",
        type: "knob",
        x: 88.1,
        y: 69.0,
        size: 12,
        description: "scales the feedback cv input from -100% to +100%. at full, 10 V sweeps feedback end to end.",
        tip: "ping it with a decaying envelope so each note starts rough and settles.",
      },
      {
        id: "drift-cv",
        label: "drift cv",
        type: "jack",
        x: 11.9,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "drift cv: 10 V sweeps the whole control, scaled by the trim above. legion runs as many voices as the widest cable into any input, up to 16, each with its own seven saws.",
        tip: "a slow random source here keeps the swarm moving without touching the knob.",
      },
      {
        id: "detune-cv",
        label: "detune cv",
        type: "jack",
        x: 30.9,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "detune cv: 10 V sweeps the whole control, scaled by the trim above.",
        tip: "breathe the width with a slow lfo while a sequence plays.",
      },
      {
        id: "coupling-cv",
        label: "coupling cv",
        type: "jack",
        x: 50.0,
        y: 79.7,
        size: 10,
        voltageRange: "±5V full sweep",
        description: "coupling cv at 0.2 per volt, scaled by the trim above, because coupling runs from -100% to +100%. a ±5 V lfo sweeps it end to end from the centre.",
        tip: "sweep through the lock points with a triangle lfo for a repeating tear-and-mend.",
      },
      {
        id: "mix-cv",
        label: "mix cv",
        type: "jack",
        x: 69.1,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "mix cv: 10 V sweeps the whole control, scaled by the trim above.",
        tip: "drive it from in-step through a spare vca for a self-tightening patch.",
      },
      {
        id: "feedback-cv",
        label: "feedback cv",
        type: "jack",
        x: 88.1,
        y: 79.7,
        size: 10,
        voltageRange: "±10V",
        description: "feedback cv: 10 V sweeps the whole control, scaled by the trim above.",
        tip: "audio-rate modulation here turns the growl metallic.",
      },
      {
        id: "voct",
        label: "v/oct",
        type: "jack",
        x: 11.9,
        y: 89.1,
        size: 10,
        voltageRange: "1V/OCT",
        description: "1 V per octave pitch, added to freq. polyphonic: voice count follows the widest cable, up to 16.",
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
        description: "a trigger jumps all seven saws to new random phases, with a quick crossfade so it does not click. it fires when the input rises past 1 V and re-arms below 0.1 V, so an lfo fires it once per cycle on the way up, and audio-rate triggers work. the context menu can zero the phases instead, which turns it into hard sync with a hard edge.",
        tip: "hit it with a divided clock to re-scatter every bar.",
      },
      {
        id: "lock",
        label: "lock",
        type: "jack",
        x: 42.4,
        y: 89.1,
        size: 10,
        voltageRange: "gate",
        description: "a gate. while it is high, the seven saws snap into one saw, whatever coupling is set to, and hold there against drift. let go and they drift apart again at their own pace. the level stays steady through both the snap and the release.",
        tip: "gate it rhythmically against heavy drift for snap-and-bloom phrases.",
      },
      {
        id: "in-step",
        label: "in-step",
        type: "jack",
        x: 57.6,
        y: 89.1,
        size: 10,
        voltageRange: "0-10V",
        description: "how in phase the seven saws are, from 0 V spread out to 10 V all aligned. free-running saws wander around 3 to 4 V as they beat, and a lock reads close to 10 V.",
        tip: "patch it to a filter cutoff and the filter opens as the saws pull together.",
      },
      {
        id: "left-out",
        label: "left (+)",
        type: "jack",
        x: 72.9,
        y: 89.1,
        size: 10,
        voltageRange: "±10V peaks",
        description: "left stereo audio, engraved + on the panel. the plain super saw sits at about the level of a ±5 V saw; brief peaks where the saws line up can reach ±10 V and are softly bent into ±12 V.",
        tip: "run it into a resonant lowpass — saws through a resonant filter is what legion is built for.",
      },
      {
        id: "right-out",
        label: "right (-)",
        type: "jack",
        x: 88.1,
        y: 89.1,
        size: 10,
        voltageRange: "±10V peaks",
        description: "right stereo audio, engraved - on the panel. the same levels as the left output: about ±5 V with aligned peaks softly bent into ±12 V.",
        tip: "take both outs even in narrow patches — width still moves between them.",
      },
    ],
    contextMenu: [
      {
        id: "highpass",
        group: "filter",
        label: "highpass at the played pitch",
        kind: "toggle",
        description: "On by default. A gentle highpass that follows the note, as on the original hardware. It thins the low end."
      },
      {
        id: "scatter-resets-to",
        group: "scatter",
        label: "scatter resets to",
        kind: "choice",
        values: ["random phases", "aligned (hard sync)"],
        description: "What a SCATTER trigger does: fresh random phases with a click-free crossfade (the default), or zeroed phases for hard sync with a hard edge."
      },
      {
        id: "display-theme",
        group: "display theme",
        label: "display theme",
        kind: "choice",
        values: ["follow shapetaker theme", "phosphor", "lunar", "solar", "amber"],
        description: "The tube color for the synchroscope. Follow the shared Shapetaker theme or set a local color for this module."
      }
    ],
    manual: [
      {
        title: "seven saws",
        body: "Legion starts as a faithful late-90s super saw: seven saws per voice, spread by a measured uneven detune curve that keeps the beating from ever repeating. DETUNE is slow at first and steep at the end, MIX sets the six side saws against the centre at constant loudness, and WIDTH pans the sides out in pairs from mono. The stereo pair sits near ±5 V with aligned peaks softly bent into ±12 V, and a gentle highpass follows the note unless switched off."
      },
      {
        title: "chaos and lock",
        body: "Three controls pull the saws apart or together. DRIFT wanders each saw on its own up to about 60 cents, from old analog wobble to a swarm. COUPLING gathers them clockwise through staged locks — inner three, then five, then all seven into one steady saw — with the most unstable zone just past the first lock, and pushes them apart counter-clockwise. FEEDBACK bends pitch through a note-following lowpass, roughening to about 60% before it wobbles into a growl that stays centred on the note. The lock takes a moment, longer at small detune, and with all three at zero Legion is a plain super saw and nothing else."
      },
      {
        title: "reading the screen",
        body: "The synchroscope shows poly channel 0 like a power-station meter: hub is the centre saw, three rings hold flat-and-sharp pairs from least to most detuned, and twelve o'clock is in step. Motion is slowed until the fastest saw takes at least two seconds per lap with relative speeds kept, so a bright still dot means locked and a comet means slipping. FEEDBACK bends all saws equally, so it shows as the beam losing focus rather than moving dots."
      },
      {
        title: "patching it",
        body: "Patch v/oct in and take audio from the + and - outputs, then run it into a resonant lowpass — Legion is an oscillator only, and saws through a resonant filter are what it is built for. SCATTER re-phases all seven saws per trigger, LOCK gates them into one saw for as long as it is held, and IN STEP reports alignment as 0 to 10 V for opening a filter as the saws gather. Voice count follows the widest cable into any input, up to 16, with each voice carrying its own seven saws."
      }
    ]
  },
  {
    slug: "susurrus",
    name: "susurrus",
    subtitle: "a held chord whose voices trade places — gliding between its own notes, blooming into vibrato, drifting across the stereo field",
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
          "a multi-pen chart recorder that draws what the voices are doing. The paper scrolls right to left and height is pitch, ruled in semitones with the held chord's notes ruled darker",
          "each voice draws its own pen: a glide draws a slope, the landing flattens it, and the vibrato blooms into a wave as it comes in",
          "the paper advances with the weave, about 14 mm for each move, so it follows a clock and slows while the flock holds. Pan is not drawn here — patch PAN out to see it",
        ],
        tip: "watch a swap cross mid-glide: the two slopes make an X and the chord is whole again when they land.",
      },
      {
        id: "voct-in",
        label: "v/oct",
        type: "jack",
        x: 73.9,
        y: 17.4,
        size: 8,
        voltageRange: "1V/OCT · poly ≤16",
        description: "the held chord, polyphonic, up to 16 voices. Everything the weave does starts from these notes.",
        tip: "drive it from a MIDI-CV module or a polyphonic sequencer and hold the chord — the weave needs held notes to move between.",
      },
      {
        id: "gate-in",
        label: "gate",
        type: "jack",
        x: 83.8,
        y: 17.4,
        size: 8,
        voltageRange: "gate · poly ≤16",
        description: "polyphonic gates that decide which voices belong to the chord. A voice with its gate high (1 V or more) is part of the chord; a released voice keeps its pitch through its release and leaves the weave. Unpatched, every voice counts as held.",
        tip: "release one finger mid-weave and that voice drops out of the rotation while the rest keep trading.",
      },
      {
        id: "audio-in",
        label: "audio",
        type: "jack",
        x: 93.6,
        y: 17.4,
        size: 8,
        voltageRange: "any · poly ≤16",
        description: "the polyphonic audio of the oscillator that V/OCT OUT plays, one channel per voice, so each voice can be faded and panned on its own. A mono cable cannot be panned per voice so it passes through centred, as does any cable while nothing is patched to V/OCT or GATE.",
        tip: "if LEFT and RIGHT sound centred and dry, check this jack is carrying one channel per voice.",
      },
      {
        id: "voct-out",
        label: "v/oct out",
        type: "jack",
        x: 73.9,
        y: 27.7,
        size: 8,
        voltageRange: "1V/OCT · poly ≤16",
        description: "each voice's pitch, polyphonic, gliding between chord notes with its own vibrato added. Patch it to a polyphonic oscillator.",
        tip: "mult this to a tuner or scope if you want to verify a voice lands exactly on its note at the GLIDE time.",
      },
      {
        id: "landed-out",
        label: "landed",
        type: "jack",
        x: 83.8,
        y: 27.7,
        size: 8,
        voltageRange: "gate · poly ≤16",
        description: "a polyphonic gate at 10 V while a voice sits on its note with its gate high, 0 V while it glides. Patch it to an envelope and each voice re-articulates as it arrives.",
        tip: "patch it per voice to snappy envelopes for an arrivals-only texture over a steady drone.",
      },
      {
        id: "bloom-out",
        label: "bloom",
        type: "jack",
        x: 93.6,
        y: 27.7,
        size: 8,
        voltageRange: "0-10V · poly ≤16",
        description: "each voice's vibrato bloom as polyphonic CV: 0 V while the voice moves, rising to 10 V as its vibrato comes in. Patch it to a filter or VCA per voice and the tone opens as each voice settles.",
        tip: "open a per-voice lowpass with this so arriving voices brighten as their vibrato blooms.",
      },
      {
        id: "left-out",
        label: "left",
        type: "jack",
        x: 73.9,
        y: 38.3,
        size: 8,
        voltageRange: "audio · ≤11.7V",
        description: "the left half of the stereo mix: every voice faded and panned, summed with 1/sqrt loudness compensation so a big chord is about as loud as one note. Exactly linear up to 8 V, then limited softly and never past 11.7 V.",
        tip: "sixteen loud voices can still peak well past 10 V even though the average level stays near one note's — leave headroom downstream.",
      },
      {
        id: "right-out",
        label: "right",
        type: "jack",
        x: 83.8,
        y: 38.3,
        size: 8,
        voltageRange: "audio · ≤11.7V",
        description: "the right half of the stereo mix, the same per-voice fades and pans as LEFT with its own pan gains. Linear to 8 V with a soft limit at 11.7 V.",
        tip: "take LEFT and RIGHT to a mixer or output module as the finished stereo image.",
      },
      {
        id: "pan-out",
        label: "pan",
        type: "jack",
        x: 93.6,
        y: 38.3,
        size: 8,
        voltageRange: "-5 to +5V · poly ≤16",
        description: "each voice's place in the stereo field as polyphonic CV, −5 V hard left to +5 V hard right. The chart recorder does not draw pan, so this is how you see or reuse it.",
        tip: "record this alongside the audio to automate a second mix element with the same wandering motion.",
      },
      {
        id: "glide",
        label: "glide",
        type: "knob",
        x: 8.7,
        y: 51.3,
        size: 12,
        description: "sets how long every move takes, from 0 to 4 seconds. Chord changes and weave moves both use it. The knob is on a square law so the short end has room, and its collar lights to show where GLIDE CV has taken it. The context menu can make it a constant rate instead: time per octave, so a small step is quicker than a leap.",
        tip: "start around 0.6 s so swaps read as motion rather than portamento smear.",
      },
      {
        id: "shape",
        label: "shape",
        type: "knob",
        x: 22.7,
        y: 51.3,
        size: 12,
        description: [
          "sets the curve of each glide. Left is swoop (a fast start and a slow settle, like an analog lag), centre is even, and right is sung (slow to leave, quick through the middle, a soft landing)",
          "every shape lands exactly on its note at exactly the GLIDE time — the curve only changes the journey. The tooltip names the nearest curve as you turn",
        ],
        tip: "sung shapes make wide leaps sound vocal; swoop keeps short neighbor swaps crisp.",
      },
      {
        id: "mode",
        label: "mode",
        type: "switch",
        x: 36.7,
        y: 51.3,
        size: 12,
        description: [
          "picks how the voices move through the held chord",
          "SWAP: neighbouring voices trade places. They cross mid-glide and swap stereo sides, and the chord is whole again when they land",
          "HANDOFF: the lower voice of each pair rises to the upper note while the displaced voice fades out as it arrives, so no note is ever doubled — two voices are never heard on the same note at the same moment. The next move brings it back",
          "WANDER: some of the chord's notes trade places among themselves, so any voice can end up anywhere in the chord while the chord itself stays whole. Nothing doubles and nothing goes missing",
        ],
        tip: "handoff is the most transparent weave — use it when the harmony must never thin or double.",
      },
      {
        id: "bloom",
        label: "bloom",
        type: "knob",
        x: 50.7,
        y: 51.3,
        size: 12,
        description: [
          "sets how long the vibrato takes to fade in once a voice lands, from 0 to 4 seconds on a square law",
          "a voice never has vibrato while it moves: a new glide pulls the vibrato out in about 80 ms. As it blooms the vibrato starts a little slow and wide, then settles, the way a singer's does",
        ],
        tip: "long bloom with slow moves gives each arrival its own little entrance; short bloom keeps the shimmer constant.",
      },
      {
        id: "depth",
        label: "depth",
        type: "knob",
        x: 64.7,
        y: 51.3,
        size: 12,
        description: "sets the vibrato depth, from 0 to 100 cents. It only sounds once a voice has landed and bloomed; while gliding the pitch is pure.",
        tip: "25 cents sits naturally on held chords; past 50 it starts to sound deliberately seasick.",
      },
      {
        id: "rate",
        label: "rate",
        type: "knob",
        x: 78.7,
        y: 51.3,
        size: 12,
        description: "sets the vibrato rate, from 0.5 to 12 Hz. No two voices share a rate — each carries a fixed offset plus a slow wander — so they never pulse together.",
        tip: "around 5.5 Hz reads as a sung vibrato; low rates with high sway sound like circling rather than shaking.",
      },
      {
        id: "timing",
        label: "timing",
        type: "switch",
        x: 92.8,
        y: 51.3,
        size: 9,
        description: [
          "picks when moves happen",
          "SELF: a move waits until every voice has landed, its vibrato has fully bloomed, and it has held for the MOVE time. The glide, land and bloom cycle is the rhythm",
          "FREE: moves come at the MOVE rate, each one's timing varied a little at random (0.6 to 1.4 times the period)",
        ],
        tip: "self timing with long blooms makes the module breathe at its own pace — patch nothing and just hold a chord.",
      },
      {
        id: "glide-cv",
        label: "glide cv",
        type: "jack",
        x: 8.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the GLIDE knob, with 10 V covering the knob's whole range. Reads its first channel only: the weave is one flock, so a control moves every voice together. The knob's collar lights to show where the CV has taken it.",
        tip: "drive long-short glide arcs from a slow LFO so moves breathe between quick trades and slow slides.",
      },
      {
        id: "shape-cv",
        label: "shape cv",
        type: "jack",
        x: 22.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the SHAPE knob. SHAPE runs from swoop to sung, twice the span of the other knobs, so its CV moves it twice as far per volt; 10 V still covers the whole control. First channel only.",
        tip: "nudge shape per section: swoop for rhythmic passages, sung for exposed landings.",
      },
      {
        id: "mode-cv",
        label: "mode cv",
        type: "jack",
        x: 36.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the MODE switch: 0 to 10 V steps through Swap, Handoff and Wander starting from wherever the switch is, rounded to a whole mode. First channel only.",
        tip: "sequence mode changes with stepped voltages — 0 V, 5 V and 10 V from the switch position select the three weaves.",
      },
      {
        id: "bloom-cv",
        label: "bloom cv",
        type: "jack",
        x: 50.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the BLOOM knob, with 10 V covering the knob's whole range. First channel only; the collar shows the summed position.",
        tip: "open bloom time on sparse chords so each voice sings in slowly, then tighten it as the harmony gets busier.",
      },
      {
        id: "depth-cv",
        label: "depth cv",
        type: "jack",
        x: 64.7,
        y: 64.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the DEPTH knob, with 10 V covering the full 0 to 100 cents. First channel only; the collar shows the summed position.",
        tip: "fade depth in with an envelope so the vibrato only appears once the chord has settled.",
      },
      {
        id: "rate-cv",
        label: "rate cv",
        type: "jack",
        x: 78.7,
        y: 64.1,
        size: 8,
        voltageRange: "1V/OCT",
        description: "1 V per octave on the vibrato rate, so each volt doubles it around the RATE knob's setting. First channel only.",
        tip: "track the chord's register with this so higher voicings shimmer faster, like real strings.",
      },
      {
        id: "clock-in",
        label: "clock",
        type: "jack",
        x: 92.8,
        y: 64.1,
        size: 8,
        voltageRange: "clock",
        description: "when patched, moves follow the clock instead of the TIMING switch, and MOVE becomes a divider: every 1 to 16 clock pulses. It sits directly under TIMING, the switch it overrides.",
        tip: "divide by 8 or 16 against a running clock so the weave shifts once per bar or two.",
      },
      {
        id: "stagger",
        label: "stagger",
        type: "knob",
        x: 8.7,
        y: 76.9,
        size: 12,
        description: "keeps the flock from moving as a block. Each pair starts its glide after a random delay of up to STAGGER times GLIDE; at 0 everything moves as one. The one knob with no CV jack, so the socket below it stays empty.",
        tip: "small stagger (around a quarter) keeps chords whole while stopping the moves from sounding sequenced.",
      },
      {
        id: "travel",
        label: "travel",
        type: "knob",
        x: 22.7,
        y: 76.9,
        size: 12,
        description: "throws each gliding voice further in the direction it moves, rightward when it rises. An octave or more throws hardest. The voice drifts back to its place over the HOME time after it lands.",
        tip: "wide intervals with high travel make rising lines sweep right across the field — follow with long home for a slow return.",
      },
      {
        id: "move",
        label: "move",
        type: "knob",
        x: 36.7,
        y: 76.9,
        size: 12,
        description: [
          "its job follows TIMING, and its tooltip names the current one",
          "under SELF it is the hold time, 0.2 to 8 seconds after every voice has landed and bloomed. Under FREE it is the move rate, 0.05 to 8 moves a second. With CLOCK patched it is the divider, every 1 to 16 clock pulses",
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
        description: "sets how long a thrown voice takes to drift back to its place after it lands, from 0.1 to 8 seconds. It only matters while TRAVEL is up — with no throw there is nowhere to come home from.",
        tip: "match home to the move rhythm so voices arrive back just as the next move starts.",
      },
      {
        id: "sway",
        label: "sway",
        type: "knob",
        x: 64.7,
        y: 76.9,
        size: 12,
        description: "adds a pan wobble at the vibrato's rate, a quarter cycle from the pitch wobble, so a voice sounds like it is circling rather than shaking. It follows the bloom, fading in as the vibrato does.",
        tip: "sway with zero depth gives circling placement with steady pitch — movement without seasickness.",
      },
      {
        id: "spread",
        label: "spread",
        type: "knob",
        x: 78.7,
        y: 76.9,
        size: 12,
        description: "places each voice by its pitch within the held chord, lowest note left and highest right. It is relative to the chord, so a close voicing still fills the field.",
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
        description: "adds to the TRAVEL knob, with 10 V covering the knob's whole range. First channel only; the collar shows the summed position.",
        tip: "gate travel throws so only accented moves sweep across the field.",
      },
      {
        id: "move-cv",
        label: "move cv",
        type: "jack",
        x: 36.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the MOVE knob in whichever job it is doing — hold time, move rate, or clock division. 10 V covers the knob's whole range; first channel only.",
        tip: "modulate this in free mode to drift between stillness and flurries of moves.",
      },
      {
        id: "home-cv",
        label: "home cv",
        type: "jack",
        x: 50.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the HOME knob, with 10 V covering the knob's whole range. First channel only; the collar shows the summed position.",
        tip: "shorten home time during dense passages so thrown voices snap back before the next move.",
      },
      {
        id: "sway-cv",
        label: "sway cv",
        type: "jack",
        x: 64.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the SWAY knob, with 10 V covering the knob's whole range. First channel only; the collar shows the summed position.",
        tip: "bring sway up only on held sections so the circling marks the calm moments.",
      },
      {
        id: "spread-cv",
        label: "spread cv",
        type: "jack",
        x: 78.7,
        y: 89.1,
        size: 8,
        voltageRange: "0-10V",
        description: "adds to the SPREAD knob, with 10 V covering the knob's whole range. First channel only; the collar shows the summed position.",
        tip: "narrow the spread for verses and open it for the moment the chord changes.",
      },
      {
        id: "move-trig",
        label: "move trig",
        type: "jack",
        x: 92.8,
        y: 89.1,
        size: 8,
        voltageRange: "trigger",
        description: "a trigger makes the weave move now, on top of whatever TIMING or CLOCK is doing. It waits for every voice to land first, and several triggers during one glide make one move.",
        tip: "fire this from a manual gate button to conduct moves by hand over a self-timed bed.",
      },
    ],
    contextMenu: [
      {
        id: "constant-rate",
        group: "glide",
        label: "glide at a constant rate",
        kind: "toggle",
        description: "GLIDE becomes the time per octave instead of the time per move, so a small step is quicker than a leap. The GLIDE tooltip reads per octave while it is on."
      }
    ],
    manual: [
      {
        title: "what it does",
        body: "Susurrus is a polyphonic performance processor that sits around any polyphonic oscillator. It sends each voice's pitch to the oscillator on V/OCT OUT, takes the oscillator's audio back on AUDIO, and fades and pans every voice on its own before summing to LEFT and RIGHT. The name is Latin for a whispering murmur, the sound a flock of starlings makes as it wheels."
      },
      {
        title: "the weave",
        body: "Hold a chord and its voices start to trade places, one pair at a time: SWAP crosses neighbouring voices mid-glide, HANDOFF fades the displaced voice out so no note is ever doubled, and WANDER lets any voice end up anywhere while the chord stays whole. TIMING picks the rhythm — SELF waits for every voice to land, bloom and hold for the MOVE time, FREE moves at the MOVE rate — and a patched CLOCK replaces the switch with a divider of every 1 to 16 pulses. MOVE TRIG conducts a move by hand on top of all of it, and STAGGER keeps pairs from starting as a block with a random delay of up to STAGGER times GLIDE."
      },
      {
        title: "glide and vibrato",
        body: "GLIDE sets every move's length from 0 to 4 seconds on a square law, and SHAPE bends the curve from swoop through even to sung without ever missing the landing time. A voice never has vibrato while it moves — a new glide pulls it out in about 80 ms — and BLOOM then fades it in over 0 to 4 seconds, starting a little slow and wide like a singer before settling. DEPTH runs 0 to 100 cents and RATE 0.5 to 12 Hz with no two voices sharing a rate, so a chord never pulses as one."
      },
      {
        title: "space",
        body: "SPREAD places each voice by its pitch in the chord, lowest left and highest right, relative to the voicing so close chords still fill the field. TRAVEL throws gliding voices further in their direction of motion and HOME drifts them back over 0.1 to 8 seconds, while SWAY circles each voice at its vibrato rate a quarter cycle from the pitch wobble. Every voice's pan is also available as CV on PAN (−5 V left to +5 V right), and LEFT and RIGHT sum with loudness compensation so a big chord sits near one note's level, linear to 8 V and softly limited at 11.7 V."
      },
      {
        title: "chords and voices",
        body: "A new chord moves each held voice to a note of the new chord with the least total glide, so chord changes are short slides; the same note on two input channels counts once and its voices move together. A voice that first appears starts on its note and never glides in from 0 V, and in HANDOFF the displaced voice is silent before the arriving one reaches it. The chart recorder draws it all — slope for a glide, flat for a landing, a blooming wave for vibrato — advancing about 14 mm per move."
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
