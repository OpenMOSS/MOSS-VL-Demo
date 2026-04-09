export interface DemoQuestion {
  id: string;
  text: string;
  images?: string[];
  answer: string;
  followUps?: DemoQuestion[];
}

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  type?: "video" | "image" | "multi-image" | "ocr";
  videoUrl?: string;
  imageUrl?: string;
  imageUrls?: string[];
  thumbnailUrl?: string;
  thumbnailTime?: number;
  tags: string[];
  questions: DemoQuestion[];
}

const HF_BASE =
  "https://huggingface.co/datasets/henrywch2huggingface/MOSS-VL-Demo-Videos/resolve/main";

function hfUrl(filename: string): string {
  return `${HF_BASE}/${encodeURIComponent(filename)}`;
}

export const demos: DemoVideo[] = [
  {
    id: "huaqiang-buygua",
    title: "华强买瓜",
    description: "经典影视片段：华强与瓜摊老板之间关于西瓜的一场精彩博弈。",
    type: "video",
    videoUrl: hfUrl("华强买瓜.mp4"),
    thumbnailUrl: "",
    tags: ["VQA", "ZH", "影视", "经典"],
    questions: [
      {
        id: "hq-q1",
        text: "描述一下这段视频发生了什么",
        answer:
          "视频开始时，一名身穿黑色夹克的男子骑着一辆深色踏板摩托车在城市街道上行驶，镜头从侧面跟随其移动，背景中可见行人、自行车以及各种车辆。摩托车经过一个摆放着西瓜和菠萝的水果摊，随后男子在摊位前停下，镜头特写其面部，他神情严肃地注视着摊主。画面切换至摊主，这是一位体型较胖、身穿深色夹克的中年男子，他坐在摊位后方，面前摆放着香蕉。骑摩托车的男子走近摊位，两人开始交谈，镜头在两人之间来回切换。摊主一边说话一边用手指着西瓜，骑摩托车的男子则露出微笑，似乎在回应。摊主随后站起身，从摊位上拿起一个西瓜，准备向骑摩托车的男子展示，镜头聚焦于摊主的面部，他表情严肃，似乎在强调西瓜的品质或价格。两人继续对话，骑摩托车的男子表情显得有些不耐烦，摊主则试图通过展示西瓜来说服他。整个过程中，两人围绕西瓜展开交流，摊主试图通过展示西瓜来促成交易，而骑摩托车的男子则表现出犹豫和不耐烦的态度。\n\n随后，骑摩托车的男子站在摊位前，摊主正准备用秤称重一个西瓜，但骑摩托车的男子突然伸手阻止了这一动作。两人随即爆发激烈争吵，摊主情绪激动，而骑摩托车的男子则面露不悦。在争执过程中，骑摩托车的男子从口袋中掏出一把刀，摊主见状立刻后退，神情惊恐。骑摩托车的男子随即用刀切开了西瓜，镜头特写西瓜被切开的瞬间，果肉鲜红，汁水四溢。他拿起切下的那块西瓜，愤怒地对着摊主大喊，画面中可以清晰看到他情绪的高涨和动作的激烈。整个过程中，摊主始终处于被动和惊恐的状态，而骑摩托车的男子则通过这一系列动作表达了他对摊主的不满和威胁。\n\n紧接着，骑摩托车的男子将西瓜刀猛地掷出，镜头随即切换至街道另一侧，一名身穿深色夹克的年轻男子站在那里，他迅速反应，用刀将西瓜刀接住，动作干净利落。紧接着，镜头转向一名身穿黑色夹克的男子，他正骑着踏板摩托车在街道上疾驰，神情专注，迅速逃离现场。与此同时，镜头再次回到街道另一侧，一名身穿西装的男子、一名身穿绿色外套的女子以及一名身穿红色背心的小女孩站在路边，神情紧张地注视着远处，似乎在关注着刚刚发生的一幕。骑摩托车的男子在逃离过程中回头望了一眼，脸上露出一丝得意的微笑，随后继续向前驶去，逐渐消失在街道尽头。整个事件发生得迅速而连贯，展现了街头突发冲突后的紧张氛围与人物之间的互动。\n\n整个视频描绘了一个发生在街头的冲突事件，一名骑摩托车的男子与一个水果摊主就西瓜发生争执，摊主试图通过称重和展示西瓜来促成交易，但男子态度强硬，拒绝购买。随后，男子用刀切开西瓜并威胁摊主，摊主惊恐地躲开。在关键时刻，另一名男子出现，用刀接住了被扔出的西瓜刀，化解了危机。最后，骑摩托车的男子骑车离开现场，而摊主的同伴们则在远处观望。",
      },
      {
        id: "hq-q2",
        text: "视频开头跟在主角电动车后面的蓝色电动车的四位车牌号码是多少",
        answer:
          "在视频开头的街道场景中，主角骑着黑色电动车行驶，后方紧跟着一辆蓝色电动车。通过清晰的画面可以观察到蓝色电动车的车牌号码为“4425”。这一细节在视频中被明确展示，且车牌号码在画面中清晰可见，没有其他蓝色电动车出现，因此答案唯一。最终答案是：4425。",
      },
      {
        id: "hq-q3",
        text: "从视频中看，可以从哪个时间点的内容看出来主角的电动车的车牌号？",
        answer:
          "从时间01:43开始到01:47结束，持续了大约4秒。",
      },
    ],
  },
  {
    id: "dakaimen",
    title: "大开门",
    description: "一段关于「大开门」的精彩视频片段。",
    type: "video",
    videoUrl: hfUrl("大开门.mp4"),
    thumbnailUrl: "",
    thumbnailTime: 25,
    tags: ["Grounding", "ZH", "生活", "趣味"],
    questions: [
      {
        id: "dk-q1",
        text: "视频中猫咪一共被喂食了几次，具体时间是？",
        answer:
          "猫咪一共被喂食了五次。第一次在00:03，第二次在00:12，第三次在00:18，第四次在00:27，第五次在00:37。",
      },
    ],
  },
  {
    id: "taishi-luroufan",
    title: "台式卤肉饭",
    description: "一段关于「台式卤肉饭」的制作教程。",
    type: "video",
    videoUrl: hfUrl("台式卤肉饭.mp4"),
    thumbnailUrl: "",
    tags: ["Grounding", "ZH", "生活", "菜谱"],
    questions: [
      {
        id: "tl-q1",
        text: "根据视频，简述做菜的步骤并且定位相应的时间段",
        answer:
          "从 00:00 开始到 00:06 结束，我们可以看到特写镜头首先展示了一锅正在炖煮的卤肉，锅中包含肉块、卤蛋和葱段，表面撒有香料，随后镜头聚焦于锅中正在冒泡的卤肉，热气腾腾，色泽诱人。画面中央出现白色文字“台式卤肉饭”，紧接着镜头切换，用木勺将卤肉舀到一碗白米饭上，米饭旁配有切开的卤蛋和绿色蔬菜。画面下方出现白色字幕：“软糯入味的卤肉饭没有人不爱吧~”。随后，一个木勺舀起一勺卤肉和米饭，展示其丰富的配料和诱人的色泽，画面下方再次出现白色字幕：“软糯入味的卤肉饭没有人不爱吧~”。整个视频以成品展示开场，呈现了这道台式卤肉饭的诱人外观和制作完成后的摆盘效果。\n\n在 00:06 至 00:11 期间，一只手使用菜刀在木质砧板上将五花肉切成小块，画面下方显示白色字幕“五花肉切小块”；随后，同一块砧板上被切碎的红葱头，画面下方出现白色字幕“红葱头切小丁”；接着，切碎的干香菇也被展示在砧板上，画面下方显示白色字幕“泡发好的干香菇切丁”。随后镜头切换，展示出四个装有食材的碗，分别盛放着切好的五花肉、干香菇、红葱头和蒜末，所有食材整齐摆放，准备用于后续的烹饪步骤。整个过程围绕食材的初步处理展开，清晰呈现了五花肉、红葱头和干香菇的切割方式与状态。\n\n在 00:11 至 00:24 期间，视频展示了在平底锅中，切碎的红葱头被倒入热油中，伴随着“下锅小火慢炸”的白色字幕，厨师用木铲不断翻炒，直至红葱头呈现出金黄色，随后用漏勺将其捞出，留下热油在锅中。接着，切好的五花肉被放入锅中，画面显示“五花肉 蒜末 姜片”的白色字幕，厨师继续用木铲翻炒，使五花肉逐渐煸炒出油脂，画面下方出现“煸炒出油脂”的白色字幕。随后，厨师将煸炒出的多余油脂倒入另一个碗中，画面下方显示“多余的油盛出来 油多了会腻”的白色字幕。紧接着，厨师向锅中加入一勺料酒、两勺生抽、一勺老抽、八角、桂皮、香叶以及几颗冰糖，画面左侧出现白色文字列表，详细列出了所用的调味料，包括“1勺料酒 2勺生抽 1勺老抽 八角 桂皮 香叶 几颗冰糖”，厨师继续翻炒，使五花肉均匀地裹上酱汁，画面下方出现“翻炒均匀”的白色字幕。整个过程清晰展示了卤肉的初步烹饪步骤，包括炸红葱头、煸炒五花肉以及加入调味料进行翻炒。\n\n00:24 至 00:31，画面显示切好的干香菇丁和葱头丁被加入锅中，与五花肉一起翻炒，画面下方出现白色字幕“下锅干香菇丁和葱头丁”。随后，厨师向锅中倒入适量的水，画面下方出现白色字幕“加入没过食材”，接着将三个卤蛋放入锅中，画面下方出现白色字幕“再几个鸡蛋 小火煮一个小时”。最后，厨师盖上锅盖，画面下方出现白色字幕“开盖后再煮10分钟 收浓汤汁”。整个过程展示了卤肉的收尾阶段，包括加入干香菇和葱头丁、加水、放入卤蛋并盖上锅盖进行长时间炖煮。\n\n从 00:31 开始到 00:37 结束，我们可以看到特写镜头展示了卤肉在锅中炖煮的过程，汤汁正在慢慢收浓，随后画面切换至卤肉被盛入一碗白米饭中，旁边摆放着切开的卤蛋和绿色蔬菜，厨师使用木勺将卤肉与米饭充分搅拌，画面下方出现白色字幕：“酱汁浓郁 拌着米饭吃真的超级香~”。紧接着，一个木勺舀起一勺拌好的卤肉饭，画面下方再次出现白色字幕：“卤肉软糯入味 肥而不腻~太好吃啦”。视频以这道完成的台式卤肉饭作为结尾，展示了其最终的呈现效果和诱人的口感。",
      },
    ],
  },
  {
    id: "luoge-slap",
    title: "罗哥扇耳光",
    description: "一段经典的「罗哥扇耳光」名场面，展现了精彩的表演张力。",
    type: "video",
    videoUrl: hfUrl("罗哥扇耳光.mp4"),
    thumbnailUrl: "",
    tags: ["VQA", "ZH", "影视", "名场面"],
    questions: [
      {
        id: "lg-q1",
        text: "根据柜员的说法，柜台上三个杯子分别对应什么大小的？",
        answer:
          "中杯、大杯和特大杯。",
      },
      {
        id: "lg-q2",
        text: "罗老师为什么最后情绪激动",
        answer:
          "在视频中，罗老师多次尝试用中杯拿铁表达需求，但店员始终将中杯错误地理解为大杯，导致他反复纠正并表现出无奈。当店员再次将中杯误认为大杯时，罗老师的情绪逐渐升级，最终爆发。这种反复误解直接导致了他的情绪激动。因此，罗老师最后情绪激动是因为店员多次将他要求的中杯拿铁误解为大杯，导致他反复纠正却无法被理解，最终情绪失控。",
      },
    ],
  },
  {
    id: "zaran",
    title: "扎染",
    description: "这是一段手工扎染的记录视频。",
    type: "video",
    videoUrl: hfUrl("扎染.mp4"),
    thumbnailUrl: "",
    tags: ["Grounding", "EN", "生活", "手工"],
    questions: [
      {
        id: "zr-q1",
        text: "Describe the content of this video and indicate the time corresponding to each description.",
        answer:
          "(00:00 - 00:10) A person's hand is seen submerging a tie-dyed bed cover into a dark container filled with water, the fabric displaying a vibrant mix of red, yellow, blue, and green hues. As the fabric is lifted from the water, the camera captures a close-up of the tie-dye pattern, emphasizing the intricate swirls and color transitions. On-screen text appears, reading \"Tie-Dying my bed covers!\" The scene then transitions to a wider shot, revealing the full bed cover now fully submerged in the water, with the same text still visible, reinforcing the activity being performed. The sequence highlights the process of tie-dyeing, focusing on the interaction between the fabric and the water, and culminating in a clear view of the finished product.\n\n(00:10 - 00:25) A person wearing a black long-sleeved shirt begins by laying a white t-shirt flat on a patterned rug, carefully folding it into a compact, circular shape. Using a green rubber band, they tightly secure the folded fabric, ensuring it remains in place. The person then lifts the bundled t-shirt, holding it up to the camera to display the finished bundle, which is now ready for the dyeing process.\n\n(00:25 - 00:37) A person begins by pouring blue dye from a packet into a clear Pyrex measuring cup that already contains a small amount of water. Next, they add hot water from a kettle into the same cup, causing the blue dye to dissolve and form a dark blue liquid. The person then stirs the mixture thoroughly with a spoon, ensuring the dye is fully incorporated into the water. Finally, they lift the measuring cup and pour the dark blue dye mixture into a larger container, completing the preparation of the dye solution.\n\n(00:37 - 01:20) A young woman with dark hair, wearing a black hoodie, walks down a hallway and smiles at the camera before the scene transitions to nighttime outdoors. In the dark, she begins pouring a blue dye mixture from a measuring cup onto a bundle of white fabric that is lying on the grass. The camera captures a close-up of her hands as she carefully applies the dye, ensuring even coverage. She then moves on to a second bundle, which is already partially dyed blue, and continues the process with precision. The scene shifts to a close-up of a third bundle, where she pours a red dye mixture onto the fabric, adding a new layer of color to the evolving design. The sequence highlights the careful and deliberate application of dye to each bundle, with the woman methodically working through the process under the dim outdoor lighting.\n\n(01:20 - 02:18) A person begins by pouring a pinkish-red dye from a packet into a measuring cup, followed by the addition of hot water, which is then stirred thoroughly to create a dark red dye mixture. The scene transitions to nighttime outdoors, where the person is seen pouring the red dye onto a bundle of fabric that already has blue dye applied to it. Next, the person pours a dark blue dye mixture from a measuring cup onto another bundle of fabric, continuing the process of applying dye to the fabric bundles. The person then pours a dark red dye mixture from a measuring cup onto a third bundle of fabric, which is already partially dyed with blue and red. The sequence concludes with the person pouring a dark red dye mixture from a measuring cup onto a fourth bundle of fabric, which is already partially dyed with blue and red, completing the application of dye to the fabric bundles.\n\n(02:18 - 03:16) A person begins by pouring a dark red dye mixture from a measuring cup onto a bundle of fabric that is already partially dyed with blue and red. Next, they pour a dark red dye mixture from a measuring cup onto a bundle of fabric that is already partially dyed with blue and red. The person then pours a dark red dye mixture from a measuring cup onto a bundle of fabric that is already partially dyed with blue and red. After applying the dye, the person wraps the dyed fabric bundle in a sheet of aluminum foil, carefully folding and pressing it to ensure the dye is fully enclosed. They then place the foil-wrapped bundle into a black plastic tub, positioning it alongside other similarly wrapped bundles. The scene transitions to a close-up of a hand holding a tie-dyed bed cover, with on-screen text reading \"THE NEXT DAY,\" indicating the passage of time. The person then unwraps the foil from the bundle, revealing the fabric underneath, and proceeds to remove the rubber bands that had been securing the fabric in place. This sequence captures the final steps of the tie-dyeing process, including the application of dye, wrapping in foil, and the subsequent unwrapping and removal of securing materials.\n\n(03:16 - 04:38) A person begins by washing a tie-dyed bed cover in a sink filled with soapy water, carefully agitating the fabric to remove excess dye. As the washing continues, the person removes the rubber bands that had been securing the fabric, allowing the colors to blend and settle. The scene transitions to a close-up of the finished tie-dyed bed cover, now fully revealed with a vibrant, multi-colored pattern. On-screen text appears, reading \"Eve-Dying my bed covers!\" followed by another text overlay that states \"Tie-Dying my bed covers!\" The video concludes with a final shot of the completed tie-dyed bed cover, showcasing the intricate and colorful design that has emerged from the washing process.",
      }
    ],
  },
  {
    id: "star-war",
    title: "星球大战报幕",
    description: "一段经典的星球大战片前报幕。",
    type: "video",
    videoUrl: hfUrl("Star_Wars.mp4"),
    thumbnailUrl: "",
    thumbnailTime: 60,
    tags: ["VQA", "EN", "影视", "经典"],
    questions: [
      {
        id: "sw-q1",
        text: "Describe all the content shown in the video and provide a full text output.",
        answer:
          "The video opens with a black screen that gradually transitions to a dark blue, star-filled background, where a golden, three-dimensional \"20th CENTURY FOX\" logo slowly rises into view, illuminated by sweeping spotlights from above. As the logo fades, the screen returns to darkness, and green text appears in the center, reading: \"A LUCASFILM LIMITED Production.\" The scene shifts again to a dark blue, starry backdrop, where glowing blue text fades in: \"A long time ago in a galaxy far, far away....\" This text fades out, making way for the iconic \"STAR WARS\" logo, displayed in a stylized, three-dimensional font with a white outline and a blue fill, which slowly zooms out into the vastness of space. The screen remains dark as a long paragraph of glowing orange text begins to fade in line by line, forming a complete narrative passage that reads: \"It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....\" As the final line of text fades, the camera slowly zooms out, revealing the full paragraph receding into the distance, emphasizing the immense scale of the galaxy and the magnitude of the conflict. The scene transitions to a dark blue, star-filled expanse of space, where a small white object glides swiftly from right to left. The camera then pans to reveal a vast, curved planetary horizon, with a smaller, spherical moon-like body positioned above it. A sleek, white starship with red markings enters from the right, moving leftward before exiting the frame. Moments later, the imposing silhouette of a massive, wedge-shaped Star Destroyer emerges from the right, its surface textured and detailed, as the camera pulls back to reveal the full scale of the vessel. The Star Destroyer fires a green laser beam from its bow, which streaks across the screen and impacts a distant target, triggering a large, fiery explosion. The camera then shifts to a close-up of the Star Destroyer's front section, where its four main engines ignite in a brilliant burst of blue-white light, propelling the ship forward with powerful thrust. The scene transitions to a brightly lit, white interior corridor of a starship, where a golden humanoid droid, C-3PO, stands motionless. In front of him, a small, cylindrical droid with a domed top, R2-D2, is positioned, completing the visual narrative of the opening sequence.",
      },
    ],
  },
  {
    id: "moss-vl-layout",
    title: "MOSS-VL文档布局解析",
    description: "MOSS-VL Github页面的布局解析。",
    type: "ocr",
    imageUrl: hfUrl("moss-vl.png"),
    thumbnailUrl: "",
    tags: ["OCR", "EN", "Grounding", "文档"],
    questions: [
      {
        id: "mvl-q1",
        text: "对以上文档进行布局解析",
        answer:
          "<label>subtitle<label><bbox>[39,3,470,24]<bbox>\n<label>text<label><bbox>[31,40,956,86]<bbox>\n<label>image<label><bbox>[150,99,852,337]<bbox>\n<label>figure_title<label><bbox>[269,356,727,371]<bbox>\n<label>text<label><bbox>[31,381,945,431]<bbox>\n<label>subtitle<label><bbox>[35,442,203,458]<bbox>\n<label>text<label><bbox>[49,470,955,573]<bbox>\n<label>subtitle<label><bbox>[35,603,147,624]<bbox>\n<label>text<label><bbox>[35,640,185,685]<bbox>\n<label>subtitle<label><bbox>[35,699,299,721]<bbox>\n<label>text<label><bbox>[32,738,806,755]<bbox>\n<label>chart<label><bbox>[163,784,444,954]<bbox>\n<label>chart<label><bbox>[555,784,836,954]<bbox>\n<label>figure_title<label><bbox>[273,980,724,995]<bbox>",
      },
    ],
  },
  {
    id: "moss-paper",
    title: "MOSS论文",
    description: "MOSS论文转化为Markdown文档。",
    type: "image",
    imageUrl: hfUrl("moss.png"),
    thumbnailUrl: "",
    tags: ["VQA", "EN", "文档", "论文"],
    questions: [
      {
        id: "mp-q1",
        text: "Convert to markdown",
        images: [hfUrl("moss.png")],
        answer:
          "<table><tr><td>Model</td><td>Release date</td><td>Parameters</td><td>Tokens</td><td>SFT</td><td>RM</td><td>Alignment</td></tr><tr><td>ChatGPT</td><td>2022-11-30</td><td>Unknown</td><td>Unknown</td><td>Human annotation</td><td>Human feedback</td><td>PPO</td></tr><tr><td>MOSS</td><td>2023-2-20</td><td>16B</td><td>680B</td><td>Multi-turn synthetic data*</td><td>AI feedback</td><td>PAT</td></tr><tr><td>LLaMA</td><td>2023-2-24</td><td>7B-65B</td><td>1.0T-1.4T</td><td>-</td><td>-</td><td>-</td></tr><tr><td>Alpaca</td><td>2023-3-13</td><td>Based on LLaMA</td><td>Based on LLaMA</td><td>Single-turn synthetic data</td><td>-</td><td>-</td></tr><tr><td>ChatGLM</td><td>2023-3-13</td><td>6B</td><td>Unknown</td><td>Unknown</td><td>Unknown</td><td>Unknown</td></tr><tr><td>Qwen</td><td>2023-4-11</td><td>7B-14B</td><td>3.0T</td><td>Human annotation</td><td>Human feedback</td><td>PPO</td></tr><tr><td>Falcon</td><td>2023-5-25</td><td>7B-180B</td><td>1.5T-3.5T</td><td>-</td><td>-</td><td>-</td></tr><tr><td>InternLM</td><td>2023-6-7</td><td>7B-104B</td><td>1.6T</td><td>Unknown</td><td>Unknown</td><td>Unknown</td></tr><tr><td>Baichuan</td><td>2023-6-15</td><td>7B</td><td>1.2T</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LLaMA2</td><td>2023-7-18</td><td>7B-70B</td><td>2.0T</td><td>Human annotation</td><td>Human feedback</td><td>PPO &amp; RSFT\u2020</td></tr><tr><td>Qwen</td><td>2023-4-11</td><td>7B-14B</td><td>3.0T</td><td>Human annotation</td><td>Human feedback</td><td>PPO</td></tr></table>\n\n" +
          "Table 1 A brief comparison of open-sourced LLMs published within 8 months after the release of ChatGPT. \\* means that the multi-turn synthetic data of MOSS is constructed based on real-world user data. \u2020 RSFT means rejection sampling fine-tuning.\n\n" +
          "Chinese grammar and cultural concepts encoded in web text. To this end, we assign different roles to this two of the most used languages in the world and thus constructed a pre-training dataset as shown in Table 2.\n\n" +
          "<table><tr><td>Dataset</td><td>Language</td><td>Tokens</td><td>Ratio (%)</td></tr><tr><td>The Pile</td><td>English</td><td>386.3B</td><td>57.1</td></tr><tr><td>Big Query</td><td>Code</td><td>119.2B</td><td>17.6</td></tr><tr><td>Big Python</td><td>Code</td><td>71.7B</td><td>10.6</td></tr><tr><td>Baidu Baike</td><td>Chinese</td><td>4.5B</td><td>0.7</td></tr><tr><td>Chinese Web</td><td>Chinese</td><td>95.4B</td><td>14.1</td></tr></table>\n\n" +
          "Table 2 Statistics of the overall pre-training corpora for MOSS-base\n\n" +
          "To endow MOSS with the ability of understanding and generating Chinese and English tokens both effectively and efficiently, we follow GPT-2[27] to build our bilingual tokenizer, which is trained using the byte-level BPE[28] algorithm. Specifically, we additionally trained a Chinese tokenizer on about 20 GB Chinese text data randomly sampled from our pre-training corpora using the byte-level BPE algorithm. The vocabulary size of our trained tokenizer is 60K with about 30% of Chinese tokens.\n\n" +
          "Thus, we trained MOSS-base model on the 677B Cross-lingual corpus. According to the studies on emergent abilities[23], we considered that the expected base model with emergent abilities should have more than 10 billion parameters. In addition, we also wished it is feasible to fine-tune MOSS with a single computation node consisting of 8 NVIDIA 80GB A100 GPUs using ZeRO[29] and gradient checkpointing[30]. Finally, we use Transformer decoder with 16B parameters as the architecture of MOSS-base. To accelerate our validation of concept and reduce carbon footprint, we adopt Codegen-16Bmonon[31] as the initialization since we observed that the pre-training corpora used by Codegen[31] aligns with our ideal data distribution.\n\n" +
          "We used the Adam optimizer[32] with \u03B2\u2081 = 0.9 and \u03B2\u2082 = 0.95. We adopt a peak learning rate of 3 \u00D7 10\u207B\u2075 with a warmup of 2% of the total number of training steps, a batch size of 2.6M tokens, and a weight decay of 0.1. A cosine learning rate schedule is used and the learning rate eventually decays to 3 \u00D7 10\u207B\u2076. Due to the large number of parameters, we use the pipeline parallelism, data parallelism and ZeRO[29] for distributed training. In particular, we adopt a 2-way pipeline parallelism and ZeRO stage 1. The total pre-training process lasted two month on 128 NVIDIA A100 GPUs.\n\n" +
          "The pre-trained MOSS-base exhibited strong capabilities in both Chinese and English usage after bilingual pre-training. More importantly, the base model can generate knowledge in Chinese while the knowledge only exists in English form rather than Chinese form in the pretraining corpora. These preliminary results validated our hypothesis that knowledge can be transferred between Chinese and English.\n\n" +
          "# 4 Alignment\n\n" +
          "The base language model is pre-trained to predict the next token in the document, which does not inherently enable them to follow user instructions. It is necessary to obtain an initial instruction-following model to bootstrap the overall process.\n\n" +
          "We interpret such a transformation from the base model to an instruction-following assistant as a significant phase of LLM training. Instead of continually inserting knowledge into the language model, we identify it as shifting the way the model handles its inner knowledge. Such transformation has both pros and cons. The positive aspect lies in that the ability of following human instructions makes it easier for users to extract the model's massive knowledge. It can also be trained to be creative and amusing, which is deemed as a higher level of capability.",
      },
    ],
  },
  {
    id: "xialong-shanshui",
    title: "霞胧山水",
    description: "这是一张暮色下的山水照。",
    type: "image",
    imageUrl: hfUrl("霞胧山水.png"),
    thumbnailUrl: "",
    tags: ["VQA", "ZH", "风景", "写作"],
    questions: [
      {
        id: "xs-q1",
        images: [hfUrl("霞胧山水.png")],
        text: 
          "### 【光影随笔 —— 图像的诗意自白】\n\n**【创作设定】** 请你化身为这幅画面中的一个**隐形观察者**或**画中人**，以第一人称（我）的视角，为这幅图像写一段散文式的文学描述。 **【核心诉求】** 1. **视觉解码**: 不要只是简单罗列物体，请捕捉画面中微小的光影跳动、色彩的冷暖交织、以及物体表面那触手可及的质感。 2. **情感共鸣**: 将你的观察转化为内心独白。看到这些景致，你会联想到什么样的往事、季节或哲学瞬间？请让文字流露出一股温暖、和蔼且治愈的力量。 3. **笔触优美**: 追求辞藻的典雅与意境的深邃。想象这是一篇刊登在文学杂志上的卷首语，或者是寄给远方朋友的一封唯美信札。 **【硬性约束】** 1. **词汇红线**: 为了保证文字的洗练与高级感，全文禁止出现***“就是”***与***“然后”***这两个口语化词汇。请尝试用更优雅的衔接方式（如：继而、于是、伴随、沉沦于、驻足在……）来串联你的思绪。 2. **视角**: 必须坚持第一人称“我”，语调要像老友重逢般温和、亲切。 3. **内容来源**: 一切想象须基于图中真实存在的元素，完成一场从“眼见”到“心觉”的艺术延伸。",
        answer: 
          "我伫立于水岸，凝望天际那绚烂的晚霞，仿佛时间在此刻被拉长，每一缕云彩都化作流动的诗行。天空被染成金红与靛蓝交织的画卷，云层厚重如墨，边缘却镶着金边，仿佛被无形之手精心雕琢。阳光穿透云隙，洒下斑驳的光影，将水面映照得如镜面般璀璨，波光粼粼，与天际的色彩遥相呼应。\n\n远处的山峦在暮色中勾勒出深邃的轮廓，静默而庄严，仿佛守护着这片宁静的水域。水面上，几艘小船悠然漂浮，船影在波光中轻轻摇曳，宛如梦境中的精灵。我心中涌起一股难以言喻的宁静与满足，仿佛所有的喧嚣与烦恼都在这一刻被抛诸脑后。\n\n这景象让我想起儿时与家人共度的夏日黄昏，那时的天空同样绚烂，我们坐在岸边，任由晚风拂面，聆听海浪的低语。如今，虽已成年，但那份纯真的喜悦依旧在心中流淌。我愿将这份美好珍藏于心底，如同收藏一幅永不褪色的画卷，每当心绪烦乱时，便能回望这片宁静的天地，重拾内心的平和与安宁。\n\n在这片光影交织的美景中，我仿佛找到了与自然对话的方式，每一朵云、每一抹光、每一丝波纹都在诉说着生命的韵律。我愿以一颗感恩的心，继续在这片天地间漫步，感受每一次日出日落带来的惊喜与感动。",
      },
    ],
  },
  {
    id: "animals-multi-image",
    title: "多图动物描述",
    description: "这是一个多图展示的样例，包含了暮色山水等画面，用于测试模型对多张图像序列的理解能力。",
    type: "multi-image",
    imageUrls: [
      hfUrl("cat.png"),
      hfUrl("wolf.png"),
      hfUrl("sheep.png"),
      hfUrl("dog.png"),
    ],
    thumbnailUrl: "",
    tags: ["VQA", "ZH", "动物", "细节"],
    questions: [
      {
        id: "ami-q1",
        images: [
          hfUrl("cat.png"),
          hfUrl("wolf.png"),
          hfUrl("sheep.png"),
          hfUrl("dog.png"),
        ],
        text: 
          "# Role\n\n你是一个专业的视觉分析专家和多模态逻辑学家。你能够精准识别多张图片中的细节，并分析图片之间的关联性、差异性和演进逻辑。\n\n# Goals\n1. 细致描述每张图片的核心内容。\n2. 识别图片序列中的共同元素、变化点或逻辑连接。\n3. 根据用户的提问，跨图片提取信息并进行综合判断。\n\n# Constraints\n- 区分描述“客观事实”与“推论”。\n- 如果图片之间有明显的顺序（如步骤、时间流逝），请明确指出。\n- 采用结构化的输出格式（使用 Markdown）。\n\n<br/>\n\n请先分别简述这4张图片的内容，然后总结它们共同表达的主题或场景。请注意寻找图片中反复出现的物体、人物或地点。对比这几张图片。重点分析它们在色彩、构图上的不同之处，并以表格形式呈现对比结果。",
        answer: 
          "### 图片描述\n\n1. **第一张图片**:\n- **核心内容**: 一只猫躺在黑色的编织椅上，背景模糊，主要聚焦在猫的面部和身体。猫的眼睛是黄色的，毛色为灰褐色，带有条纹。猫的表情显得很放松，眼睛半闭，似乎在享受休息。\n- **细节**: 猫的胡须清晰可见，毛发蓬松，椅子的编织纹理明显。\n\n2. **第二张图片**:\n- **核心内容**: 一只狼张大嘴巴，似乎在嚎叫或打哈欠。狼的毛色为灰黑色，带有白色的斑点，背景为自然环境，地面有泥土和石块。\n- **细节**: 狼的牙齿和舌头清晰可见，眼睛闭着，表情显得非常生动。\n\n3. **第三张图片**:\n- **核心内容**: 一群羊在昏暗的环境中，前景是一只小羊羔，背景中有几只成年羊。羊的毛色为白色和浅棕色，背景较为模糊，主要聚焦在羊的面部和身体。\n- **细节**: 小羊羔的毛发蓬松，眼睛明亮，成年羊的毛发较长，背景中有阴影和光线的对比。\n\n4. **第四张图片**:\n- **核心内容**: 一只小狗站在红色的地面上，背景模糊，主要聚焦在小狗的面部和身体。小狗的毛色为浅棕色和白色，尾巴卷曲，表情显得很可爱。\n- **细节**: 小狗的眼睛大而明亮，毛发蓬松，地面的红色与小狗的毛色形成对比。\n\n### 共同表达的主题或场景\n- **主题**: 这四张图片都展示了动物的特写，主要聚焦在动物的面部和身体，表现出动物的自然状态和表情。\n- **场景**: 每张图片的背景都较为模糊，主要突出动物的主体，没有明显的环境细节。\n\n### 对比分析\n\n| 特征 | 第一张图片 | 第二张图片 | 第三张图片 | 第四张图片 |\n|---|---|---|---|---|\n| **动物种类** | 猫 | 狼 | 羊 | 小狗 |\n| **毛色** | 灰褐色带条纹 | 灰黑色带白色斑点 | 白色和浅棕色 | 浅棕色和白色 |\n| **背景** | 黑色编织椅 | 自然环境（泥土和石块） | 昏暗环境 | 红色地面 |\n| **表情** | 放松，眼睛半闭 | 哀嚎或打哈欠，眼睛闭着 | 小羊羔明亮，成年羊模糊 | 可爱，眼睛大而明亮 |\n| **构图** | 主体在前景，背景模糊 | 主体在前景，背景自然 | 主体在前景，背景昏暗 | 主体在前景，背景模糊 |\n\n### 总结\n\n这四张图片通过不同的动物和背景，展示了动物的自然状态和表情，每张图片都突出了动物的主体，背景较为模糊，形成了统一的视觉效果。",
      },
    ],
  },
  {
    id: "meilonggua-ocr",
    title: "玫珑瓜饮品广告",
    description: "这是对于一张玫珑瓜饮品推广海报的OCR.",
    type: "ocr",
    imageUrl: hfUrl("玫珑瓜.png"),
    thumbnailUrl: "",
    tags: ["OCR", "ZH", "Grounding", "广告"],
    questions: [
      {
        id: "mlg-q1",
        text: "输出图中的所有文本及其bbox",
        answer:
          "\"喜茶新品玫珑瓜\": \"[172, 97, 825, 214]\"\n\"西柚口味\": \"[208, 400, 375, 452]\"\n\"芝士口味\":\n\"[420, 333, 579, 383]\"\n\"雪顶口味\": \"[631, 289, 800, 345]\"\n\"神仙吃法\": \"[216, 858, 514, 952]\"\n\"小红书\": \"[785, 950, 854, 981]\"",
      },
    ],
  },
  {
    id: "restaurant-bill",
    title: "餐厅账单",
    description: "餐厅账单关键信息提取。",
    type: "image",
    imageUrl: hfUrl("bill.png"),
    thumbnailUrl: "",
    tags: ["VQA", "ZH", "票据", "生活"],
    questions: [
      {
        id: "rb-q1",
        text: "提取图中的店名、服务员名字、账单号、人数、购买物品的品名数量和金额、总计金额、打印时间，输出json格式，购买物品呈现为list",
        images: [hfUrl("bill.png")],
        answer:
          "```json\n{\n    \"店名\": \"桂满陇（徐汇西岸梦中心店）\",\n    \"服务员名字\": \"孙梦\",\n    \"账单号\": \"202511130143\",\n    \"人数\": \"2\",\n    \"购买物品\": [\n        {\n            \"品名\": \"纸巾\",\n            \"数量\": \"1盒\",\n            \"金额\": \"2.00\"\n        },\n        {\n            \"品名\": \"吴江桂花脆锅巴\",\n            \"数量\": \"1份\",\n            \"金额\": \"10.00\"\n        },\n        {\n            \"品名\": \"冻豆乳话梅番茄\",\n            \"数量\": \"1份\",\n            \"金额\": \"58.00\"\n        },\n        {\n            \"品名\": \"小黄鱼\",\n            \"数量\": \"1份\",\n            \"金额\": \"98.00\"\n        },\n        {\n            \"品名\": \"东坡草扎肉/配酒酿馒头（小份）\",\n            \"数量\": \"1份\",\n            \"金额\": \"28.00\"\n        },\n        {\n            \"品名\": \"泉水五常稻花香白米饭\",\n            \"数量\": \"2碗\",\n            \"金额\": \"6.00\"\n        },\n        {\n            \"品名\": \"菜心摔打鲜牛肉\",\n            \"数量\": \"1份\",\n            \"金额\": \"69.00\"\n        }\n    ],\n    \"总计金额\": \"271.00\",\n    \"打印时间\": \"2025-11-13 19:06:01\"\n}\n```",
      },
    ],
  },
];
