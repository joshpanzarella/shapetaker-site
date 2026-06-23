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
    audioDemos?: { title: string; src: string; description?: string }[];
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
        description: "Teal LED tracking effective VCA gain including CV. Brightness follows a square-root curve for better visibility at low values. Fully lit means maximum gain (2×).",
        tip: "watch this while patching VCA CV to confirm modulation is reaching the gain stage.",
      },
      {
        id: "dist-led",
        label: "distortion indicator",
        type: "meter",
        x: 85.3,
        y: 14.8,
        size: 9,
        description: "RGB LED whose color codes the active distortion algorithm and whose brightness reflects the combined product of Dist %, Drive, and Mix. Dim at rest, bright under heavy processing.",
        tip: "a quick visual read of how aggressively the signal is being shaped — the color shifts when you move the type selector.",
        diagrams: [
          { id: "led-hard-clip",   label: "hard clip — teal",          svg: '<circle cx="12" cy="12" r="9" fill="#0d3330"/><circle cx="12" cy="12" r="5" fill="#176155"/>' },
          { id: "led-tube-sat",    label: "tube sat — aqua",           svg: '<circle cx="12" cy="12" r="9" fill="#0d3333"/><circle cx="12" cy="12" r="5" fill="#156060"/>' },
          { id: "led-wave-fold",   label: "wave fold — cyan blue",     svg: '<circle cx="12" cy="12" r="9" fill="#0d1f3a"/><circle cx="12" cy="12" r="5" fill="#1a3d72"/>' },
          { id: "led-bit-crush",   label: "bit crush — deep blue",     svg: '<circle cx="12" cy="12" r="9" fill="#0a1232"/><circle cx="12" cy="12" r="5" fill="#152472"/>' },
          { id: "led-destroy",     label: "destroy — violet",          svg: '<circle cx="12" cy="12" r="9" fill="#160d35"/><circle cx="12" cy="12" r="5" fill="#2e1572"/>' },
          { id: "led-ring-mod",    label: "ring mod — magenta purple", svg: '<circle cx="12" cy="12" r="9" fill="#1a0a32"/><circle cx="12" cy="12" r="5" fill="#481272"/>' },
        ],
      },
      {
        id: "vca-knob",
        label: "vca gain",
        type: "knob",
        x: 50.4,
        y: 15.9,
        size: 22,
        description: "Primary gain control for the VCA stage. Signal passes through this before the distortion engine. Range is 0–2×, so noon is unity gain. Supports polyphonic CV at the VCA CV input — each cable channel controls its corresponding voice independently. At high gains with a hot input, the module adds subtle drive-like coloring.",
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
        description: "Six-position blade selector that chooses the distortion algorithm. Positions: hard clip, tube saturation, wave fold, bit crush, destroy, ring modulation. The dist LED color codes the active algorithm. Transitions between types are cross-faded over ~12ms to avoid clicks. The Type CV input allows voltage-controlled selection.",
        tip: "move this while listening — each algorithm responds differently to the Drive and Dist % settings.",
        diagrams: [
          { id: "type-hard-clip", label: "hard clip",       icon: "Minus",     rotation: -135 },
          { id: "type-tube-sat",  label: "tube saturation", icon: "Activity",  rotation: -81 },
          { id: "type-wave-fold", label: "wave fold",       icon: "Waves",     rotation: -27 },
          { id: "type-bit-crush", label: "bit crush",       icon: "Grid3x3",   rotation: 27 },
          { id: "type-destroy",   label: "destroy",         icon: "Zap",       rotation: 81 },
          { id: "type-ring-mod",  label: "ring modulation", icon: "RefreshCw", rotation: 135 },
        ],
      },
      {
        id: "link-lr",
        label: "link l/r",
        type: "switch",
        x: 15.4,
        y: 27.9,
        size: 10,
        description: "When engaged, the right audio input mirrors the left — both channels receive the same source. Both outputs carry independently processed versions of the same mono input. Use this when processing a single source and sending the output to two destinations.",
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
        description: "Switches the VCA gain curve between linear and exponential. Linear maps CV voltage directly to gain — equal voltage steps produce equal gain steps. Exponential squares the gain value, following perceptual loudness more closely and making fader-style control feel more natural.",
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
        description: "Sets how deeply the selected algorithm shapes the signal. At zero the distortion engine is bypassed entirely. As the value increases, the algorithm progressively sculpts the waveform. Works alongside Drive — Drive sets how hard the signal hits, Dist % sets how far into the algorithm it goes.",
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
        description: "Controls how hard the signal hits the distortion stage by scaling pre-gain before the algorithm. Higher values add harmonic complexity without changing the wet/dry ratio. Drive scales with Dist % internally — Drive at maximum with Dist % at zero has no audible effect.",
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
        description: "Blends the clean VCA signal with the processed wet path. At minimum only the clean signal passes; at maximum only the distorted signal is heard. Adaptive makeup gain automatically tracks the clean-to-wet level ratio and compensates to keep perceived loudness consistent as you move this control.",
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
        description: "Scales and optionally inverts the CV patched into Dist CV. Center (noon) is zero — no CV influence. Clockwise adds positive scaling; counter-clockwise inverts. Allows any CV range to map cleanly to the Dist % parameter without external attenuation.",
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
        description: "Scales and optionally inverts the CV patched into Drive CV. Controls pre-gain into the distortion algorithm. Modulating drive with an envelope or LFO creates expressive dynamics on the harmonic character.",
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
        description: "Scales and optionally inverts the CV patched into Mix CV. Controls the wet/dry blend. Inverse scaling (counter-clockwise) with a sidechain envelope gives a ducking-style blend on the distortion.",
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
        description: "CV input for the Dist % parameter, scaled by the Dist CV attenuverter. Expects modular-level CV (±5V or 0–10V). Patch an envelope here to tie distortion depth to dynamics, or an LFO for evolving texture.",
        tip: "a slow envelope with moderate attenuverter scaling pushes into distortion only at note peaks.",
      },
      {
        id: "drive-cv",
        label: "drive cv",
        type: "jack",
        x: 50.4,
        y: 69.0,
        size: 10,
        description: "CV input for the Drive parameter, scaled by the Drive CV attenuverter. Controls pre-gain into the distortion algorithm. A fast envelope here adds harmonic punch on transients without affecting steady-state character.",
        tip: "with the drive attenuverter at a low setting, transients hit the algorithm harder than the sustain.",
      },
      {
        id: "mix-cv",
        label: "mix cv",
        type: "jack",
        x: 83.2,
        y: 69.0,
        size: 10,
        description: "CV input for the Mix parameter, scaled by the Mix CV attenuverter. Controls the wet/dry blend in real time. Patch a slow envelope or LFO here to fade in and out of the distorted signal dynamically.",
        tip: "a rising envelope brings in distortion gradually over the course of a note.",
      },
      {
        id: "vca-cv",
        label: "vca cv",
        type: "jack",
        x: 17.5,
        y: 79.0,
        size: 10,
        description: "CV input for the VCA gain stage. A ±10V range maps to the full 0–2× gain window. Unlike the other CV inputs there is no attenuverter — patch a full-range envelope directly. Supports polyphony: each cable channel modulates its corresponding audio voice independently.",
        tip: "patch directly from an ADSR envelope without attenuation for standard VCA dynamics.",
      },
      {
        id: "type-cv",
        label: "dist type cv",
        type: "jack",
        x: 50.4,
        y: 79.0,
        size: 10,
        description: "CV input for the Dist Type selector. A 0–10V range spans all six algorithm positions (~1.67V per step). Transitions between types are cross-faded to avoid clicks, allowing smooth or stepped voltage-controlled algorithm selection.",
        tip: "quantize to 6 steps for clean algorithm switching from a sequencer.",
      },
      {
        id: "sidechain",
        label: "sidechain detect",
        type: "jack",
        x: 83.2,
        y: 79.0,
        size: 10,
        description: "Sidechain audio input for the envelope follower (10ms attack, 200ms release). The detected level modulates the distortion path according to the active sidechain mode selected in the context menu: enhancement, ducking, or direct control. Operates independently of the main audio path.",
        tip: "patch a kick drum or submix send here to trigger or duck distortion in sync with the rest of the mix.",
      },
      {
        id: "audio-in-l",
        label: "audio in L",
        type: "jack",
        x: 17.5,
        y: 89.1,
        size: 10,
        description: "Left audio input. Supports polyphonic cables — each channel is processed through its own VCA gain and distortion voice independently. When Link L/R is active, this input feeds both processing channels.",
        tip: "patch a polyphonic oscillator here for per-voice independent processing.",
      },
      {
        id: "audio-in-r",
        label: "audio in R",
        type: "jack",
        x: 39.4,
        y: 89.1,
        size: 10,
        description: "Right audio input for true stereo processing. When unpatched with Link L/R off, the right channel mirrors the left. When patched, the two channels process independently through separate distortion engine instances.",
        tip: "patch a second signal here for independent stereo processing of two different sources.",
      },
      {
        id: "audio-out-l",
        label: "audio out L",
        type: "jack",
        x: 61.3,
        y: 89.1,
        size: 10,
        description: "Left processed audio output. Carries the signal after VCA, distortion, wet/dry blend, adaptive makeup gain, output soft clip, and type transition crossfade. Polyphonic when the input is polyphonic.",
        tip: "follow with a stereo mixer or panner to position the output in the mix.",
      },
      {
        id: "audio-out-r",
        label: "audio out R",
        type: "jack",
        x: 83.2,
        y: 89.1,
        size: 10,
        description: "Right processed audio output. Mirrors the left when Link L/R is active. When the right input is patched and Link L/R is off, this carries the independently processed right channel.",
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
