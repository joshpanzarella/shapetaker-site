import { Activity, AudioLines, Cable, Gauge, SlidersHorizontal, Sparkles, Filter, Layers, Waves } from "lucide-react";
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
  diagrams?: Array<{
    id: string;
    label: string;
    icon?: string;
    svg?: string;
    color?: string;
    rotation?: number;
    state?: 'up' | 'down';
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
  description: string;
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
    alt: string;
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
    subtitle: "polyphonic dual oscillator with sigmoid-saw or PWM waveforms, symmetric detuned pairs, two sync modes, and equal-power or stereo-swap crossfade",
    summary: "Clairaudient is a polyphonic, stereo, dual oscillator. Each voice (V and Z) has two oscillators that you can tune via the FREQ knobs. A central crossfader blends V/Z with a constant-power curve or a stereo-swap mode that inverts the image as it sweeps. Cross-sync and reverse-sync add rhythmic harmonic locking between V and Z.",
    category: "vcv rack modules",
    status: "stereo oscillator",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: AudioLines,
    hp: 16,
    panelImage: {
      src: "/modules/clairaudient/panel-source.png",
      width: 1268,
      height: 2014,
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
        y: 19.73,
        size: 30,
        description: [
          "shows the live stereo output — the shape reflects how V and Z are blending at the crossfader",
          "when sync is on and V:Z are at a simple ratio, the trace locks into a stable figure",
          "choose a color theme (phosphor, ice, solar, amber) in the context menu",
        ],
        tip: "watch the display change shape as you adjust the crossfader, sync switches, or V/Z ratio — it shows the stereo relationship, not just amplitude.",
        diagrams: [
          {
            id: "scope-chaotic",
            label: "chaotic (incommensurate ratio)",
            svg: '<rect x="1" y="1" width="22" height="22" rx="4" fill="#020617" /><path fill="none" stroke="#2dd4bf" stroke-width="1.5" class="scope-trace" d="M 4 12 Q 8 4, 12 12 T 20 12 M 12 4 Q 4 8, 12 12 T 12 20 M 6 6 C 12 4, 18 12, 18 18 C 12 20, 6 12, 6 6 Z" />'
          },
          {
            id: "scope-sync",
            label: "hard synced (forced lock)",
            svg: '<rect x="1" y="1" width="22" height="22" rx="4" fill="#020617" /><path fill="none" stroke="#2dd4bf" stroke-width="1.5" class="scope-trace" d="M 4 14 Q 8 4, 12 14 L 12 6 Q 16 6, 20 14" />'
          },
          {
            id: "scope-1-1",
            label: "unison (1:1 phase lock)",
            svg: '<rect x="1" y="1" width="22" height="22" rx="4" fill="#020617" /><ellipse fill="none" stroke="#2dd4bf" stroke-width="1.5" class="scope-trace" cx="12" cy="12" rx="6" ry="6" />'
          }
        ]
      },
      {
        id: "v-frequency",
        label: "v octave",
        type: "knob",
        x: 15.0,
        y: 16.9,
        size: 18,
        description: [
          "sets the register for the V oscillator in whole-octave steps (−2 to +2)",
          "snaps to octaves by default — turn off quantization in the context menu for continuous tuning",
          "set this first to place V in the right octave, then fine-tune from there",
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
        id: "z-frequency",
        label: "z semitone",
        type: "knob",
        x: 85.0,
        y: 16.9,
        size: 18,
        description: [
          "offsets Z from V's pitch in semitones (±24 semitones across 4 octaves)",
          "snaps to semitone steps by default — disable quantization in the context menu for continuous tuning",
          "when Z V/Oct is unpatched, Z follows V's pitch and this knob adds the interval on top",
        ],
        tip: "tuning Z to a harmonic interval of V (5th = +7st, octave = +12st) produces stable sync relationships.",
        diagrams: [
          { id: "z-freq--24", label: "-24 semitones (−2 oct)", icon: "ChevronsDown", rotation: -135 },
          { id: "z-freq--12", label: "-12 semitones (−1 oct)", icon: "ChevronDown", rotation: -67.5 },
          { id: "z-freq-0", label: "0 semitones", icon: "Minus", rotation: 0 },
          { id: "z-freq-+12", label: "+12 semitones (+1 oct)", icon: "ChevronUp", rotation: 67.5 },
          { id: "z-freq-+24", label: "+24 semitones (+2 oct)", icon: "ChevronsUp", rotation: 135 }
        ]
      },
      {
        id: "v-fine",
        label: "v fine tune",
        type: "knob",
        x: 23.41,
        y: 34.52,
        size: 14,
        description: [
          "detunes the two V sub-oscillators symmetrically — one goes flat, the other goes sharp",
          "small amounts give subtle chorus; larger amounts produce audible beating",
          "the beating speed changes with the note pitch, which sounds natural",
        ],
        tip: "small amounts (2–5 cents) create a subtle natural chorus; larger amounts produce audible beating.",
        diagrams: [
          { id: "v-fine-flat", label: "flat (−20 cents)", icon: "Minus", rotation: -135 },
          { id: "v-fine-center", label: "no detuning (0 cents)", icon: "Circle", rotation: 0 },
          { id: "v-fine-sharp", label: "sharp (+20 cents)", icon: "Plus", rotation: 135 }
        ]
      },
      {
        id: "z-fine",
        label: "z fine tune",
        type: "knob",
        x: 76.59,
        y: 34.52,
        size: 14,
        description: [
          "detunes the two Z sub-oscillators symmetrically, the same way V fine tune works",
          "detuning Z at a different amount than V creates a second, independent beat rate on the Z side",
        ],
        tip: "detuning Z slightly relative to V creates an evolving beat frequency that changes with the crossfader.",
        diagrams: [
          { id: "z-fine-flat", label: "flat (−20 cents total)", icon: "Minus", rotation: -135 },
          { id: "z-fine-center", label: "no detuning (0 cents)", icon: "Circle", rotation: 0 },
          { id: "z-fine-sharp", label: "sharp (+20 cents total)", icon: "Plus", rotation: 135 }
        ]
      },
      {
        id: "v-fine-att",
        label: "v fine cv att",
        type: "knob",
        x: 13.34,
        y: 45.7,
        size: 10,
        description: [
          "scales the CV going into V fine tune — noon is off, clockwise is positive, counter-clockwise inverts",
          "use an inverted LFO to create a vibrato that goes flat before it goes sharp",
        ],
        tip: "use inverted scaling with an LFO to create a natural vibrato that goes flat-then-sharp."
      },
      {
        id: "z-fine-att",
        label: "z fine cv att",
        type: "knob",
        x: 86.66,
        y: 45.7,
        size: 10,
        description: [
          "scales the CV going into Z fine tune — same behavior as V fine CV attenuverter",
          "patch the same LFO into both V and Z fine CVs with opposite polarities for a stereo vibrato",
        ],
        tip: "patch the same LFO to both V and Z fine CV with opposite attenuverter settings for a stereo-widening vibrato."
      },
      {
        id: "xsync",
        label: "cross sync",
        type: "switch",
        x: 30.03,
        y: 51.79,
        size: 10,
        description: [
          "forces Z to restart its cycle each time V completes one — classic hard sync",
          "tune Z above V and sweep the Z pitch for the signature sync-sweep sound",
          "cross sync takes priority if both sync switches are up at the same time",
        ],
        tip: "hard sync + a slow Z V/Oct sweep creates classic sync sweep sounds.",
        diagrams: [
          { id: "xsync-off", label: "free running", icon: "Unlink", state: "down" as const },
          { id: "xsync-on",  label: "hard sync (V resets Z)", icon: "Link", state: "up" as const }
        ]
      },
      {
        id: "reverse-sync",
        label: "reverse sync",
        type: "switch",
        x: 69.97,
        y: 51.79,
        size: 10,
        description: [
          "flips the direction Z is running each time V completes a cycle — not standard hard sync, but a different kind of locking",
          "produces an irregular, reversing texture that changes character with the V:Z ratio",
          "only active when cross sync is off; cross sync overrides it if both are up",
        ],
        tip: "reverse sync with Z tuned a fifth above V produces an irregular stuttering pulse character.",
        diagrams: [
          { id: "rev-off", label: "free running", icon: "ArrowRight", state: "down" as const },
          { id: "rev-on",  label: "phase reversal on V cycle", icon: "Repeat", state: "up" as const }
        ]
      },
      {
        id: "xfade",
        label: "crossfade",
        type: "knob",
        x: 50.0,
        y: 45.8,
        size: 18,
        description: [
          "blends between the V and Z oscillator paths — fully left is V only, fully right is Z only",
          "equal-power mode (default) keeps volume consistent throughout the sweep",
          "in stereo-swap mode, center position gives the widest image; sweeping through it flips the stereo field",
        ],
        tip: "in stereo-swap mode, center position produces the widest stereo field; modulate it slowly for a sweeping spatial effect.",
        diagrams: [
          {
            id: "v-side",
            label: "V only",
            svg: '<path d="M5 4 L12 20 L19 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            rotation: -135
          },
          {
            id: "v-z-blend",
            label: "V + Z blend",
            svg: '<path d="M6 18 L18 6 M6 6 L18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            rotation: 0
          },
          {
            id: "z-side",
            label: "Z only",
            svg: '<path d="M4 4 H20 L4 20 H20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            rotation: 135
          }
        ]
      },
      {
        id: "xfade-att",
        label: "crossfade cv att",
        type: "knob",
        x: 50.0,
        y: 59.83,
        size: 10,
        description: [
          "scales the CV going into the crossfader — noon is off, clockwise is positive, counter-clockwise inverts",
          "a slow LFO here with a small attenuverter setting creates gentle, continuous motion between V and Z",
        ],
        tip: "slow LFO here creates gentle, continuous motion between the two oscillator characters."
      },
      {
        id: "v-shape",
        label: "v shape",
        type: "knob",
        x: 13.12,
        y: 63.07,
        size: 14,
        description: [
          "changes the V waveform from sawtooth-like at minimum toward a square-like shape at maximum",
          "in PWM mode, controls pulse width instead — center is a square wave, extremes are thin pulses",
          "modulate slowly with CV for a gradual timbral shift without abrupt jumps",
        ],
        tip: "in sigmoid mode, slow CV modulation of shape produces a gradual character shift without abrupt timbral jumps.",
        diagrams: [
          { id: "v-saw",     label: "sawtooth", icon: "Activity",  rotation: -135 },
          { id: "v-sigmoid", label: "sigmoid",       icon: "Spline",    rotation: 0 },
          { id: "v-square",  label: "square", icon: "Square", rotation: 135 }
        ]
      },
      {
        id: "z-shape",
        label: "z shape",
        type: "knob",
        x: 86.88,
        y: 63.07,
        size: 14,
        description: [
          "same shape control as V but applied to Z's waveform independently",
          "set V and Z to different shapes before crossfading — the blend will shift timbre, not just level",
        ],
        tip: "set V and Z shape to different values before crossfading — the blend will shift character, not just level.",
        diagrams: [
          { id: "z-saw",     label: "sawtooth", icon: "Activity",  rotation: -135 },
          { id: "z-sigmoid", label: "sigmoid curve",       icon: "Spline",    rotation: 0 },
          { id: "z-square",  label: "square", icon: "Square", rotation: 135 }
        ]
      },
      {
        id: "v-shape-att",
        label: "v shape cv att",
        type: "knob",
        x: 32.02,
        y: 69.31,
        size: 10,
        description: [
          "scales the CV going into V shape — noon is off, counter-clockwise inverts the direction",
          "patch an envelope here to push V into a brighter shape on note attack, then fall back to saw",
        ],
        tip: "patch an envelope here to push into a sharper waveform on note attack and release back to saw."
      },
      {
        id: "z-shape-att",
        label: "z shape cv att",
        type: "knob",
        x: 67.98,
        y: 69.31,
        size: 10,
        description: [
          "scales the CV going into Z shape — same behavior as V shape attenuverter",
          "opposite polarity on V and Z from the same LFO creates a seesaw timbral sweep between the two sides",
        ],
        tip: "opposite attenuverter polarity on V and Z shape CVs from the same LFO creates a seesaw timbral sweep."
      },
      {
        id: "xfade-cv",
        label: "crossfade cv",
        type: "jack",
        x: 50.0,
        y: 69.25,
        size: 10,
        description: [
          "CV input for the crossfader, scaled by the attenuverter above it",
          "polyphonic — each voice can sit at a different crossfade position for layered stereo textures",
        ],
        tip: "sequencer gate with a slewed crossfade CV creates rapid automated V/Z switching."
      },
      {
        id: "v-voct",
        label: "v v/oct",
        type: "jack",
        x: 20.29,
        y: 78.93,
        size: 10,
        description: [
          "pitch input for the V oscillator — stacks with the octave knob and fine tune",
          "polyphonic up to 16 voices; when Z V/Oct is unpatched, Z follows this input too",
        ],
        tip: "patch a polyphonic sequencer here for independent per-voice tuning of the V oscillator."
      },
      {
        id: "v-fine-cv",
        label: "v fine cv",
        type: "jack",
        x: 40.02,
        y: 78.93,
        size: 10,
        description: [
          "modulates V fine tune via CV, scaled by the attenuverter",
          "polyphonic — each voice gets independent fine-tune modulation for per-voice vibrato or spread",
        ],
        tip: "patch vibrato LFO here for per-voice pitch modulation depth controlled by the attenuverter."
      },
      {
        id: "v-shape-cv",
        label: "v shape cv",
        type: "jack",
        x: 59.59,
        y: 78.93,
        size: 10,
        description: [
          "modulates V waveform shape via CV, scaled by the attenuverter",
          "polyphonic — patch a polyphonic envelope here to give each voice its own shape contour",
        ],
        tip: "an envelope here with moderate attenuverter creates a natural shape attack and decay on V."
      },
      {
        id: "z-voct",
        label: "z v/oct",
        type: "jack",
        x: 20.29,
        y: 89.11,
        size: 10,
        description: [
          "pitch input for the Z oscillator — when patched, Z follows this independently from V",
          "when unpatched, Z inherits V's pitch and adds the semitone knob offset on top",
        ],
        tip: "patch a second sequencer pitch output here to independently melodize the Z oscillator."
      },
      {
        id: "z-fine-cv",
        label: "z fine cv",
        type: "jack",
        x: 40.02,
        y: 89.11,
        size: 10,
        description: [
          "modulates Z fine tune via CV, scaled by the attenuverter",
          "try a slow random or S&H source with a low attenuverter for subtle per-note detuning variation",
        ],
        tip: "a slow random (S&H) source here with low attenuverter adds subtle detuning variation per note."
      },
      {
        id: "z-shape-cv",
        label: "z shape cv",
        type: "jack",
        x: 59.59,
        y: 89.11,
        size: 10,
        description: [
          "modulates Z waveform shape via CV, scaled by the attenuverter",
          "run V and Z shape CVs from the same source with opposite attenuverters for a mirror shape sweep",
        ],
        tip: "running the same modulation source into V and Z shape CVs with opposite attenuverters creates a mirror shape sweep."
      },
      {
        id: "output-l",
        label: "output L",
        type: "jack",
        x: 79.16,
        y: 78.93,
        size: 10,
        description: [
          "left stereo output carrying all active polyphonic voices",
          "connect L and R to a stereo mixer or effects chain",
        ],
        tip: "patch L and R to a stereo mixer or directly into left/right inputs of an effects chain."
      },
      {
        id: "output-r",
        label: "output R",
        type: "jack",
        x: 79.16,
        y: 89.11,
        size: 10,
        description: [
          "right stereo output — the spread between L and R comes from the detuned sub-oscillator pairs",
          "summing L and R to mono is safe and won't cause phase cancellation",
        ],
        tip: "summing L and R to mono is safe — the sub-oscillator pairs are complementary and cancel cross-correlation at the blend points."
      }
    ],
    contextMenu: [
      {
        id: "v-oscillator-quantized",
        group: "settings",
        label: "v oscillator quantized",
        kind: "toggle",
        description:
          "When enabled, the V Octave knob snaps to discrete whole-octave steps (−2, −1, 0, +1, +2). When disabled, tuning is continuous — useful for glide-style pitch or microtonal intervals. Default is on."
      },
      {
        id: "z-oscillator-quantized",
        group: "settings",
        label: "z oscillator quantized",
        kind: "toggle",
        description:
          "When enabled, the Z Semitone knob snaps to discrete semitone steps across a ±24 semitone (4 octave) range (49 positions total). When disabled, tuning is continuous. Default is on."
      },
      {
        id: "oscilloscope-theme",
        group: "settings",
        label: "oscilloscope theme",
        kind: "choice",
        values: ["phosphor", "ice", "solar", "amber"],
        description:
          "Selects the color palette for the vintage oscilloscope display. Phosphor is a warm green phosphor CRT look; Ice is a cool blue-white; Solar is a warm amber-red; Amber is a golden amber phosphor. A 'follow shared theme' toggle in the context menu lets all Shapetaker oscilloscope displays share a single theme setting."
      },
      {
        id: "oscillator-noise",
        group: "oscillator noise",
        label: "noise",
        kind: "slider",
        description:
          "Adds two simultaneous noise effects scaled together: per-sample phase jitter (scale 0.00005, scaled by this amount) and an audible white noise floor (peak ±0.45V, added post-waveshaping). Both follow a perceptual shaping curve (exponent 0.65) so low amounts are nearly inaudible — the noise appears gradually as you increase the slider. Default is 0% (off)."
      },
      {
        id: "drift",
        group: "organic drift",
        label: "drift",
        kind: "slider",
        description:
          "Introduces slow, independent pitch wandering per sub-oscillator via a random walk algorithm. The walk speed is proportional to the amount — at full, the pitch of each sub-oscillator wanders up to approximately ±1.2 cents from its nominal pitch. Drift updates at 1/64 of the sample rate for CPU efficiency. Default is 0% (off)."
      },
      {
        id: "drift-cohesion",
        group: "organic drift",
        label: "drift cohesion",
        kind: "slider",
        description:
          "Controls whether polyphonic voices drift independently or together. At zero, each voice has its own drift trajectory. At full, all voices share a single drift source — simulating a common power supply sag or shared thermal environment. Intermediate values blend between independent and shared drift, useful for achieving that 'slight ensemble but not totally random' character."
      },
      {
        id: "voice-character",
        group: "analog glue",
        label: "voice character",
        kind: "slider",
        description:
          "Adds stable, deterministic per-voice offsets in four dimensions: pitch (±0.25% at full), shape (±2.5%), level (±3.5%), and stereo pan (±2.5%). The offsets are seeded from the voice index and never change between patches — voice 1 always has the same character, voice 2 another, and so on. This creates the consistent voice-to-voice variation of an analog polysynth with component tolerances."
      },
      {
        id: "output-color",
        group: "analog glue",
        label: "output color",
        kind: "slider",
        description:
          "Applies a tanh-based soft saturation and stereo crosstalk to the output bus. At full: 2.5% of each channel bleeds into the other (crosstalk), and the signal is driven by up to 0.25× extra and re-normalized through tanh. The result glues the two oscillators together sonically and softens harsh transients. Wet/dry blends linearly from 0% (off) to 100% (fully colored). Default is 0%."
      },
      {
        id: "high-cut-enabled",
        group: "tone options",
        label: "high cut enabled",
        kind: "toggle",
        description:
          "Engages a one-pole low-pass filter at 14,500 Hz on both output channels. Applied post-waveshaping and post-output-color. Softens the top end of harsh digital content from extreme shape settings or high-drive oversampled processing. Default is off."
      },
      {
        id: "oversampling",
        group: "tone options",
        label: "oversampling",
        kind: "choice",
        values: ["1x off", "2x", "4x", "8x"],
        description:
          "Sets the internal oversampling factor for the waveshaping engine. At 1×: no oversampling, no anti-alias filtering — lowest CPU. At 2×/4×/8×: the engine runs at 2/4/8× the system sample rate; a two-stage cascaded one-pole anti-alias filter (cutoff 0.45× system rate) reduces aliasing artifacts before decimation back down. Default is 4×. 8× is recommended for extreme shape CV modulation or hard sync at high pitches."
      },
      {
        id: "waveform-mode",
        group: "waveform mode",
        label: "waveform mode",
        kind: "choice",
        values: ["sigmoid saw", "pwm"],
        description:
          "Selects the waveform algorithm for both V and Z oscillators. Sigmoid Saw (default): a sawtooth wave shaped through a sigmoid function whose steepness is controlled by the Shape knob, ranging from near-sawtooth to near-square. PWM: a pulse wave whose duty cycle is controlled by Shape (5%–95%), with PolyBLEP anti-aliasing applied at the discontinuities. The mode switch applies to all voices."
      },
      {
        id: "crossfade-curve",
        group: "crossfade curve",
        label: "crossfade curve",
        kind: "choice",
        values: ["equal-power", "stereo swap"],
        description:
          "Sets the crossfader behavior. Equal-Power (default): uses a constant-power trigonometric curve (cos/sin) so perceived loudness stays consistent as you sweep from V to Z — no volume dip at center. Stereo Swap: routes V_A to L with Z_B, and V_B to R with Z_A, with an out-of-phase crossfeed that peaks at the center position (gain 0.35 × sin(xfade × π)) and inverts the stereo field at full throw."
      }
    ],
    manual: [
      {
        title: "overview",
        body: "Two synthesis voices — V and Z — blend together to build a polyphonic stereo oscillator. Each voice generates its own natural stereo spread internally. A crossfader sweeps between them with adjustable curve behavior."
      },
      {
        title: "signal flow",
        body: "Pitch in → per-voice tuning and drift → waveshaper → crossfade blend → soft clip and DC block → L/R outputs. V and Z run in parallel; when Z has no pitch input, it inherits V's pitch plus its semitone offset."
      },
      {
        title: "sync and crossfade",
        body: "Cross Sync locks Z's phase to V's cycle — classic hard sync. Reverse Sync flips Z's direction each cycle for a sweeping, reversing character. The two modes are mutually exclusive. Crossfade mode (set in the context menu) controls whether the blend is constant-loudness or swaps voices between channels."
      }
    ],
    suggestedPatches: [
      {
        id: "harmonic-stereo-drift",
        title: "harmonic stereo drift",
        description: "Two oscillator voices tuned a fifth apart, with a slow LFO sweeping the crossfade between them to animate the stereo field from V to Z and back.",
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
              { label: "V Coarse", value: "0" },
              { label: "Z Coarse", value: "+7" }
            ],
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "voct-z", label: "V/Oct Z", side: "left", offsetY: 110 },
              { id: "x-in",   label: "X Input",  side: "left", offsetY: 210 },
              { id: "left-out",  label: "Left Out",  side: "right", offsetY: 80 },
              { id: "right-out", label: "Right Out", side: "right", offsetY: 110 }
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
            id: "pitch-z",
            fromNode: "keyboard", fromPort: "voct-out",
            toNode: "clairaudient", toPort: "voct-z",
            color: "#5ec2ab"
          },
          {
            id: "lfo-x",
            fromNode: "lfo", fromPort: "out",
            toNode: "clairaudient", toPort: "x-in",
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
            instruction: "Connect your keyboard or sequencer's V/Oct output to V/Oct-V.",
            detail: "This sets the pitch of the V-side oscillator. Start with the V Coarse Freq knob at center (0 semitones).",
            cableIds: ["pitch-v"]
          },
          {
            instruction: "Connect the same V/Oct source to V/Oct-Z.",
            detail: "Both voices now track the same pitch. Set the Z Coarse Freq knob up to +7 semitones (a perfect fifth) for a harmonic relationship.",
            cableIds: ["pitch-z"]
          },
          {
            instruction: "Connect an LFO output to the X Input.",
            detail: "X controls the crossfade between V and Z. A slow sine or triangle LFO at 0.1–0.3 Hz makes the stereo image breathe between the two voices.",
            cableIds: ["lfo-x"]
          },
          {
            instruction: "Connect Left Out to the left channel of your mixer or interface.",
            detail: "The V-side voice is dominant on the left output when the crossfade favors V.",
            cableIds: ["audio-left"]
          },
          {
            instruction: "Connect Right Out to the right channel of your mixer or interface.",
            detail: "The Z-side voice is dominant on the right. Together the two outputs create a wide stereo field that drifts with the LFO.",
            cableIds: ["audio-right"]
          }
        ]
      },
      {
        id: "dissonant-drone",
        title: "dissonant drone",
        description: "A slow, evolving, and slightly dissonant drone using extreme cross-modulation.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "lfo-1",
            label: "LFO 1",
            sublabel: "Slow Triangle",
            x: 20, y: 55, width: 140, height: 100,
            ports: [
              { id: "out", label: "Out", side: "right", offsetY: 78, icon: "triangle" }
            ]
          },
          {
            id: "lfo-2",
            label: "LFO 2",
            sublabel: "Slow Sine",
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
              { label: "Rev. Sync", value: "ON" }
            ],
            ports: [
              { id: "v-shape-cv", label: "V Shape CV", side: "left", offsetY: 140 },
              { id: "z-shape-cv", label: "Z Shape CV", side: "left", offsetY: 170 },
              { id: "left-out",  label: "Left Out",  side: "right", offsetY: 80 },
              { id: "right-out", label: "Right Out", side: "right", offsetY: 110 }
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
            id: "lfo-v",
            fromNode: "lfo-1", fromPort: "out",
            toNode: "clairaudient", toPort: "v-shape-cv",
            color: "#a78bfa"
          },
          {
            id: "lfo-z",
            fromNode: "lfo-2", fromPort: "out",
            toNode: "clairaudient", toPort: "z-shape-cv",
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
            instruction: "Connect LFO 1 to the V Shape CV input.",
            detail: "This will slowly modulate the shape of the V oscillator. Set the V Shape Attenuverter to about 50%.",
            cableIds: ["lfo-v"]
          },
          {
            instruction: "Connect LFO 2 to the Z Shape CV input.",
            detail: "Use a different, very slow speed for LFO 2 to create complex polymetric motion between the voices.",
            cableIds: ["lfo-z"]
          },
          {
            instruction: "Connect Left Out and Right Out to your mixer.",
            detail: "Detune the oscillators slightly to introduce a slow beating effect across the stereo field.",
            cableIds: ["audio-left", "audio-right"]
          }
        ]
      },
      {
        id: "fm-bassline",
        title: "fm bassline",
        description: "A classic frequency modulated bass patch utilizing Clairaudient's complex cross-modulation.",
        difficulty: "intermediate",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "sequencer", label: "Sequencer", x: 20, y: 55, width: 140, height: 100,
            ports: [ { id: "cv", label: "Pitch CV", side: "right", offsetY: 78 } ]
          },
          {
            id: "clairaudient", label: "Clairaudient", x: 200, y: 20, width: 170, height: 240,
            ports: [
              { id: "voct-v", label: "V/Oct V", side: "left", offsetY: 80 },
              { id: "left-out", label: "Left Out", side: "right", offsetY: 80 }
            ]
          },
          {
            id: "mixer", label: "Mixer", x: 410, y: 55, width: 140, height: 110,
            ports: [ { id: "in", label: "Input", side: "left", offsetY: 76 } ]
          }
        ],
        cables: [
          { id: "seq-pitch", fromNode: "sequencer", fromPort: "cv", toNode: "clairaudient", toPort: "voct-v", color: "#5ec2ab" },
          { id: "audio-out", fromNode: "clairaudient", fromPort: "left-out", toNode: "mixer", toPort: "in", color: "#D7B56D" }
        ],
        steps: [
          { instruction: "Connect Sequencer Pitch CV to V/Oct V.", cableIds: ["seq-pitch"] },
          { instruction: "Connect Left Out to Mixer Input.", cableIds: ["audio-out"] }
        ]
      },
      {
        id: "vocal-formants",
        title: "vocal formants",
        description: "Modulating the shape parameters to synthesize vocal vowel-like textures.",
        difficulty: "advanced",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "lfo-fast", label: "Fast LFO", x: 20, y: 55, width: 140, height: 100,
            ports: [ { id: "out", label: "Out", side: "right", offsetY: 78, icon: "triangle" } ]
          },
          {
            id: "clairaudient", label: "Clairaudient", x: 200, y: 20, width: 170, height: 240,
            ports: [
              { id: "v-shape-cv", label: "V Shape CV", side: "left", offsetY: 140 },
              { id: "left-out", label: "Left Out", side: "right", offsetY: 80 }
            ]
          },
          {
            id: "mixer", label: "Mixer", x: 410, y: 55, width: 140, height: 110,
            ports: [ { id: "in", label: "Input", side: "left", offsetY: 76 } ]
          }
        ],
        cables: [
          { id: "lfo-shape", fromNode: "lfo-fast", fromPort: "out", toNode: "clairaudient", toPort: "v-shape-cv", color: "#a78bfa" },
          { id: "audio-out", fromNode: "clairaudient", fromPort: "left-out", toNode: "mixer", toPort: "in", color: "#D7B56D" }
        ],
        steps: [
          { instruction: "Connect Fast LFO to V Shape CV.", cableIds: ["lfo-shape"] },
          { instruction: "Connect Left Out to Mixer.", cableIds: ["audio-out"] }
        ]
      },
      {
        id: "self-patched-chaos",
        title: "self patched chaos",
        description: "A chaotic feedback loop utilizing the module's own outputs as modulation sources.",
        difficulty: "advanced",
        viewBox: "0 0 620 280",
        nodes: [
          {
            id: "clairaudient", label: "Clairaudient", x: 200, y: 20, width: 170, height: 240,
            ports: [
              { id: "v-shape-cv", label: "V Shape CV", side: "left", offsetY: 140 },
              { id: "right-out", label: "Right Out", side: "right", offsetY: 110 },
              { id: "left-out", label: "Left Out", side: "right", offsetY: 80 }
            ]
          },
          {
            id: "mixer", label: "Mixer", x: 410, y: 55, width: 140, height: 110,
            ports: [ { id: "in", label: "Input", side: "left", offsetY: 76 } ]
          }
        ],
        cables: [
          { id: "feedback", fromNode: "clairaudient", fromPort: "right-out", toNode: "clairaudient", toPort: "v-shape-cv", color: "#ec4899" },
          { id: "audio-out", fromNode: "clairaudient", fromPort: "left-out", toNode: "mixer", toPort: "in", color: "#D7B56D" }
        ],
        steps: [
          { instruction: "Patch Right Out back into V Shape CV for chaotic feedback.", cableIds: ["feedback"] },
          { instruction: "Connect Left Out to Mixer to hear the result.", cableIds: ["audio-out"] }
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
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack modules",
    status: "sequencer",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Sparkles,
    hp: 14,
    panelImage: {
      src: "/modules/transmutation/panel-source.png",
      width: 3256,
      height: 2060,
      alt: "transmutation hardware panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "concept overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      }
    ]
  },
  {
    slug: "chiaroscuro",
    name: "chiaroscuro",
    subtitle: "stereo vca with six-algorithm distortion engine, adaptive makeup gain, and sidechain input",
    summary: "Chiaroscuro shapes dynamics and harmonic character in a single module. A polyphonic VCA stages the signal before a six-algorithm distortion engine with adjustable depth, drive, and wet/dry control. Oversampled processing reduces aliasing artifacts, and automatic makeup gain compensates for level changes between algorithms. A sidechain input adds three trigger behaviors: enhancement, inverse ducking, or direct voltage control of distortion amount.",
    category: "vcv rack module",
    status: "vca + distortion",
    accent: "#D7B56D",
    accentSoft: "rgba(215, 181, 109, 0.2)",
    icon: SlidersHorizontal,
    hp: 12,
    panelImage: {
      src: "/modules/chiaroscuro/panel-source.png",
      width: 972,
      height: 2054,
      alt: "chiaroscuro vcv rack module panel"
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
          "shows the current VCA gain level including any CV — fully lit is 2× gain",
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
          "controls the output level before signal reaches the distortion engine — noon is unity gain",
          "set this around unity first, then use the VCA CV input for envelope-controlled dynamics",
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
          "selects the distortion algorithm: hard clip, tube sat, wave fold, bit crush, destroy, or ring mod",
          "transitions between types are crossfaded so switching won't cause clicks",
          "each algorithm responds differently to the Drive and Dist % settings — try them while listening",
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
          "controls how deeply the algorithm shapes the signal — at zero the distortion engine is bypassed",
          "most algorithms show their character before the knob reaches halfway",
          "works together with Drive: drive sets how hard the signal hits, dist % sets how far in it goes",
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
          "sets how hard the signal hits the distortion algorithm — higher values add harmonic complexity",
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
          "blends the clean signal with the distorted signal — fully left is dry, fully right is wet",
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
          "scales the CV going into dist % — noon is off, clockwise is positive, counter-clockwise inverts",
          "set this before the CV source to control how much modulation range you want",
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
          "scales the CV going into drive — noon is off, counter-clockwise inverts",
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
          "scales the CV going into mix — noon is off, counter-clockwise inverts the blend direction",
          "inverted with a gate envelope gives a ducking effect — distortion pulls back when the gate fires",
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
          "CV input for VCA gain — no attenuverter, so patch a full-range envelope directly",
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
          "CV input for the distortion type selector — 0–10V spans all six algorithm positions",
          "transitions are crossfaded so switching won't click; quantize to 6 steps for clean stepping from a sequencer",
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
          "the sidechain can trigger distortion, duck it, or replace the dist % knob entirely — set the mode in the context menu",
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
          "left audio input — polyphonic, each voice gets its own VCA and distortion processing",
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
          "right processed output — mirrors the left when link L/R is active",
          "use L and R together for a stereo insert on a bus or voice pair",
        ],
        tip: "use with audio-out-l for a stereo insert on a bus or voice pair.",
      },
    ],
    contextMenu: [
      {
        id: "oversample-1x",
        group: "oversampling",
        label: "1x (no oversampling)",
        kind: "choice",
        values: ["1x", "2x", "4x", "8x"],
        description: "The distortion engine runs at the system sample rate. CPU-efficient but may introduce aliasing with aggressive algorithms on low-frequency material. Useful for CPU-limited patches where audio artifacts are acceptable.",
      },
      {
        id: "oversample-2x",
        group: "oversampling",
        label: "2x",
        kind: "choice",
        values: ["1x", "2x", "4x", "8x"],
        description: "The engine runs at 2× the system sample rate, with a 3-pole anti-alias filter on the way back down. Reduces high-frequency fold-back artifacts at moderate CPU cost. A reasonable compromise for most patches.",
      },
      {
        id: "oversample-4x",
        group: "oversampling",
        label: "4x (default)",
        kind: "choice",
        values: ["1x", "2x", "4x", "8x"],
        description: "Default setting. The engine runs at 4× the system sample rate. Each output sample is the average of four oversampled results filtered by a 3-pole decimation cascade (cascaded one-pole low-passes at 0.45×, 0.41×, and 0.38× of the oversampled rate). Aliasing is well below audible thresholds for most algorithms and drive settings.",
      },
      {
        id: "oversample-8x",
        group: "oversampling",
        label: "8x (high quality)",
        kind: "choice",
        values: ["1x", "2x", "4x", "8x"],
        description: "Highest quality. The engine runs at 8× the sample rate with the same 3-pole decimation filter. Recommended for destroy, bit crush, and ring mod at high drive where aliasing is most audible. Significantly higher CPU cost — use when audio quality matters and headroom allows it.",
      },
      {
        id: "sidechain-enhancement",
        group: "sidechain mode",
        label: "enhancement (trigger)",
        kind: "choice",
        values: ["enhancement", "ducking", "direct"],
        description: "Sidechain signal triggers distortion intensity. When the sidechain is present, both distortion and drive scale up proportionally with the envelope follower level. Knob positions set the ceiling — a full sidechain signal reaches the knob value. Use to push into distortion on transients.",
      },
      {
        id: "sidechain-ducking",
        group: "sidechain mode",
        label: "ducking (inverse)",
        kind: "choice",
        values: ["enhancement", "ducking", "direct"],
        description: "Sidechain inversely controls distortion. When the sidechain is loud, distortion reduces. When it is quiet, the full Dist % and Drive apply. Useful for pumping effects or for keeping distortion down while a kick or snare is present.",
      },
      {
        id: "sidechain-direct",
        group: "sidechain mode",
        label: "direct control",
        kind: "choice",
        values: ["enhancement", "ducking", "direct"],
        description: "Sidechain envelope follower directly replaces the Dist % knob. The knob is bypassed — distortion amount is entirely set by the incoming sidechain level. Drive and Mix remain under manual and CV control. Use when you want an audio source or envelope to take full ownership of distortion depth.",
      },
    ],
    manual: [
      {
        title: "overview",
        body: "Chiaroscuro is a stereo VCA and distortion processor built for polyphonic use. Signal passes through a gain stage, then into a six-algorithm distortion engine with individual knobs for depth (Dist %), intensity (Drive), and parallel blend (Mix). An adaptive makeup gain stage compensates for loudness changes as you move between algorithms or adjust the wet/dry balance, so level-matching doesn't require manual gain compensation."
      },
      {
        title: "signal flow",
        body: "Audio in → VCA gain (with optional CV and linear/exponential response curve) → pre-gain scaling (drive-scaled into the algorithm) → distortion engine at 1×–8× oversample rate → 3-pole decimation filter → wet/dry blend → adaptive makeup gain → output soft clip (fastTanh at ±9.5V). The clean VCA signal runs in parallel through the wet/dry stage. Each polyphonic voice is processed through its own dedicated VCA and distortion engine instance."
      },
      {
        title: "sidechain and modulation",
        body: "The sidechain input feeds an envelope follower (10ms attack, 200ms release) whose output can trigger, duck, or directly replace the Dist % value — set via the context menu. All three main parameters (Dist %, Drive, Mix) accept CV through individual attenuverters that scale and invert the signal. The VCA CV input is unattenuated and polyphonic — each voice gets its own level independently."
      }
    ]
  },
  {
    slug: "evocation",
    name: "evocation",
    subtitle: "gesture envelope recorder with four independent polyphonic playback outputs and ADSR mode",
    summary: "Evocation records touch-strip gestures as envelopes and plays them back through four independent polyphonic voice engines. Each of the four outputs has its own speed, phase offset, loop toggle, and invert toggle, making it possible to run the same gesture as a layered texture, a rhythmic pump, or a slow evolving shape simultaneously. A second mode switches to ADSR, using the touch strip as a combined gate and stage parameter editor.",
    category: "vcv rack module",
    status: "gesture envelope",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Activity,
    hp: 20,
    panelImage: {
      src: "/modules/evocation/panel-source.png",
      width: 1626,
      height: 2056,
      alt: "evocation hardware panel"
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
          "the bottom of the strip is always 0V — start and end your gesture there for clean rest positions",
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
          "displays speed, duration, and phase offset at the top — a parameter banner appears when you adjust controls",
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
          "most of the knob travel covers fine 0–2× control — push past that for faster playback",
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
          "at 180° the output begins halfway through the gesture — useful for layered stagger effects",
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
        y: 27.7,
        size: 3.5,
        description: [
          "when on, the selected output restarts automatically at the end of each cycle — works like an LFO",
          "in ADSR mode, the loop waits for gate release before re-triggering",
          "each output has its own loop state — select the output with the Env buttons before toggling",
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
        y: 27.7,
        size: 3.5,
        description: [
          "flips the output voltage on the selected channel — a rising gesture becomes a falling one",
          "combine with loop for an inverted LFO shape from the same recorded gesture",
          "each output has its own invert state — select the output before toggling",
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
        x: 90.8,
        y: 13.3,
        size: 3.5,
        description: [
          "removes the silent pause at the start of your recorded gesture",
          "use this after recording if the envelope takes a moment before it starts moving",
        ],
        tip: ""
      },
      {
        id: "trim-tail",
        label: "trim tail",
        type: "switch",
        x: 90.8,
        y: 26.6,
        size: 3.5,
        description: [
          "removes the flat tail at the end of your recorded gesture",
          "use this after recording if you lifted your finger slowly and left a dead zone at the end",
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
          "fires alongside any connected gate or trigger CV — it won't interrupt those channels",
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
          "polyphonic — up to 16 channels, each voice runs independently through all four outputs",
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
          "fires a one-shot envelope each time it receives a trigger pulse — no hold, just start to end",
          "polyphonic — each of the 16 channels runs its own voice through all four outputs",
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
          "shifts where output 1 starts in the envelope, per voice — great for fan or stagger effects",
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
          "shifts where output 2 starts in the envelope, per voice — independent from output 1's phase CV",
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
          "shifts where output 3 starts in the envelope, per voice — independent from the other phase CVs",
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
          "shifts where output 4 starts in the envelope, per voice — independent from the other phase CVs",
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
          "fires a short pulse when envelope 1 completes a cycle — fires on every loop iteration too",
          "use this to chain modules, advance a sequence, or clock other envelopes in sync",
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
          "fires a short pulse when envelope 2 completes a cycle — polyphonic, one pulse per voice",
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
          "fires a short pulse when envelope 3 completes a cycle — polyphonic, one pulse per voice",
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
          "fires a short pulse when envelope 4 completes a cycle — polyphonic, one pulse per voice",
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
          "polyphonic — each voice has its own gate state",
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
          "stays high while envelope 2 is playing, drops to zero when it finishes — polyphonic",
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
          "stays high while envelope 3 is playing, drops to zero when it finishes — polyphonic",
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
          "stays high while envelope 4 is playing, drops to zero when it finishes — polyphonic",
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
          "polyphonic — up to 16 voices play simultaneously",
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
        description: "Envelope is drawn by touch. Press and drag the touch strip to record a custom shape up to 5 seconds long. The module samples at approximately 960 Hz with a 0.2% minimum Y-delta filter. On release, the recorded gesture plays through all four outputs at their individual speeds, phases, loop states, and invert states. Trim Lead and Trim Tail buttons remove silence from the start and end of the recording. Phase CV inputs add polyphonic per-voice phase offsets (0–10V = 0–360°, wrapping)."
      },
      {
        id: "mode-adsr",
        group: "mode",
        label: "adsr",
        kind: "choice",
        description: "Classic four-stage envelope with touch strip interaction. Use the Env 1–4 Select buttons to choose A/D/S/R stages. Speed knob sets time or level for the selected stage (Attack: 0.001–5.0s, Decay: 0.001–2.0s, Sustain: 0–1 level, Release: 0.001–5.0s). Phase knob sets contour shape (0=LOG, 0.5=LIN, 1=EXP). Touching the strip while Sustain is selected sets sustain level; touching while Release is selected edits release time and contour. Gate input tracks voice hold; Trigger input fires one-shot envelopes. Phase CV inputs in this mode add rhythmic delay offsets (quantized to 1/16 by default)."
      },
      {
        id: "theme-follow",
        group: "screen theme",
        label: "follow shared",
        kind: "choice",
        description: "The OLED display synchronizes its color palette with the global screen theme set in the Shapetaker plugin preferences. When other Shapetaker modules change their shared theme, Evocation updates automatically."
      },
      {
        id: "theme-phosphor",
        group: "screen theme",
        label: "phosphor",
        kind: "choice",
        description: "Sets the OLED to the Phosphor theme — bright green on black, evoking vintage monochrome CRT phosphor displays."
      },
      {
        id: "theme-ice",
        group: "screen theme",
        label: "ice",
        kind: "choice",
        description: "Sets the OLED to the Ice theme — cool cyan and blue-white tones."
      },
      {
        id: "theme-solar",
        group: "screen theme",
        label: "solar",
        kind: "choice",
        description: "Sets the OLED to the Solar theme — warm yellow-gold tones."
      },
      {
        id: "theme-amber",
        group: "screen theme",
        label: "amber",
        kind: "choice",
        description: "Sets the OLED to the Amber theme — deep amber on black, evoking vintage amber-phosphor terminal displays."
      },
      {
        id: "quantize-phase",
        group: "adsr phase",
        label: "quantize phase CV",
        kind: "toggle",
        description: "When enabled (default on), Phase CV inputs in ADSR mode are quantized to 1/16-note increments: the incoming voltage is floored to the nearest multiple of 1/16 (floor(cv × 16) / 16). This creates rhythmically-aligned staggered envelope entries across the four outputs rather than arbitrary fractional offsets — useful for polyrhythmic structures. Disable for continuous unquantized phase delay (useful when feeding slow LFO or per-voice portamento sources)."
      }
    ],
    manual: [
      {
        title: "overview",
        body: "Evocation is a dual-mode envelope generator built around a large vertical touch strip. In Gesture mode, you draw an envelope shape by dragging your finger on the strip; the module records the gesture at high resolution (up to 5 seconds, approximately 960 Hz sample rate), then plays it back through four independent output channels simultaneously. Each output has its own playback speed, phase offset, loop state, and invert state. The OLED display below the touch strip shows the envelope waveform, playback scanlines for active voices, and a parameter banner on any control interaction. In ADSR mode, the touch strip becomes a combined gate input and stage editor, while the Env 1–4 Select buttons select the A/D/S/R stages for parameter editing."
      },
      {
        title: "gesture recording and editing",
        body: "Press and drag on the touch strip to record. The module samples the Y position at approximately 960 Hz, applying a 0.2% minimum Y-delta filter that only records motion above the noise floor — flat sections are automatically skipped, keeping the stored envelope compact. The bottom 8% of the strip is a dead zone that always records as 0V, giving a reliable clean rest position at the bottom of gestures. Release the strip to end recording and begin playback across all four outputs. Use Trim Lead to remove leading silence (scans forward from the start, drops everything at or below 1% of full scale), and Trim Tail to remove trailing silence (scans backward from the end). Both buttons rescale the remaining envelope to fill the full 0–1 time range and update the stored duration proportionally."
      },
      {
        title: "four-output playback and signal flow",
        body: "All four outputs play the same recorded envelope simultaneously, each through its own independent playback engine. Use the Env 1–4 Select buttons to bring an output's parameters onto the controls: Speed sets playback rate (0–8×, non-linear — 70% of knob travel covers 0–2× for fine control, the remaining 30% covers 2–8×); Phase sets the starting offset (0–360°, wrapping); Loop restarts playback immediately at end of cycle; Invert flips the output voltage (10V minus original). Phase CV inputs add per-voice phase offsets (0–10V = 0–360°). In ADSR mode, Phase CV adds quantized delay offsets (1/16-note increments by default; disable via context menu). Trigger input fires one-shot envelopes per polyphonic voice channel; Gate input holds sustain in ADSR mode or controls the release fade in Gesture mode (exponential decay, 8–35ms). EOC outputs fire a 1ms pulse at end of each cycle; Gate outputs remain high while the envelope is active."
      }
    ]
  },
  {
    slug: "involution",
    hidden: true,
    name: "involution",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
    status: "filter",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Filter,
    hp: 12,
    panelImage: {
      src: "/modules/involution/panel-source.png",
      width: 1474,
      height: 2070,
      alt: "involution hardware panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "concept overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      }
    ]
  },
  {
    slug: "specula",
    hidden: true,
    name: "specula",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
    status: "vu meter",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Gauge,
    hp: 4,
    panelImage: {
      src: "/modules/specula/panel-source.png",
      width: 818,
      height: 2072,
      alt: "specula module panel art"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "concept overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      }
    ]
  },
  {
    slug: "incantation",
    hidden: true,
    name: "incantation",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
    status: "resonant filter bank",
    accent: "#5ec2ab",
    accentSoft: "rgba(94, 194, 171, 0.2)",
    icon: Layers,
    hp: 14,
    panelImage: {
      src: "/modules/incantation/panel-source.png",
      width: 1540,
      height: 2062,
      alt: "incantation hardware panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "concept overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      }
    ]
  },
  {
    slug: "torsion",
    hidden: true,
    name: "torsion",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
    status: "phase distortion oscillator",
    accent: "#cf8e5c",
    accentSoft: "rgba(207, 142, 92, 0.2)",
    icon: Waves,
    hp: 14,
    panelImage: {
      src: "/modules/torsion/torsion.png",
      width: 1458,
      height: 2056,
      alt: "torsion hardware panel"
    },
    media: {},
    controls: [],
    manual: [
      {
        title: "concept overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      }
    ]
  },
  {
    slug: "reverie",
    hidden: true,
    name: "reverie",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    category: "vcv rack module",
    status: "reverb",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Sparkles,
    hp: 14,
    panelImage: {
      src: "/modules/reverie/panel-source.png",
      width: 1458,
      height: 2056,
      alt: "reverie hardware panel"
    },
    media: {},
    controls: [],
    manual: []
  },
  {
    slug: "tessellation",
    hidden: true,
    name: "tessellation",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    category: "vcv rack module",
    status: "triple delay",
    accent: "#8c7aa3",
    accentSoft: "rgba(140, 122, 163, 0.2)",
    icon: Layers,
    hp: 14,
    panelImage: {
      src: "/modules/tessellation/panel-source.png",
      width: 1458,
      height: 2056,
      alt: "tessellation hardware panel"
    },
    media: {},
    controls: [],
    manual: []
  }
];

export const stackHighlights = [
  {
    title: "static-friendly",
    description: "builds to exportable files for conventional hosting while staying react-driven during development.",
    icon: Cable
  },
  {
    title: "manual-first",
    description: "module pages are data-driven now and can move to mdx content files when the manuals grow.",
    icon: Gauge
  },
  {
    title: "interactive",
    description: "panel controls expose hover, focus, and click states for polished module explanations.",
    icon: Sparkles
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
