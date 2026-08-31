export type PortfolioSection =
  | "digital"
  | "exhibition"
  | "installation"
  | "commercial"
  | "graphic";

export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  section: PortfolioSection;
  images: string[];
  coverPosition?: string;
  coverFit?: "cover" | "contain";
  summary: string;
  role: string;
  skills: string[];
  note?: string;
};

export type DigitalWork = {
  id: string;
  title: string;
  category: string;
  year: string;
  frames: string[];
  frameInterval: number;
};

export const sections: Array<{ id: PortfolioSection; label: string }> = [
  { id: "digital", label: "Digital 数字" },
  { id: "exhibition", label: "Exhibition 展览" },
  { id: "installation", label: "Installation 装置" },
  { id: "commercial", label: "Commercial 商业" },
  { id: "graphic", label: "CV 简介" },
];

export const digitalWorks: DigitalWork[] = [
  {
    id: "surging",
    title: "SURGE",
    category: "ANIMATION · LOOP",
    year: "",
    frames: Array.from(
      { length: 13 },
      (_, index) => `/portfolio-v2/digital/涌动/${index}.jpg`,
    ),
    frameInterval: 900,
  },
  {
    id: "initiative-unreached",
    title: "WHERE ADVOCACY FALLS SHORT",
    category: "DIGITAL ANIMATION",
    year: "",
    frames: [
      "/portfolio-v2/digital/倡议未达处/FemaleCircumcision-animation-1.jpg",
      "/portfolio-v2/digital/倡议未达处/FemaleCircumcision-animation -2.png",
      "/portfolio-v2/digital/倡议未达处/FemaleCircumcision-animation-3.png",
      "/portfolio-v2/digital/倡议未达处/FemaleCircumcision-animation-4.png",
    ],
    frameInterval: 1500,
  },
];

export const projects: Project[] = [
  {
    id: "hovered-keyframe",
    title: "The Hovered Keyframe",
    year: "2023",
    category: "Curatorial Project",
    section: "exhibition",
    images: [
      "/portfolio-v2/hovered-keyframe-exhibition-poster.jpg",
      "/portfolio-v2/exhibitions/hovered-keyframe-pv-06.jpg",
      "/portfolio-v2/exhibitions/hovered-keyframe-pv-07.jpg",
    ],
    coverPosition: "center 48%",
    summary:
      "在 Espacio Gallery 展开的概念型展览项目，从提案、空间规划到现场执行，建立作品、建筑与观众之间的叙事关系。",
    role:
      "核心团队成员；参与展览提案、作品输出与安装、节目设计和版式系统。",
    skills: ["策展研究", "空间规划", "现场安装", "视觉版式", "媒体传播"],
  },
  {
    id: "fading-spaciousness",
    title: "The Fading Spaciousness",
    year: "2023",
    category: "Exhibition Curation",
    section: "exhibition",
    images: [
      "/portfolio-v2/fading-spaciousness-exhibition-poster.jpg",
      "/portfolio-v2/exhibitions/fading-spaciousness-live-01.jpg",
      "/portfolio-v2/exhibitions/fading-spaciousness-live-02.jpg",
      "/portfolio-v2/exhibitions/fading-spaciousness-live-03.jpg",
      "/portfolio-v2/exhibitions/fading-spaciousness-live-04.jpg",
    ],
    coverPosition: "center 52%",
    summary:
      "以场地为叙事结构的综合展览，在 OXO Bargehouse Gallery 的多层空间中组织三个主题章节，让作品的尺度、路径与观看时间共同形成展览经验。",
    role:
      "展览第二章节策展人；负责观众动线、作品尺度与作品—场地匹配的策划和现场调整。",
    skills: ["策展结构", "观众动线", "空间规划", "艺术家协调", "现场应变"],
  },
  {
    id: "val-der-ada",
    title: "Val Der Ada",
    year: "",
    category: "Exhibition",
    section: "exhibition",
    images: ["/portfolio-v2/exhibitions/val-der-ada-poster.jpg"],
    summary: "展览项目与现场视觉记录。",
    role: "展览项目。",
    skills: ["展览"],
  },
  {
    id: "tight-strings-exhibition",
    title: "Tight Strings",
    year: "",
    category: "Exhibition",
    section: "exhibition",
    images: [
      "/portfolio-v2/exhibitions/tight-strings-exhibition-poster.jpg",
      "/portfolio-v2/exhibitions/tight-strings-exhibition-01.jpg",
    ],
    summary: "Tight Strings 展览海报与现场记录。",
    role: "展览项目。",
    skills: ["展览", "现场呈现"],
  },
  {
    id: "the-queer-museum",
    title: "The Queer Museum",
    year: "",
    category: "Exhibition",
    section: "exhibition",
    images: [
      "/portfolio-v2/exhibitions/queer-museum-poster.jpg",
      "/portfolio-v2/exhibitions/queer-museum-pv-02.jpg",
      "/portfolio-v2/exhibitions/theQueerMuseum-CookHouseGallert-Exhibition-detail-3.jpg",
      "/portfolio-v2/exhibitions/theQueerMuseum-CookHouseGallert-Exhibition-detail-7.jpg",
      "/portfolio-v2/exhibitions/queer-museum-detail-04.jpg",
    ],
    summary: "The Queer Museum 展览海报、现场与作品细节。",
    role: "展览项目。",
    skills: ["展览", "现场呈现", "作品记录"],
  },
  {
    id: "tale-of-the-chain",
    title: "Tale of the Chain",
    year: "",
    category: "Exhibition",
    section: "exhibition",
    images: [
      "/portfolio-v2/exhibitions/tale-of-the-chain-poster-01.jpg",
      "/portfolio-v2/exhibitions/tale-of-the-chain-poster-02.jpg",
      "/portfolio-v2/exhibitions/tale-of-the-chain-web-news-01.jpg",
      "/portfolio-v2/exhibitions/tale-of-the-chain-work-01.jpg",
      "/portfolio-v2/exhibitions/tale-of-the-chain-work-02.jpg",
    ],
    summary: "Tale of the Chain 展览海报、传播页面与作品记录。",
    role: "展览项目。",
    skills: ["展览", "视觉传播", "作品记录"],
  },
  {
    id: "kurzfilmtage",
    title: "KURZFILMTAGE Short Film Festival",
    year: "",
    category: "Exhibition",
    section: "exhibition",
    images: [
      "/portfolio-v2/exhibitions/kurzfilmtage-05.jpg",
      "/portfolio-v2/exhibitions/kurzfilmtage-01.jpg",
      "/portfolio-v2/exhibitions/kurzfilmtage-02.jpg",
      "/portfolio-v2/exhibitions/kurzfilmtage-04.jpg",
    ],
    summary: "KURZFILMTAGE Short Film Festival 现场记录。",
    role: "展览活动。",
    skills: ["展览活动", "现场记录"],
  },
  {
    id: "degree-show",
    title: "Degree Show",
    year: "",
    category: "Exhibition",
    section: "exhibition",
    images: [
      "/portfolio-v2/exhibitions/degree-show-pv-01.jpg",
      "/portfolio-v2/exhibitions/degree-show-pv-02.jpg",
    ],
    summary: "Degree Show 展览现场记录。",
    role: "展览项目。",
    skills: ["展览", "现场记录"],
  },
  {
    id: "surgery-for-equipment",
    title: "Surgery for Equipment",
    year: "2023 · WIP",
    category: "Installation & Fabrication",
    section: "installation",
    images: [
      "/portfolio-v2/sugery-cover01.JPG",
      "/portfolio-v2/surgery-02.jpg",
    ],
    coverPosition: "center 46%",
    summary:
      "以医疗设备的拆解、内部结构与线缆为线索，研究系统、身体经验和机器外壳之间的关系。",
    role: "概念、三维建模、3D 打印测试与装置发展。",
    skills: ["三维建模", "3D 打印", "材料实验", "装置原型", "过程记录"],
  },
  {
    id: "post-viewing",
    title: "Post Viewing",
    year: "2023",
    category: "Installation & Exhibition",
    section: "installation",
    images: [
      "/portfolio-v2/post-viewing-001.jpg",
      "/portfolio-v2/post-viewing-02.jpg",
      "/portfolio-v2/post-viewing-03.jpg",
      "/portfolio-v2/post-viewing-04.jpg",
      "/portfolio-v2/post-viewing-05.jpg",
      "/portfolio-v2/post-viewing-06.jpg",
    ],
    summary:
      "一条持续延伸的纸带穿过观看与休息的公共空间，使文字、身体位置和美术馆观看经验连接起来。",
    role: "艺术家；概念、文字系统、印刷与现场装置。",
    skills: ["空间叙事", "长卷印刷", "现场安装", "观众动线", "展览摄影"],
  },
  {
    id: "words-memory",
    title: "Words, Memory",
    year: "—",
    category: "Installation & Image",
    section: "installation",
    images: [
      "/portfolio-v2/words-memory-01.jpg",
      "/portfolio-v2/word-memory-02.jpg",
      "/portfolio-v2/words-memory-03.jpg",
      "/portfolio-v2/words-memory-04.jpg",
    ],
    summary:
      "从文字的痕迹与记忆的反复书写出发，将阅读、物质表面与空间观看并置。",
    role: "艺术家；概念、图像处理与现场呈现。",
    skills: ["文字叙事", "图像制作", "材料试验", "现场呈现"],
  },
  {
    id: "tight-strings",
    title: "Tight Strings",
    year: "2023",
    category: "Installation Series",
    section: "installation",
    images: [
      "/portfolio-v2/tight-strings- 01.jpg",
      "/portfolio-v2/tight-strings-02.jpg",
      "/portfolio-v2/tight-strings- 03.jpg",
      "/portfolio-v2/tight-strings-04.jpg",
      "/portfolio-v2/tight-strings- 05.jpg",
      "/portfolio-v2/tight-strings- 06.jpg",
      "/portfolio-v2/tight-strings-07.jpg",
    ],
    summary:
      "以系紧、牵引和缺席为线索，将生活中充满张力的瞬间转化为物件与展墙之间的关系。",
    role: "艺术家；系列概念、物件制作与展览编排。",
    skills: ["系列叙事", "物件制作", "空间节奏", "展墙安装"],
  },
  {
    id: "happy-birthday",
    title: "Happy Birthday",
    year: "2022",
    category: "Installation",
    section: "installation",
    images: [
      "/portfolio-v2/happy-birthday-01.jpg",
      "/portfolio-v2/happy-birthday-02.jpg",
      "/portfolio-v2/happy-birthday-03.jpg",
    ],
    summary:
      "以香、细线和重复的空间关系处理记忆、宗教仪式与隐藏的悲伤，让轻盈材料构成具有张力的场域。",
    role: "艺术家；概念、材料实验与现场安装。",
    skills: ["材料实验", "空间构成", "现场安装", "灯光与摄影"],
  },
  {
    id: "try-to-fall-asleep",
    title: "Try to Fall Asleep",
    year: "2023",
    category: "Video",
    section: "installation",
    images: ["/portfolio-v2/try-sleep-01.jpg", "/portfolio-v2/try-sleep-02.jpg"],
    summary:
      "始于 Margate Beach 的驻留项目，将失眠与梦境的经验放入自然环境，通过风推动枕头的无序状态呈现睡眠。",
    role: "艺术家；概念、场地行动、拍摄与影像剪辑。",
    skills: ["影像叙事", "场地行动", "摄影", "剪辑"],
  },
  {
    id: "respiration-connection",
    title: "Respiration, Connection",
    year: "2022",
    category: "Moving Image & Virtual Sculpture",
    section: "installation",
    images: ["/portfolio-v2/respiration-01.jpg"],
    summary:
      "采样线上沟通中的声音延迟、环境声与风铃，将声音转化为虚拟雕塑和移动影像。",
    role: "艺术家；声音采样、动态图像与虚拟形态生成。",
    skills: ["动态图像", "声音采样", "虚拟雕塑", "视听叙事"],
  },
  {
    id: "the-last-rose",
    title: "The Last Rose",
    year: "2023",
    category: "Installation & Trace",
    section: "installation",
    images: [
      "/portfolio-v2/last-rose-01.jpg",
      "/portfolio-v2/last-rose-02.JPG",
      "/portfolio-v2/last-rose-03.JPG",
    ],
    summary:
      "一次指向阿塔卡马沙漠风铃的朝圣，以残留的痕迹讨论风、距离和无法直接抵达的物件。",
    role: "艺术家；概念、痕迹制作、图像记录与安装。",
    skills: ["场地研究", "痕迹制作", "摄影记录", "装置呈现"],
  },
  {
    id: "the-surveillance",
    title: "The Surveillance",
    year: "2022",
    category: "Photography",
    section: "installation",
    images: [
      "/portfolio-v2/surveillance-01.JPG",
      "/portfolio-v2/surveillance-02.JPG",
      "/portfolio-v2/surveillance-03.jpg",
    ],
    summary:
      "一幅由白墙转角与监控镜头组成的黑白摄影，观察图像如何在不同文化语境中被解读，并产生身体与监视的联想。",
    role: "艺术家；场景观察、摄影与图像呈现。",
    skills: ["概念摄影", "语境研究", "图像叙事", "展览呈现"],
  },
  {
    id: "the-branch",
    title: "The Branch",
    year: "2021",
    category: "Object & Research",
    section: "installation",
    images: [
      "/portfolio-v2/branch-01.png",
      "/portfolio-v2/branch-02.png",
      "/portfolio-v2/branch-03.jpg",
    ],
    coverPosition: "center 43%",
    summary:
      "从自然物的采集、翻模与再造出发，观察原始形态如何在制作过程中变成带有记忆的人工物件。",
    role: "艺术家；田野观察、物件制作与过程摄影。",
    skills: ["物件制作", "材料研究", "摄影记录", "形态提取"],
  },
  {
    id: "window-memory",
    title: "Window, Car Voice, Grandpa, Childhood",
    year: "—",
    category: "Painting & Memory",
    section: "installation",
    images: [
      "/portfolio-v2/window-memory-01.jpg",
      "/portfolio-v2/window-memory-02.jpg",
      "/portfolio-v2/window-memory-03.jpg",
    ],
    coverPosition: "center 46%",
    summary:
      "通过窗户、车声与童年记忆中的碎片，将日常经验转化为绘画对象和时间的线索。",
    role: "艺术家；记忆采集、绘画制作与系列编排。",
    skills: ["绘画", "个人叙事", "系列编排", "作品摄影"],
  },
  {
    id: "painting",
    title: "Painting",
    year: "",
    category: "Painting",
    section: "installation",
    images: [
      "/portfolio-v2/painting/painting-cover.jpg",
      "/portfolio-v2/painting/painting-02.jpg",
      "/portfolio-v2/painting/painting-03.jpg",
    ],
    summary: "绘画作品系列。",
    role: "艺术家。",
    skills: ["绘画", "作品呈现"],
  },
  {
    id: "darkroom-ra4-hand-print",
    title: "Darkroom RA4 Hand Print",
    year: "",
    category: "Photography & Production",
    section: "commercial",
    images: [
      "/portfolio-v2/commercial/darkroom-ra4-poster.jpg",
      "/portfolio-v2/commercial/darkroom-ra4-01.jpg",
      "/portfolio-v2/commercial/darkroom-ra4-02.jpg",
      "/portfolio-v2/commercial/darkroom-ra4-03.jpg",
      "/portfolio-v2/commercial/darkroom-ra4-04.jpg",
    ],
    coverFit: "contain",
    summary: "传统暗房 RA4 手工彩色放大摄影项目。",
    role: "摄影与暗房制作。",
    skills: ["摄影", "暗房工艺", "RA4 手工放大", "视觉制作"],
  },
];

export const homeHeroImages = [
  "/portfolio-v2/work-cover-p1.jpg",
  "/portfolio-v2/branch-01.png",
  "/portfolio-v2/post-viewing-001.jpg",
  "/portfolio-v2/respiration-01.jpg",
];

export const exhibitionHeroImages = [
  "/portfolio-v2/exhibitions/hero-kurzfilmtage-05.jpg",
  "/portfolio-v2/exhibitions/degree-show-pv-01.jpg",
];
