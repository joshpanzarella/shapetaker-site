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
};

export type ModuleExplorerData = Pick<
  ModuleSpec,
  "name" | "accent" | "controls" | "panelImage" | "contextMenu"
>;

export const modules: ModuleSpec[] = [
  {
    slug: "clairaudient",
    name: "clairaudient",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
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
    media: {},
    controls: [
      {
        id: "scope",
        label: "scope",
        type: "meter",
        x: 50,
        y: 20,
        size: 32,
        description: "central oscilloscope display for visualizing the relationship between the two signal paths.",
        tip: "use the display to tune motion, sync, and crossfade behavior by eye while listening."
      },
      {
        id: "v-frequency",
        label: "v freq",
        type: "knob",
        x: 14.7,
        y: 17.2,
        size: 16,
        description: "coarse frequency control for the v side of the module.",
        tip: "start here when tuning the left-side oscillator or processor voice."
      },
      {
        id: "z-frequency",
        label: "z freq",
        type: "knob",
        x: 85.3,
        y: 17.2,
        size: 16,
        description: "coarse frequency control for the z side of the module.",
        tip: "tune this against the v side before adjusting fine or sync behavior."
      },
      {
        id: "v-fine",
        label: "v fine",
        type: "knob",
        x: 23,
        y: 34.6,
        size: 12,
        description: "fine frequency control for the v side.",
        tip: "use small movements here after the coarse v frequency is close."
      },
      {
        id: "z-fine",
        label: "z fine",
        type: "knob",
        x: 77,
        y: 34.6,
        size: 12,
        description: "fine frequency control for the z side.",
        tip: "use this to dial close intervals or beating against the v side."
      },
      {
        id: "xsync",
        label: "xsync",
        type: "switch",
        x: 30,
        y: 52.4,
        size: 9,
        description: "sync mode switch for the v side.",
        tip: "toggle this while watching the display to hear and see the sync relationship change."
      },
      {
        id: "reverse-sync",
        label: "rev sync",
        type: "switch",
        x: 70,
        y: 52.4,
        size: 9,
        description: "reverse sync mode switch for the z side.",
        tip: "use it with xsync for more aggressive locked motion."
      },
      {
        id: "xfade",
        label: "xfade",
        type: "knob",
        x: 50,
        y: 45.4,
        size: 17,
        description: "crossfades between the two sides of the module.",
        tip: "animate this control when you want the output to move between v and z behavior."
      },
      {
        id: "v-shape",
        label: "v shape",
        type: "knob",
        x: 13.1,
        y: 63.3,
        size: 13,
        description: "main shape control for the v side.",
        tip: "use this as the primary tone-shaping control for the left signal path."
      },
      {
        id: "z-shape",
        label: "z shape",
        type: "knob",
        x: 87,
        y: 63.3,
        size: 13,
        description: "main shape control for the z side.",
        tip: "use this as the primary tone-shaping control for the right signal path."
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
        label: "x shape cv",
        type: "knob",
        x: 50,
        y: 59.8,
        size: 10,
        description: "cv amount control for the central x shape input.",
        tip: "patch modulation into x, then trim the amount here."
      },
      {
        id: "x-input",
        label: "x",
        type: "jack",
        x: 50,
        y: 68.8,
        size: 8,
        description: "central x patch point.",
        tip: "use this jack with the central controls to patch the cross modulation path."
      },
      {
        id: "v-shape-cv",
        label: "v shape cv",
        type: "knob",
        x: 31.5,
        y: 69.2,
        size: 10,
        description: "cv amount control for v-side shape modulation.",
        tip: "patch modulation into the v shape input, then use this control to set the modulation depth."
      },
      {
        id: "z-shape-cv",
        label: "z shape cv",
        type: "knob",
        x: 68.5,
        y: 69.2,
        size: 10,
        description: "cv amount control for z-side shape modulation.",
        tip: "patch modulation into the z shape input, then use this control to set the modulation depth."
      },
      {
        id: "v-voct-a",
        label: "v/oct",
        type: "jack",
        x: 20.5,
        y: 78.6,
        size: 8,
        description: "pitch cv input for the v side.",
        tip: "patch sequencer pitch or keyboard cv here."
      },
      {
        id: "v-voct-b",
        label: "v/oct",
        type: "jack",
        x: 20.5,
        y: 87.7,
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
        y: 87.7,
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
        y: 87.7,
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
        y: 87.7,
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
        group: "analog glue",
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
    ]
  },
  {
    slug: "transmutation",
    name: "transmutation",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    category: "vcv rack module",
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
    ],
    audioSamples: [
      {
        title: "Dry vs Wet Processing",
        url: "https://www.w3schools.com/html/horse.ogg"
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
        id: "character",
        label: "character",
        type: "knob",
        x: 65,
        y: 23,
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
    controls: module.controls
  };
}
