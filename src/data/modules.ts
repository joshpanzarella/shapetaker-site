import { Activity, AudioLines, Cable, Gauge, SlidersHorizontal, Sparkles, Filter, Layers, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Hotspot = {
  id: string;
  label: string;
  type: "knob" | "switch" | "jack" | "meter";
  x: number;
  y: number;
  size: number;
  description: string;
  tip: string;
  diagrams?: Array<{
    id: string;
    label: string;
    icon?: string;
    svg?: string;
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
    audio?: string;
    video?: string;
  };
  suggestedPatches?: SuggestedPatch[];
};

export type ModuleExplorerData = Pick<
  ModuleSpec,
  "name" | "accent" | "controls" | "panelImage" | "contextMenu" | "subtitle" | "summary" | "status"
>;

export const modules: ModuleSpec[] = [
  {
    slug: "clairaudient",
    name: "clairaudient",
    subtitle: "A stereo virtual analog sigmoid wave oscillator with crossfading and wave shape modulation for subtle, discordant timbre shifts. Perfect for your next séance.",
    summary: "Unveil hidden sonic dimensions with Clairaudient. This dual-voice oscillator weaves intricate stereo textures through sigmoid wave shaping and cross-modulation. Whether you seek crystalline chimes, spectral drones, or untamed chaos, Clairaudient acts as your vessel to the unknown, blurring the line between analog warmth and ethereal discord.",
    category: "vcv rack modules",
    status: "stereo oscillator",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: AudioLines,
    hp: 10,
    panelImage: {
      src: "/modules/clairaudient/panel-source.png",
      width: 1268,
      height: 2014,
      alt: "clairaudient vcv rack module panel"
    },
    media: { audio: "/modules/clairaudient/demo.mp3" },
    controls: [
      {
        id: "scope",
        label: "scope",
        type: "meter",
        x: 50,
        y: 20,
        size: 32,
        description: "central oscilloscope display for visualizing the relationship between the two signal paths.",
        tip: "use the display to tune motion, sync, and crossfade behavior by eye while listening.",
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
        label: "v coarse freq",
        type: "knob",
        x: 14.7,
        y: 17.2,
        size: 16,
        description: "coarse frequency control for the v side of the module.",
        tip: "start here when tuning the left-side oscillator or processor voice.",
        diagrams: [
          { id: "v-freq--2", label: "-2 octaves", icon: "ChevronsDown", rotation: -135 },
          { id: "v-freq--1", label: "-1 octave", icon: "ChevronDown", rotation: -67.5 },
          { id: "v-freq-0", label: "0 octaves", icon: "Minus", rotation: 0 },
          { id: "v-freq-+1", label: "+1 octave", icon: "ChevronUp", rotation: 67.5 },
          { id: "v-freq-+2", label: "+2 octaves", icon: "ChevronsUp", rotation: 135 }
        ]
      },
      {
        id: "z-frequency",
        label: "z coarse freq",
        type: "knob",
        x: 85.3,
        y: 17.2,
        size: 16,
        description: "coarse frequency control for the z side of the module.",
        tip: "tune this against the v side before adjusting fine or sync behavior.",
        diagrams: [
          { id: "z-freq--24", label: "-24 semitones", icon: "ChevronsDown", rotation: -135 },
          { id: "z-freq--12", label: "-12 semitones", icon: "ChevronDown", rotation: -67.5 },
          { id: "z-freq-0", label: "0 semitones", icon: "Minus", rotation: 0 },
          { id: "z-freq-+12", label: "+12 semitones", icon: "ChevronUp", rotation: 67.5 },
          { id: "z-freq-+24", label: "+24 semitones", icon: "ChevronsUp", rotation: 135 }
        ]
      },
      {
        id: "v-fine",
        label: "v fine tune",
        type: "knob",
        x: 23,
        y: 34.6,
        size: 12,
        description: "fine frequency control for the v side.",
        tip: "use small movements here after the coarse v frequency is close.",
        diagrams: [
          { id: "v-fine-flat", label: "flat (-50 cents)", icon: "Minus", rotation: -135 },
          { id: "v-fine-center", label: "center (0 cents)", icon: "Circle", rotation: 0 },
          { id: "v-fine-sharp", label: "sharp (+50 cents)", icon: "Plus", rotation: 135 }
        ]
      },
      {
        id: "z-fine",
        label: "z fine tune",
        type: "knob",
        x: 77,
        y: 34.6,
        size: 12,
        description: "fine frequency control for the z side.",
        tip: "use this to dial close intervals or beating against the v side.",
        diagrams: [
          { id: "z-fine-flat", label: "flat (-50 cents)", icon: "Minus", rotation: -135 },
          { id: "z-fine-center", label: "center (0 cents)", icon: "Circle", rotation: 0 },
          { id: "z-fine-sharp", label: "sharp (+50 cents)", icon: "Plus", rotation: 135 }
        ]
      },
      {
        id: "xsync",
        label: "cross sync",
        type: "switch",
        x: 30,
        y: 52.4,
        size: 9,
        description: "sync mode switch for the v side.",
        tip: "toggle this while watching the display to hear and see the sync relationship change.",
        diagrams: [
          {
            id: "xsync-down",
            label: "free running",
            icon: "Unlink",
            state: "down"
          },
          {
            id: "xsync-up",
            label: "hard sync",
            icon: "Link",
            state: "up"
          }
        ]
      },
      {
        id: "reverse-sync",
        label: "reverse sync",
        type: "switch",
        x: 70,
        y: 52.4,
        size: 9,
        description: "reverse sync mode switch for the z side.",
        tip: "use it with xsync for more aggressive locked motion.",
        diagrams: [
          {
            id: "rev-down",
            label: "forward sync",
            icon: "ArrowRight",
            state: "down"
          },
          {
            id: "rev-up",
            label: "reverse sync",
            icon: "ArrowLeft",
            state: "up"
          }
        ]
      },
      {
        id: "xfade",
        label: "crossfade",
        type: "knob",
        x: 50,
        y: 45.4,
        size: 17,
        description: "The crossfade circuit routes the V and Z signal paths to the outputs based on the 'crossfade curve' context menu setting. In 'equal-power' mode, it blends the signals using a constant-power trigonometric curve to prevent volume dips at the center position. In 'stereo swap' mode, the knob behaves as a dual panner: at minimum, V is panned left and Z is right; at center, both are mixed equally; at maximum, the stereo image inverts (V right, Z left). This enables complex spatial manipulation when modulated via CV.",
        tip: "animate this control when you want the output to move between v and z behavior.",
        diagrams: [
          {
            id: "v-side",
            label: "v signal",
            svg: '<path d="M5 4 L12 20 L19 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            rotation: -135
          },
          {
            id: "v-z-blend",
            label: "v + z blend",
            svg: '<path d="M6 18 L18 6 M6 6 L18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            rotation: 0
          },
          {
            id: "z-side",
            label: "z signal",
            svg: '<path d="M4 4 H20 L4 20 H20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            rotation: 135
          }
        ]
      },

      {
        id: "v-shape",
        label: "v shape",
        type: "knob",
        x: 13.1,
        y: 63.3,
        size: 13,
        description: "main shape control for the v side.",
        tip: "use this as the primary tone-shaping control for the left signal path.",
        diagrams: [
          {
            id: "sawtooth",
            label: "sawtooth wave",
            icon: "Activity",
            rotation: -135
          },
          {
            id: "sigmoid",
            label: "sigmoid",
            icon: "Spline",
            rotation: 0
          },
          {
            id: "square",
            label: "square wave",
            icon: "Square",
            rotation: 135
          }
        ]
      },
      {
        id: "z-shape",
        label: "z shape",
        type: "knob",
        x: 87,
        y: 63.3,
        size: 13,
        description: "main shape control for the z side.",
        tip: "use this as the primary tone-shaping control for the right signal path.",
        diagrams: [
          {
            id: "sawtooth",
            label: "sawtooth wave",
            icon: "Activity",
            rotation: -135
          },
          {
            id: "sigmoid",
            label: "sigmoid",
            icon: "Spline",
            rotation: 0
          },
          {
            id: "square",
            label: "square wave",
            icon: "Square",
            rotation: 135
          }
        ]
      },
      {
        id: "v-fine-tune-cv",
        label: "v fine tune cv",
        type: "knob",
        x: 13.2,
        y: 45.5,
        size: 10,
        description: "cv amount control for v-side fine tune modulation.",
        tip: "set this around center for subtle movement, then increase for more animated pitch changes."
      },
      {
        id: "z-fine-tune-cv",
        label: "z fine tune cv",
        type: "knob",
        x: 87,
        y: 45.5,
        size: 10,
        description: "cv amount control for z-side fine tune modulation.",
        tip: "use this to scale how strongly incoming modulation affects the z fine tune control."
      },
      {
        id: "x-shape-cv",
        label: "crossfade attenuverter",
        type: "knob",
        x: 50,
        y: 59.8,
        size: 10,
        description: "cv amount control for the central x shape input.",
        tip: "patch modulation into x, then trim the amount here."
      },
      {
        id: "x-input",
        label: "crossfade attenuverter",
        type: "jack",
        x: 50,
        y: 69,
        size: 8,
        description: "central x patch point.",
        tip: "use this jack with the central controls to patch the cross modulation path."
      },
      {
        id: "v-shape-cv",
        label: "v shape attenuverter",
        type: "knob",
        x: 31.5,
        y: 69.2,
        size: 10,
        description: "cv amount control for v-side shape modulation.",
        tip: "patch modulation into the v shape input, then use this control to set the modulation depth."
      },
      {
        id: "z-shape-cv",
        label: "z shape attenuverter",
        type: "knob",
        x: 68.5,
        y: 69.2,
        size: 10,
        description: "cv amount control for z-side shape modulation.",
        tip: "patch modulation into the z shape input, then use this control to set the modulation depth."
      },
      {
        id: "v-voct-a",
        label: "V - v/oct in",
        type: "jack",
        x: 20.5,
        y: 78.6,
        size: 8,
        description: "pitch cv input for the v side.",
        tip: "patch sequencer pitch or keyboard cv here."
      },
      {
        id: "v-voct-b",
        label: "Z - v/oct in",
        type: "jack",
        x: 20.5,
        y: 89,
        size: 8,
        description: "second pitch cv input for the v side.",
        tip: "use the second input when stacking or combining pitch sources."
      },
      {
        id: "v-fine-cv-a",
        label: "fine cv",
        type: "jack",
        x: 40.2,
        y: 78.6,
        size: 8,
        description: "fine modulation input for the v side.",
        tip: "patch small pitch movements, vibrato, or slow drift here."
      },
      {
        id: "v-fine-cv-b",
        label: "fine cv",
        type: "jack",
        x: 40.2,
        y: 89,
        size: 8,
        description: "second fine modulation input for the v side.",
        tip: "use this for an additional fine-control modulation source."
      },
      {
        id: "shape-cv-a",
        label: "shape cv",
        type: "jack",
        x: 60,
        y: 78.6,
        size: 8,
        description: "shape modulation input.",
        tip: "patch envelopes or lfos here to animate timbre."
      },
      {
        id: "shape-cv-b",
        label: "shape cv",
        type: "jack",
        x: 60,
        y: 89,
        size: 8,
        description: "second shape modulation input.",
        tip: "use this for a second modulation lane into shape."
      },
      {
        id: "left-output",
        label: "left",
        type: "jack",
        x: 79.7,
        y: 78.6,
        size: 8,
        description: "left audio output.",
        tip: "patch this to the left channel of a mixer or stereo path."
      },
      {
        id: "right-output",
        label: "right",
        type: "jack",
        x: 79.7,
        y: 89,
        size: 8,
        description: "right audio output.",
        tip: "patch this to the right channel of a mixer or stereo path."
      }
    ],
    contextMenu: [
      {
        id: "v-oscillator-quantized",
        group: "settings",
        label: "v oscillator quantized",
        kind: "toggle",
        description:
          "sets whether the v oscillator coarse frequency control snaps to quantized pitch steps."
      },
      {
        id: "z-oscillator-quantized",
        group: "settings",
        label: "z oscillator quantized",
        kind: "toggle",
        description:
          "sets whether the z oscillator coarse frequency control snaps to quantized pitch steps."
      },
      {
        id: "oscilloscope-theme",
        group: "settings",
        label: "oscilloscope theme",
        kind: "choice",
        values: ["phosphor", "ice", "solar", "amber"],
        description:
          "changes the visual theme of the central oscilloscope display without changing the audio path."
      },
      {
        id: "oscillator-noise",
        group: "oscillator noise",
        label: "noise",
        kind: "slider",
        description:
          "adds oscillator noise and microscopic phase jitter for a gritty, hardware-like noise floor."
      },
      {
        id: "drift",
        group: "organic drift",
        label: "drift",
        kind: "slider",
        description:
          "introduces slow pitch wandering to simulate vintage temperature instability."
      },
      {
        id: "drift-cohesion",
        group: "organic drift",
        label: "drift cohesion",
        kind: "slider",
        description:
          "controls whether polyphonic voices drift independently or move together like a shared power supply sag."
      },
      {
        id: "voice-character",
        group: "component tolerances",
        label: "voice character",
        kind: "slider",
        description:
          "adds stable per-voice differences in pitch, shape, level, and panning so each voice has its own character."
      },
      {
        id: "output-color",
        group: "analog glue",
        label: "output color",
        kind: "slider",
        description:
          "adds subtle bus coloration and stereo crosstalk to glue the oscillators together at the output."
      },
      {
        id: "high-cut-enabled",
        group: "tone options",
        label: "high cut enabled",
        kind: "toggle",
        description:
          "engages a gentle high-cut filter to soften harsh digital highs."
      },
      {
        id: "oversampling",
        group: "tone options",
        label: "oversampling",
        kind: "choice",
        values: ["1x off", "2x", "4x", "8x"],
        description:
          "selects the oversampling factor used to reduce aliasing during extreme shape modulation or sync."
      },
      {
        id: "waveform-mode",
        group: "waveform mode",
        label: "waveform mode",
        kind: "choice",
        values: ["sigmoid saw", "pwm"],
        description:
          "chooses between the sigmoid saw topology and pulse-width modulation behavior for the oscillator shapes."
      },
      {
        id: "crossfade-curve",
        group: "crossfade curve",
        label: "crossfade curve",
        kind: "choice",
        values: ["equal-power", "stereo swap"],
        description:
          "sets whether the crossfader behaves as an equal-power blend or a wide stereo swap between v and z."
      }
    ],
    manual: [
      {
        title: "overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      },
      {
        title: "controls",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      },
      {
        title: "patch ideas",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
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
    ]
  },
  {
    slug: "transmutation",
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
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
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
        id: "tone",
        label: "tone",
        type: "knob",
        x: 35,
        y: 23,
        size: 18,
        description: "shapes the broad spectral tilt before the character stage.",
        tip: "use lower settings for softened edges and higher settings for a more forward top end."
      },
      {
        id: "gain",
        label: "gain",
        type: "knob",
        x: 50,
        y: 16,
        size: 18,
        description: "sets the intensity of the module's coloration circuit.",
        tip: "small moves are useful for glue. larger moves push the voice into a designed texture."
      },
      {
        id: "motion",
        label: "motion",
        type: "knob",
        x: 50,
        y: 47,
        size: 20,
        description: "introduces slow internal movement around the selected tone.",
        tip: "patch cv here when you want the effect to breathe with a sequence or envelope."
      },
      {
        id: "cv",
        label: "cv",
        type: "jack",
        x: 30,
        y: 72,
        size: 13,
        description: "control input for the main motion circuit.",
        tip: "expected range is designed for modular levels. attenuate hot modulation at the source."
      },
      {
        id: "input",
        label: "in",
        type: "jack",
        x: 50,
        y: 72,
        size: 13,
        description: "primary audio input.",
        tip: "works best when fed a healthy but unclipped voice."
      },
      {
        id: "output",
        label: "out",
        type: "jack",
        x: 70,
        y: 72,
        size: 13,
        description: "processed audio output.",
        tip: "follow with a vca or mixer channel when using the module as a color insert."
      }
    ],
    manual: [
      {
        title: "overview",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      },
      {
        title: "signal flow",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      },
      {
        title: "patch ideas",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar, elit nec luctus dapibus, lacus magna fringilla risus, id malesuada sem ante non mauris. Phasellus tristique hendrerit quam, eget rhoncus ligula dignissim a. Vestibulum suscipit nunc elit, sit amet accumsan neque vehicula et."
      }
    ]
  },
  {
    slug: "evocation",
    name: "evocation",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
    status: "gesture envelope",
    accent: "#68B7C8",
    accentSoft: "rgba(104, 183, 200, 0.2)",
    icon: Activity,
    hp: 14,
    panelImage: {
      src: "/modules/evocation/panel-source.png",
      width: 1626,
      height: 2056,
      alt: "evocation hardware panel"
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
    slug: "involution",
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

export function getModule(slug: string) {
  return modules.find((module) => module.slug === slug);
}

export function getModuleExplorerData(module: ModuleSpec): ModuleExplorerData {
  return {
    name: module.name,
    accent: module.accent,
    panelImage: module.panelImage,
    contextMenu: module.contextMenu,
    controls: module.controls,
    subtitle: module.subtitle,
    summary: module.summary,
    status: module.status
  };
}
