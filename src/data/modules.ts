import { Activity, AudioLines, Compass, Drum, Eye, Gauge, Hourglass, PenLine, SlidersHorizontal, Sparkles, Split, Filter, Layers, Tv, Waves, Wrench } from "lucide-react";
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
    hidden: true,
    name: "chiaroscuro",
    subtitle: "stereo vca with six-algorithm distortion engine, adaptive makeup gain, and sidechain input",
    summary: "Stereo VCA with a six-algorithm distortion engine. Dial in depth, drive, and wet/dry blend. Adaptive makeup gain and a sidechain input with three trigger modes.",
    category: "vcv rack module",
    status: "vca + distortion",
    accent: "#D7B56D",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: SlidersHorizontal,
    hp: 12,
    panelImage: {
      src: "/modules/chiaroscuro/panel-v3.webp",
      width: 900,
      height: 1900,
      alt: "chiaroscuro vcv rack module panel"
    },
    typeplate: {
      unit: "UNIT 01411",
      type: "SIGNAL AMPLIFIER",
      alt: "PRE-BIASED CENTER",
    },
    media: {},
    controls: [
      {
        id: "gain-led",
        label: "gain indicator",
        type: "meter",
        x: 15.4,
        y: 14.8,
        size: 9,
        description: [
          "shows VCA gain level including any CV, fully lit is 2× gain",
          "watch this while patching VCA CV to confirm modulation is arriving at the gain stage",
        ],
        tip: "watch this while patching VCA CV to confirm modulation is reaching the gain stage.",
      },
      {
        id: "dist-led",
        label: "distortion indicator",
        type: "meter",
        x: 85.3,
        y: 14.8,
        size: 9,
        description: [
          "shows which distortion algorithm is active via color, and how hard it's working via brightness",
          "watch the color shift when you move the type selector knob",
        ],
        tip: "a quick visual read of how aggressively the signal is being shaped — the color shifts when you move the type selector.",
        diagrams: [
          { id: "led-hard-clip",   label: "hard clip",    icon: "Minus",     svg: '<circle cx="12" cy="12" r="9" fill="#0d3330"/><circle cx="12" cy="12" r="5" fill="#176155"/>' },
          { id: "led-tube-sat",    label: "tube sat",     icon: "Activity",  svg: '<circle cx="12" cy="12" r="9" fill="#0d3333"/><circle cx="12" cy="12" r="5" fill="#156060"/>' },
          { id: "led-wave-fold",   label: "wave fold",    icon: "Waves",     svg: '<circle cx="12" cy="12" r="9" fill="#0d1f3a"/><circle cx="12" cy="12" r="5" fill="#1a3d72"/>' },
          { id: "led-bit-crush",   label: "bit crush",    icon: "Grid3x3",   svg: '<circle cx="12" cy="12" r="9" fill="#0a1232"/><circle cx="12" cy="12" r="5" fill="#152472"/>' },
          { id: "led-destroy",     label: "destroy",      icon: "Zap",       svg: '<circle cx="12" cy="12" r="9" fill="#160d35"/><circle cx="12" cy="12" r="5" fill="#2e1572"/>' },
          { id: "led-ring-mod",    label: "ring mod",     icon: "RefreshCw", svg: '<circle cx="12" cy="12" r="9" fill="#1a0a32"/><circle cx="12" cy="12" r="5" fill="#481272"/>' },
        ],
      },
      {
        id: "vca-knob",
        label: "vca gain",
        type: "knob",
        x: 50.4,
        y: 15.9,
        size: 22,
        description: [
          "controls the output level before the distortion engine, noon is unity gain",
          "pushing above unity with a hot input adds a subtle drive-like coloring",
        ],
        tip: "set this around unity (noon) first, then use CV for dynamics.",
        diagrams: [
          { id: "vca-off",   label: "closed (0×)",   icon: "VolumeX", rotation: -135 },
          { id: "vca-half",  label: "−6 dB (0.5×)", icon: "Volume1", rotation: -67.5 },
          { id: "vca-unity", label: "unity (1×)",    icon: "Volume2", rotation: 0 },
          { id: "vca-hot",   label: "+6 dB (2×)",   icon: "Volume",  rotation: 135 },
        ],
      },
      {
        id: "dist-type",
        label: "dist type",
        type: "knob",
        x: 50.4,
        y: 30.6,
        size: 14,
        description: [
          "six algorithms: hard clip, tube sat, wave fold, bit crush, destroy, ring mod",
          "transitions between types are crossfaded so switching won't cause clicks",
          "each algorithm responds differently to Drive and Dist %, experiment while listening",
        ],
        tip: "move this while listening — each algorithm responds differently to the Drive and Dist % settings.",
        diagrams: [
          { id: "type-hard-clip", label: "hard clip",       icon: "Minus",     color: "#2dd4bf" },
          { id: "type-tube-sat",  label: "tube saturation", icon: "Activity",  color: "#38bdf8" },
          { id: "type-wave-fold", label: "wave fold",       icon: "Waves",     color: "#60a5fa" },
          { id: "type-bit-crush", label: "bit crush",       icon: "Grid3x3",   color: "#818cf8" },
          { id: "type-destroy",   label: "destroy",         icon: "Zap",       color: "#a78bfa" },
          { id: "type-ring-mod",  label: "ring modulation", icon: "RefreshCw", color: "#e879f9" },
        ],
      },
      {
        id: "link-lr",
        label: "link l/r",
        type: "switch",
        x: 15.4,
        y: 27.9,
        size: 10,
        description: [
          "when on, the right channel mirrors the left input so you can send one source to two outputs",
          "leave it off when processing a true stereo pair",
        ],
        tip: "leave unlinked when processing a true stereo pair.",
        diagrams: [
          { id: "link-off", label: "independent L + R", icon: "Unlink", state: "down" as const },
          { id: "link-on",  label: "L mirrors R",       icon: "Link",   state: "up" as const },
        ],
      },
      {
        id: "response",
        label: "vca response",
        type: "switch",
        x: 85.3,
        y: 27.9,
        size: 10,
        description: [
          "switches the VCA between linear and exponential gain response",
          "exponential follows how we perceive loudness, making envelope fades feel more natural",
        ],
        tip: "use exponential when driving from an ADSR for more musical fade behavior.",
        diagrams: [
          { id: "resp-linear", label: "linear response",      icon: "TrendingUp", state: "down" as const },
          { id: "resp-exp",    label: "exponential response", icon: "Sigma",      state: "up" as const },
        ],
      },
      {
        id: "dist-amount",
        label: "dist %",
        type: "knob",
        x: 17.5,
        y: 41.2,
        size: 14,
        description: [
          "controls distortion depth; at zero the engine is fully bypassed",
          "most algorithms show their character before the knob reaches halfway",
          "works with Drive; drive sets how hard the signal hits, dist % sets how far in it goes",
        ],
        tip: "start low and increase slowly — most algorithms reveal their character before the knob reaches halfway.",
        diagrams: [
          { id: "dist-off",    label: "bypass (0%)",  icon: "Minus",    rotation: -135 },
          { id: "dist-onset",  label: "onset (25%)",  icon: "Activity", rotation: -67.5 },
          { id: "dist-medium", label: "medium (50%)", icon: "Zap",      rotation: 0 },
          { id: "dist-heavy",  label: "heavy (100%)", icon: "Flame",    rotation: 135 },
        ],
      },
      {
        id: "drive",
        label: "drive",
        type: "knob",
        x: 50.4,
        y: 41.2,
        size: 14,
        description: [
          "sets how hard the signal hits the algorithm, higher values add harmonic complexity",
          "set drive before dist % to dial in the character you want first",
          "drive has no effect if dist % is at zero",
        ],
        tip: "set drive before Dist % — the character you want comes from how hard the signal hits the algorithm.",
        diagrams: [
          { id: "drive-off",    label: "no drive",    icon: "Minus",    rotation: -135 },
          { id: "drive-soft",   label: "soft drive",  icon: "Feather",  rotation: -67.5 },
          { id: "drive-medium", label: "medium",      icon: "Activity", rotation: 0 },
          { id: "drive-hard",   label: "hard drive",  icon: "Flame",    rotation: 135 },
        ],
      },
      {
        id: "mix",
        label: "mix",
        type: "knob",
        x: 83.2,
        y: 41.2,
        size: 14,
        description: [
          "blends clean and distorted signal; fully left is dry, fully right is wet",
          "adaptive makeup gain keeps the volume consistent as you sweep, so you can focus on character",
          "parallel distortion at noon is a useful starting point",
        ],
        tip: "parallel distortion at noon is a useful starting point — character without loss of the original source.",
        diagrams: [
          { id: "mix-dry",   label: "dry (clean only)", icon: "Volume2", rotation: -135 },
          { id: "mix-blend", label: "parallel blend",   icon: "Layers",  rotation: 0 },
          { id: "mix-wet",   label: "wet (dist only)",  icon: "Waves",   rotation: 135 },
        ],
      },
      {
        id: "dist-att",
        label: "dist cv att",
        type: "knob",
        x: 17.5,
        y: 54.6,
        size: 10,
        description: [
          "scales dist % CV; noon is off, clockwise positive, counter-clockwise inverts",
        ],
        tip: "set this before the CV source — dial how much range you want the modulation to cover.",
        diagrams: [
          { id: "datt-inv",   label: "full inversion", icon: "Minus",  rotation: -135 },
          { id: "datt-zero",  label: "off (no CV)",    icon: "Circle", rotation: 0 },
          { id: "datt-unity", label: "full scaling",   icon: "Plus",   rotation: 135 },
        ],
      },
      {
        id: "drive-att",
        label: "drive cv att",
        type: "knob",
        x: 50.4,
        y: 54.6,
        size: 10,
        description: [
          "scales drive CV; noon is off, counter-clockwise inverts",
          "a slow LFO with a small attenuverter setting gives gradual harmonic texture shifts",
        ],
        tip: "a slow LFO on drive with a low attenuverter setting gives gradual texture shifts.",
        diagrams: [
          { id: "dratt-inv",   label: "full inversion", icon: "Minus",  rotation: -135 },
          { id: "dratt-zero",  label: "off (no CV)",    icon: "Circle", rotation: 0 },
          { id: "dratt-unity", label: "full scaling",   icon: "Plus",   rotation: 135 },
        ],
      },
      {
        id: "mix-att",
        label: "mix cv att",
        type: "knob",
        x: 83.2,
        y: 54.6,
        size: 10,
        description: [
          "scales mix CV; noon is off, counter-clockwise inverts the blend direction",
          "inverted with a gate envelope pulls distortion back when the gate fires",
        ],
        tip: "use inverted scaling from a gate envelope to pull the wet signal back on silence.",
        diagrams: [
          { id: "matt-inv",   label: "full inversion", icon: "Minus",  rotation: -135 },
          { id: "matt-zero",  label: "off (no CV)",    icon: "Circle", rotation: 0 },
          { id: "matt-unity", label: "full scaling",   icon: "Plus",   rotation: 135 },
        ],
      },
      {
        id: "dist-cv",
        label: "dist cv",
        type: "jack",
        x: 17.5,
        y: 69.0,
        size: 10,
        description: [
          "CV input for dist %, scaled by the attenuverter above it",
          "patch an envelope here to push into distortion only at note peaks",
        ],
        tip: "a slow envelope with moderate attenuverter scaling pushes into distortion only at note peaks.",
      },
      {
        id: "drive-cv",
        label: "drive cv",
        type: "jack",
        x: 50.4,
        y: 69.0,
        size: 10,
        description: [
          "CV input for drive, scaled by the attenuverter above it",
          "a fast attack envelope here adds harmonic punch on transients without changing the sustain character",
        ],
        tip: "with the drive attenuverter at a low setting, transients hit the algorithm harder than the sustain.",
      },
      {
        id: "mix-cv",
        label: "mix cv",
        type: "jack",
        x: 83.2,
        y: 69.0,
        size: 10,
        description: [
          "CV input for mix, scaled by the attenuverter above it",
          "a rising envelope here gradually fades in distortion over the course of a note",
        ],
        tip: "a rising envelope brings in distortion gradually over the course of a note.",
      },
      {
        id: "vca-cv",
        label: "vca cv",
        type: "jack",
        x: 17.5,
        y: 79.0,
        size: 10,
        description: [
          "no attenuverter: patch a full-range envelope directly",
          "polyphonic: each channel controls its own voice level independently",
        ],
        tip: "patch directly from an ADSR envelope without attenuation for standard VCA dynamics.",
      },
      {
        id: "type-cv",
        label: "dist type cv",
        type: "jack",
        x: 50.4,
        y: 79.0,
        size: 10,
        description: [
          "0V: hard clip",
          "2V: tube sat",
          "4V: wave fold",
          "6V: bit crush",
          "8V: destroy",
          "10V: ring mod",
        ],
        tip: "quantize to 6 steps for clean algorithm switching from a sequencer.",
      },
      {
        id: "sidechain",
        label: "sidechain detect",
        type: "jack",
        x: 83.2,
        y: 79.0,
        size: 10,
        description: [
          "audio input that drives the sidechain envelope follower",
          "can trigger, duck, or replace Dist % entirely; set the mode in the context menu",
          "patch a kick or snare here to sync distortion behavior with the rest of your mix",
        ],
        tip: "patch a kick drum or submix send here to trigger or duck distortion in sync with the rest of the mix.",
      },
      {
        id: "audio-in-l",
        label: "audio in L",
        type: "jack",
        x: 17.5,
        y: 89.1,
        size: 10,
        description: [
          "polyphonic: each voice gets its own VCA and distortion processing",
          "when link L/R is on, this input feeds both channels",
        ],
        tip: "patch a polyphonic oscillator here for per-voice independent processing.",
      },
      {
        id: "audio-in-r",
        label: "audio in R",
        type: "jack",
        x: 39.4,
        y: 89.1,
        size: 10,
        description: [
          "right audio input for true stereo processing",
          "when unpatched with link L/R off, the right channel mirrors the left",
        ],
        tip: "patch a second signal here for independent stereo processing of two different sources.",
      },
      {
        id: "audio-out-l",
        label: "audio out L",
        type: "jack",
        x: 61.3,
        y: 89.1,
        size: 10,
        description: [
          "left processed output after VCA, distortion, wet/dry blend, and makeup gain",
          "polyphonic when the input is polyphonic",
        ],
        tip: "follow with a stereo mixer or panner to position the output in the mix.",
      },
      {
        id: "audio-out-r",
        label: "audio out R",
        type: "jack",
        x: 83.2,
        y: 89.1,
        size: 10,
        description: [
          "mirrors the left when link L/R is on",
          "use L and R together for a stereo insert on a bus or voice pair",
        ],
        tip: "use with audio-out-l for a stereo insert on a bus or voice pair.",
      },
    ],
    contextMenu: [
      {
        id: "oversampling",
        group: "oversampling",
        label: "oversampling",
        kind: "choice",
        values: ["1x", "2x", "4x", "8x"],
        description: [
          "1×: lowest CPU cost, may introduce faint aliasing at extreme drive or high pitches",
          "2×: reduces aliasing at moderate CPU cost, good middle ground for busy patches",
          "4×: default, aliasing below audible thresholds for most algorithms and drive settings",
          "8×: highest quality, use for destroy, bit crush, and ring mod at high drive",
        ],
      },
      {
        id: "sidechain-enhancement",
        group: "sidechain mode",
        label: "enhancement (trigger)",
        kind: "choice",
        values: ["enhancement", "ducking", "direct"],
        description: "Sidechain pushes distortion harder when the signal is louder. Great for hitting harder on transients.",
      },
      {
        id: "sidechain-ducking",
        group: "sidechain mode",
        label: "ducking (inverse)",
        kind: "choice",
        values: ["enhancement", "ducking", "direct"],
        description: "Sidechain reduces distortion when loud — it swells back in during quiet moments. Useful for pumping effects or keeping distortion out of the way of a kick.",
      },
      {
        id: "sidechain-direct",
        group: "sidechain mode",
        label: "direct control",
        kind: "choice",
        values: ["enhancement", "ducking", "direct"],
        description: "Sidechain level fully controls Dist % — the knob is bypassed. Drive and Mix remain yours to control.",
      },
    ],
    manual: [
      {
        title: "overview",
        body: "A stereo VCA feeding a six-algorithm distortion engine. Adjust depth (Dist %), intensity (Drive), and wet/dry blend (Mix). Adaptive makeup gain compensates for level shifts between algorithms."
      },
      {
        title: "signal flow",
        body: "Audio → VCA → distortion engine (1×–8× oversampled) → wet/dry blend → makeup gain → output. Each polyphonic voice runs its own engine instance."
      },
      {
        title: "sidechain and modulation",
        body: "Sidechain feeds an envelope follower that can enhance, duck, or directly replace Dist % — set in the context menu. Dist %, Drive, and Mix all accept CV through attenuverters."
      }
    ]
  },
  {
    slug: "evocation",
    hidden: true,
    name: "evocation",
    subtitle: "gesture envelope recorder with four independent polyphonic playback outputs and ADSR mode",
    summary: "Records touch-strip gestures as envelopes and plays them back across four independent outputs — each with its own speed, phase, loop, and invert. A second mode switches to ADSR.",
    category: "vcv rack module",
    status: "gesture envelope",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Activity,
    hp: 20,
    panelImage: {
      src: "/modules/evocation/panel-v2.webp",
      width: 1500,
      height: 1900,
      alt: "evocation hardware panel"
    },
    typeplate: {
      unit: "UNIT 09921",
      type: "GESTURE ENV GEN",
      alt: "CAPACITIVE CONJURING",
    },
    media: {},
    controls: [
      {
        id: "touch-strip",
        label: "touch strip",
        type: "meter",
        x: 20.2,
        y: 39.6,
        size: 18,
        description: [
          "in gesture mode: press and drag to draw an envelope, release to begin playback through all four outputs",
          "the bottom of the strip is always 0V: start and end your gesture there for clean rest positions",
          "in ADSR mode: touching the strip while sustain or release is selected edits those stages directly",
        ],
        tip: ""
      },
      {
        id: "oled",
        label: "oled display",
        type: "meter",
        x: 20.2,
        y: 82.9,
        size: 13,
        description: [
          "shows the recorded envelope shape with a scanline for each active voice's playback position",
          "displays speed, duration, and phase offset at the top: a parameter banner appears when you adjust controls",
          "choose a color theme in the context menu: phosphor, ice, solar, or amber",
        ],
        tip: ""
      },
      {
        id: "env-speed",
        label: "speed / stage time",
        type: "knob",
        x: 48.3,
        y: 13.8,
        size: 5.5,
        description: [
          "sets playback speed for the selected envelope output (0–8×)",
          "most of the knob travel covers fine 0–2× control: push past that for faster playback",
          "in ADSR mode, sets the time or level of the selected stage (attack, decay, sustain, or release)",
        ],
        tip: "",
        diagrams: [
          { id: "sp-half", label: "0.5× (half speed)", rotation: -65 },
          { id: "sp-unity", label: "1× (unity)", rotation: -39 },
          { id: "sp-double", label: "2× (double)", rotation: 52 },
          { id: "sp-max", label: "8× (max)", rotation: 130 }
        ]
      },
      {
        id: "env-phase",
        label: "phase / contour",
        type: "knob",
        x: 72.0,
        y: 13.9,
        size: 5.5,
        description: [
          "in gesture mode: shifts where the playback starts in the envelope (0–360°, wrapping)",
          "at 180° the output begins halfway through the gesture: useful for layered stagger effects",
          "in ADSR mode: sets the curve shape for the selected stage, from logarithmic through linear to exponential",
        ],
        tip: "",
        diagrams: [
          { id: "ph-0", label: "0° / LOG", rotation: -130 },
          { id: "ph-90", label: "90° / linear start", rotation: -43 },
          { id: "ph-180", label: "180° / LIN", rotation: 10 },
          { id: "ph-360", label: "360° / EXP", rotation: 130 }
        ]
      },
      {
        id: "loop",
        label: "loop",
        type: "switch",
        x: 72.0,
        y: 28.3,
        size: 3.5,
        description: [
          "when on, the selected output restarts automatically at the end of each cycle: works like an LFO",
          "in ADSR mode, the loop waits for gate release before re-triggering",
          "each output has its own loop state: select the output with the Env buttons before toggling",
        ],
        tip: "",
        diagrams: [
          { id: "loop-off", label: "off", state: "up" },
          { id: "loop-on", label: "loop active", state: "down" }
        ]
      },
      {
        id: "invert",
        label: "invert",
        type: "switch",
        x: 48.3,
        y: 28.3,
        size: 3.5,
        description: [
          "flips the output voltage on the selected channel: a rising gesture becomes a falling one",
          "each output has its own invert state: select the output before toggling",
        ],
        tip: "",
        diagrams: [
          { id: "inv-off", label: "normal", state: "up" },
          { id: "inv-on", label: "inverted", state: "down" }
        ]
      },
      {
        id: "trim-lead",
        label: "trim lead",
        type: "switch",
        x: 90.9,
        y: 13.25,
        size: 3.5,
        description: [
          "removes the silent pause at the start of your recorded gesture",
        ],
        tip: ""
      },
      {
        id: "trim-tail",
        label: "trim tail",
        type: "switch",
        x: 90.9,
        y: 27.2,
        size: 3.5,
        description: [
          "removes the flat tail at the end of your recorded gesture",
        ],
        tip: ""
      },
      {
        id: "trigger-btn",
        label: "manual trigger",
        type: "switch",
        x: 90.8,
        y: 39.9,
        size: 3.5,
        description: [
          "manually fires a trigger to start playback without a CV input patched",
          "fires alongside any connected gate or trigger CV: it won't interrupt those channels",
        ],
        tip: ""
      },
      {
        id: "gate-in",
        label: "gate input",
        type: "jack",
        x: 49.1,
        y: 39.9,
        size: 4.5,
        description: [
          "starts the envelope on the rising edge and releases it on the falling edge",
          "in ADSR mode: holds the sustain stage as long as the gate is high, then triggers release",
          "polyphonic: up to 16 channels, each voice runs independently through all four outputs",
        ],
        tip: ""
      },
      {
        id: "trigger-in",
        label: "trigger input",
        type: "jack",
        x: 72.0,
        y: 39.9,
        size: 4.5,
        description: [
          "fires a one-shot envelope each time it receives a trigger pulse: no hold, just start to end",
          "polyphonic: each of the 16 channels runs its own voice through all four outputs",
        ],
        tip: ""
      },
      {
        id: "env-select-1",
        label: "env 1 / attack select",
        type: "switch",
        x: 47.2,
        y: 49.7,
        size: 3.5,
        description: [
          "selects envelope output 1 (or the Attack stage in ADSR mode) for editing",
          "the speed, phase, loop, and invert controls all target whichever output is selected",
          "LED brightness shows the current output voltage across active voices",
        ],
        tip: ""
      },
      {
        id: "env-select-2",
        label: "env 2 / decay select",
        type: "switch",
        x: 61.8,
        y: 49.7,
        size: 3.5,
        description: [
          "selects envelope output 2 (or the Decay stage in ADSR mode) for editing",
          "the speed, phase, loop, and invert controls all target this output while it is selected",
        ],
        tip: ""
      },
      {
        id: "env-select-3",
        label: "env 3 / sustain select",
        type: "switch",
        x: 76.3,
        y: 49.7,
        size: 3.5,
        description: [
          "selects envelope output 3 (or the Sustain stage in ADSR mode) for editing",
          "in ADSR mode: touch the strip while this is selected to set the sustain level directly",
        ],
        tip: ""
      },
      {
        id: "env-select-4",
        label: "env 4 / release select",
        type: "switch",
        x: 90.8,
        y: 49.7,
        size: 3.5,
        description: [
          "selects envelope output 4 (or the Release stage in ADSR mode) for editing",
          "in ADSR mode: touch the strip while this is selected to edit release time and contour directly",
        ],
        tip: ""
      },
      {
        id: "phase-cv-1",
        label: "phase CV 1",
        type: "jack",
        x: 47.2,
        y: 59.6,
        size: 4.5,
        description: [
          "shifts where output 1 starts in the envelope, per voice: great for fan or stagger effects",
          "in ADSR mode, adds a rhythmic delay offset before the envelope starts (quantized to 1/16 by default)",
        ],
        tip: ""
      },
      {
        id: "phase-cv-2",
        label: "phase CV 2",
        type: "jack",
        x: 61.8,
        y: 59.6,
        size: 4.5,
        description: [
          "shifts where output 2 starts in the envelope, per voice: independent from output 1's phase CV",
        ],
        tip: ""
      },
      {
        id: "phase-cv-3",
        label: "phase CV 3",
        type: "jack",
        x: 76.3,
        y: 59.6,
        size: 4.5,
        description: [
          "shifts where output 3 starts in the envelope, per voice: independent from the other phase CVs",
        ],
        tip: ""
      },
      {
        id: "phase-cv-4",
        label: "phase CV 4",
        type: "jack",
        x: 90.8,
        y: 59.6,
        size: 4.5,
        description: [
          "shifts where output 4 starts in the envelope, per voice: independent from the other phase CVs",
        ],
        tip: ""
      },
      {
        id: "eoc-1",
        label: "EOC 1 output",
        type: "jack",
        x: 47.2,
        y: 69.5,
        size: 4.5,
        description: [
          "fires a short pulse when envelope 1 completes a cycle: fires on every loop iteration too",
        ],
        tip: ""
      },
      {
        id: "eoc-2",
        label: "EOC 2 output",
        type: "jack",
        x: 61.8,
        y: 69.5,
        size: 4.5,
        description: [
          "fires a short pulse when envelope 2 completes a cycle: polyphonic, one pulse per voice",
        ],
        tip: ""
      },
      {
        id: "eoc-3",
        label: "EOC 3 output",
        type: "jack",
        x: 76.3,
        y: 69.5,
        size: 4.5,
        description: [
          "fires a short pulse when envelope 3 completes a cycle: polyphonic, one pulse per voice",
        ],
        tip: ""
      },
      {
        id: "eoc-4",
        label: "EOC 4 output",
        type: "jack",
        x: 90.8,
        y: 69.5,
        size: 4.5,
        description: [
          "fires a short pulse when envelope 4 completes a cycle: polyphonic, one pulse per voice",
        ],
        tip: ""
      },
      {
        id: "gate-out-1",
        label: "gate output 1",
        type: "jack",
        x: 47.2,
        y: 79.4,
        size: 4.5,
        description: [
          "stays high while envelope 1 is playing, drops to zero when it finishes",
          "polyphonic: each voice has its own gate state",
        ],
        tip: ""
      },
      {
        id: "gate-out-2",
        label: "gate output 2",
        type: "jack",
        x: 61.8,
        y: 79.4,
        size: 4.5,
        description: [
          "stays high while envelope 2 is playing, drops to zero when it finishes: polyphonic",
        ],
        tip: ""
      },
      {
        id: "gate-out-3",
        label: "gate output 3",
        type: "jack",
        x: 76.3,
        y: 79.4,
        size: 4.5,
        description: [
          "stays high while envelope 3 is playing, drops to zero when it finishes: polyphonic",
        ],
        tip: ""
      },
      {
        id: "gate-out-4",
        label: "gate output 4",
        type: "jack",
        x: 90.8,
        y: 79.4,
        size: 4.5,
        description: [
          "stays high while envelope 4 is playing, drops to zero when it finishes: polyphonic",
        ],
        tip: ""
      },
      {
        id: "env-out-1",
        label: "envelope output 1",
        type: "jack",
        x: 47.2,
        y: 89.3,
        size: 4.5,
        description: [
          "main envelope CV output (0–10V) for playback engine 1",
          "plays the recorded gesture at the speed, phase, loop, and invert settings configured for this output",
          "polyphonic: up to 16 voices play simultaneously",
        ],
        tip: ""
      },
      {
        id: "env-out-2",
        label: "envelope output 2",
        type: "jack",
        x: 61.8,
        y: 89.3,
        size: 4.5,
        description: [
          "same recorded gesture as output 1, played at its own independent speed, phase, loop, and invert settings",
          "use phase CV offsets across outputs 1–4 to create layered staggered textures",
        ],
        tip: ""
      },
      {
        id: "env-out-3",
        label: "envelope output 3",
        type: "jack",
        x: 76.3,
        y: 89.3,
        size: 4.5,
        description: [
          "same recorded gesture as the other outputs, with fully independent playback settings",
          "configure speed, phase, loop, and invert using the Env 3 Select button",
        ],
        tip: ""
      },
      {
        id: "env-out-4",
        label: "envelope output 4",
        type: "jack",
        x: 90.8,
        y: 89.3,
        size: 4.5,
        description: [
          "same recorded gesture as the other outputs, with fully independent playback settings",
          "with all four outputs at different speeds and phases, one gesture can fill a whole patch with evolving CV",
        ],
        tip: ""
      }
    ],
    contextMenu: [
      {
        id: "mode-gesture",
        group: "mode",
        label: "gesture",
        kind: "choice",
        description: [
          "press and drag the touch strip to draw a custom envelope shape",
          "release to begin playback through all four outputs simultaneously",
          "use Trim Lead and Trim Tail to remove silence from either end of the recording"
        ]
      },
      {
        id: "mode-adsr",
        group: "mode",
        label: "adsr",
        kind: "choice",
        description: [
          "classic four-stage envelope: Attack, Decay, Sustain, Release",
          "use Env 1–4 Select to choose which output and which stage to edit",
          "touch the strip during Sustain or Release to set level and time directly"
        ]
      },
      {
        id: "theme-follow",
        group: "screen theme",
        label: "follow shared",
        kind: "choice",
        description: "Syncs the display color with the global Shapetaker theme — updates automatically when other modules change theirs."
      },
      {
        id: "theme-phosphor",
        group: "screen theme",
        label: "phosphor",
        kind: "choice",
        description: "Bright green on black — vintage monochrome CRT look."
      },
      {
        id: "theme-ice",
        group: "screen theme",
        label: "ice",
        kind: "choice",
        description: "Cool cyan and blue-white tones."
      },
      {
        id: "theme-solar",
        group: "screen theme",
        label: "solar",
        kind: "choice",
        description: "Warm yellow-gold tones."
      },
      {
        id: "theme-amber",
        group: "screen theme",
        label: "amber",
        kind: "choice",
        description: "Deep amber on black — classic amber terminal look."
      },
      {
        id: "quantize-phase",
        group: "adsr phase",
        label: "quantize phase CV",
        kind: "toggle",
        description: "When on, Phase CV in ADSR mode snaps to 1/16-note steps for rhythmically aligned staggered entries. Turn off for smooth, continuous offsets."
      }
    ],
    manual: [
      {
        title: "overview",
        body: "Dual-mode envelope generator built around a touch strip. In Gesture mode, drag to record an envelope and play it back across four independent outputs. In ADSR mode, the strip becomes a stage editor."
      },
      {
        title: "gesture recording and editing",
        body: "Drag on the strip to record. The module filters noise and skips flat sections automatically. Trim Lead and Trim Tail remove silence at either end and rescale the remaining envelope to fill the full time range."
      },
      {
        title: "four-output playback",
        body: "All four outputs play the same envelope with independent speed, phase, loop, and invert controls. Trigger fires one-shot envelopes; Gate holds sustain or controls release fade. EOC outputs fire a 1ms pulse at each cycle end."
      }
    ]
  },
  {
    slug: "involution",
    hidden: true,
    name: "involution",
    subtitle: "dual 6th-order liquid filters animated by a lorenz strange attractor, with counter-rotating frequency shifting and chaos-swept phasing",
    summary: "Two 36 dB/octave filters that breathe: input transients push the cutoff open while resonant blooms pull it down. A Lorenz attractor replaces the LFO, so the motion never repeats.",
    category: "vcv rack module",
    status: "dual chaotic filter",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Filter,
    hp: 18,
    panelImage: {
      src: "/modules/involution/panel-v3.webp",
      width: 1350,
      height: 1900,
      alt: "involution vcv rack module panel"
    },
    media: {},
    controls: [],
    typeplate: {
      unit: "UNIT 01557",
      type: "HARMONIC REDUCTION",
    },
    manual: [
      {
        title: "liquid filters",
        body: "Each channel cascades three state-variable stages into a 6th-order slope with ladder-style global feedback and bass protection. Transient and bloom followers give the cutoff an elastic, seeking-and-settling response under resonance."
      },
      {
        title: "lorenz attractor",
        body: "Modulation comes from a chaotic Lorenz system — three axes tapped and spread across polyphonic voices so no two move identically. The front-panel oscilloscope draws the attractor's live trajectory."
      },
      {
        title: "spatial network",
        body: "Post-filter, a counter-rotating frequency shifter widens the field (A shifts up, B shifts down) and a resonant all-pass phaser tracks the cutoff, its depth swept continuously by the chaos source."
      }
    ]
  },
  {
    slug: "specula",
    hidden: true,
    name: "specula",
    subtitle: "dual-channel vintage vu meter with needle ballistics, polyphonic peak detection, and transparent pass-through",
    summary: "A dual VU meter with the mechanical inertia of classic needle movements — 15 ms attack, 450 ms release, calibrated so 10 Vpp reads 0 VU. Inputs pass through untouched.",
    category: "vcv rack module",
    status: "vu meter",
    accent: "#d7b56d",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: Gauge,
    hp: 10,
    panelImage: {
      src: "/modules/specula/panel-v3.webp",
      width: 750,
      height: 1900,
      alt: "specula vcv rack module panel"
    },
    media: {},
    controls: [],
    typeplate: {
      unit: "UNIT 07843",
      type: "VU METER",
      alt: "CALIBRATED",
    },
    manual: [
      {
        title: "ballistics",
        body: "Custom metering emulates the inertia of a mechanical needle: fast 15 ms attack to catch transients, smooth 450 ms release for a readable decay. The dial spans −20 dB to +3 dB."
      },
      {
        title: "polyphonic metering",
        body: "Each input evaluates up to six polyphonic channels and displays the maximum peak across them, so a hot voice buried in a chord still shows on the needle."
      },
      {
        title: "pass-through",
        body: "The signal path is a direct, uncolored buffer — inputs are duplicated at the outputs with their exact voltages and channel counts, so Specula can sit inline anywhere in a chain."
      }
    ]
  },
  {
    slug: "incantation",
    hidden: true,
    name: "incantation",
    subtitle: "eight-band resonant filter array with a 24-pattern animation sequencer, envelope morphing, and analog-modeled drive",
    summary: "Eight resonant filter bands, each gated by its own envelope and sequenced by selectable rhythmic patterns. A dynamic resonator that gives any source motion and vocalic character.",
    category: "vcv rack module",
    status: "resonant filter array",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Layers,
    hp: 19,
    panelImage: {
      src: "/modules/incantation/panel-v3.webp",
      width: 1425,
      height: 1900,
      alt: "incantation vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "filter array",
        body: "Eight state-variable bands with per-band sliders and CV inputs. MIDS voices all bands from 200 Hz to 3.4 kHz for guitars, synths, and vowels; BASS keeps band one as a 110 Hz lowpass to protect the fundamental."
      },
      {
        title: "animation sequencer",
        body: "24 patterns across two banks animate the bands from 0.08 to 4 Hz, with tap tempo. The Envelope knob morphs each band's VCA from sharp and choppy through tremolo crossfades to reverse-style swells."
      },
      {
        title: "drive and imaging",
        body: "An analog-modeled saturation stage colors the input before the array. Patch only the left input and take both outputs: odd bands pan left, even bands pan right, and the animation bounces across the stereo field."
      }
    ]
  },
  {
    slug: "torsion",
    hidden: true,
    name: "torsion",
    subtitle: "cz-inspired phase distortion oscillator with five warp shapes, a six-stage dcw envelope, sub oscillator, and bbd-style chorus",
    summary: "Phase distortion in the CZ tradition, expanded for the modular world: five warp shapes with symmetry bias, dual operators with cross phase-mod and ring mod, and a six-stage envelope dedicated to distortion depth.",
    category: "vcv rack module",
    status: "phase distortion osc",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Waves,
    hp: 18,
    panelImage: {
      src: "/modules/torsion/panel-v3.webp",
      width: 1350,
      height: 1900,
      alt: "torsion vcv rack module panel"
    },
    media: {},
    controls: [],
    typeplate: {
      unit: "UNIT 03190",
      type: "PHASE ABBERATION",
    },
    manual: [
      {
        title: "phase distortion engine",
        body: "Digitally controlled waveforms warp the oscillator phase under the Torsion control. Five warp shapes — single sine, resonant, double sine, saw pulse, pulse — plus a Symmetry bias reshape the harmonic structure, with saw, triangle, and square injections layered on top."
      },
      {
        title: "six-stage envelope",
        body: "Six stage sliders set an envelope dedicated to distortion depth, smoothly interpolated and visualized on the LED array. Gate input sustains, Stage Trig fires one-shots, and the envelope is available at the Edge output."
      },
      {
        title: "interaction and character",
        body: "A sub oscillator anchors the low end while the interaction switch selects independent, cross phase-mod, DCW-follow, or ring mod behavior between operators. Feedback, the Dirty saturation circuit, and a bucket-brigade chorus finish the voice."
      }
    ]
  },
  {
    slug: "reverie",
    hidden: true,
    name: "reverie",
    subtitle: "dattorro plate reverb wrapped in five character modes — field blur, afterimage, reverse, lo-fi, and modulated",
    summary: "A finely tuned plate tank surrounded by five pre- and post-processors: shoegaze chorus and shimmer, ghostly spectral resonance, reverse granular swells, degraded wow-and-flutter texture, and deep classic modulation.",
    category: "vcv rack module",
    status: "multi-mode reverb",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Sparkles,
    hp: 16,
    panelImage: {
      src: "/modules/reverie/panel-v3.webp",
      width: 1200,
      height: 1900,
      alt: "reverie vcv rack module panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "the tank",
        body: "A polyphonic Dattorro plate network sits at the core. Decay ranges from short room bursts to near-infinite atmosphere; Tone damps the tail dark or opens it to a brilliant, expansive decay."
      },
      {
        title: "five modes",
        body: "A blade switch selects the character: Field Blur (stereo ensemble chorus + regenerative shimmer), Afterimage (resonant bandpass + sub-octave ghosts), Reverse (granular buffer ahead of the tank), Lo-Fi (crush, saturation, wow and flutter), and Modulated (deep animated plate). The jewel LED shows the active mode."
      },
      {
        title: "effect blend",
        body: "One small knob scales both mode parameters at once — fully counter-clockwise leaves a pristine plate, clockwise fades the dialed-in texture back in without losing the Param 1/2 relationship. Decay, Mix, and both Params take CV through attenuverters."
      }
    ]
  },
  {
    slug: "tessellation",
    hidden: true,
    name: "tessellation",
    subtitle: "three stereo delay lines with golden-ratio subdivisions, vintage voicing modes, and a circulating cross-feedback network",
    summary: "A rhythmic polytap delay where line 1 is the master timebase and lines 2 and 3 follow in musical — or irrational golden-ratio — subdivisions. Cross-feedback turns the whole module into one circulating wash.",
    category: "vcv rack module",
    status: "triple delay",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Layers,
    hp: 26,
    panelImage: {
      src: "/modules/tessellation/panel-v3.webp",
      width: 1950,
      height: 1900,
      alt: "tessellation vcv rack module panel"
    },
    media: {},
    controls: [],
    typeplate: {
      unit: "UNIT 06667",
      type: "TRIPLE DELAY",
    },
    manual: [
      {
        title: "three delay lines",
        body: "Three parallel stereo lines from 20 ms to 1.6 s. Delay 1 sets the tempo by knob, tap, or external clock; delays 2 and 3 lock to it through triplet, eighth, dotted, or free subdivisions."
      },
      {
        title: "golden subdivisions",
        body: "The Golden setting locks lines 2 and 3 to powers of phi — irrational ratios that keep repeats from stacking into metallic comb filtering. Sweeping Time explores golden short, golden, unity, golden long, and golden double."
      },
      {
        title: "voicing and x-feed",
        body: "Each line voices as pristine 24/96, ADM compander grit, or 12-bit vintage converters. X-Feed routes 1 → 2 → 3 → 1 into a circulating network that can run past unity into a saturated wash — kill switches mute each line while its buffer keeps recording."
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
