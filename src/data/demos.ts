export interface DemoQuestion {
  id: string;
  text: string;
  answer: string;
  followUps?: DemoQuestion[];
}

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
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
    videoUrl: hfUrl("华强买瓜.mp4"),
    thumbnailUrl: "",
    tags: ["VQA", "影视", "对话", "经典"],
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
        followUps: [
          {
            id: "hq-q3-1",
            text: "从该时间点，识别主角电动车的车牌号是多少？",
            answer:
              "E7168",
          }
        ]
      },
    ],
  },
  {
    id: "dakaimen",
    title: "大开门",
    description: "一段关于「大开门」的精彩视频片段。",
    videoUrl: hfUrl("大开门.mp4"),
    thumbnailUrl: "",
    tags: ["Temporal Grounding", "生活", "趣味"],
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
    videoUrl: hfUrl("台式卤肉饭.mp4"),
    thumbnailUrl: "",
    tags: ["Temporal Grounding", "生活", "菜谱"],
    questions: [
      {
        id: "dk-q1",
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
    videoUrl: hfUrl("罗哥扇耳光.mp4"),
    thumbnailUrl: "",
    tags: ["VQA", "影视", "经典", "名场面"],
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
    videoUrl: hfUrl("扎染.mp4"),
    thumbnailUrl: "",
    tags: ["Temporal Grounding", "生活", "手工"],
    questions: [
      {
        id: "lg-q1",
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
    videoUrl: hfUrl("Star_Wars.mp4"),
    thumbnailUrl: "",
    tags: ["VQA", "影视", "经典"],
    questions: [
      {
        id: "lg-q1",
        text: "根据柜员的说法，柜台上三个杯子分别对应什么大小的？",
        answer:
          "中杯、大杯和特大杯。",
      },
    ],
  },
];
