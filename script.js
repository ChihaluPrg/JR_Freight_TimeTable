document.addEventListener("DOMContentLoaded", () => {
    const timetable = [
      { station: "吹上", day: "平日", direction: "上り", time: "11:52", train: "EF210", content: "石油返空" },
      { station: "吹上", day: "平日", direction: "上り", time: "15:26", train: "EF210", content: "石油返空" },
    ];

    const nextTrainElement = document.querySelector(".nexttuuka p:nth-child(1)");
    const countdownElement = document.querySelector(".nexttuuka p:nth-child(2)");

    function updateNextTrain() {
      const now = new Date();
      const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      let nextTrain = null;
      let minDiff = Infinity;

      timetable.forEach((train) => {
        const [trainHour, trainMinute] = train.time.split(":").map(Number);
        const trainTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), trainHour, trainMinute);
        const diff = (trainTime - now) / 1000; // 秒で差分を計算

        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextTrain = train;
        }
      });

      if (nextTrain) {
        const hours = Math.floor(minDiff / 3600);
        const minutes = Math.floor((minDiff % 3600) / 60);
        const seconds = Math.floor(minDiff % 60);

        nextTrainElement.textContent = `次通過列車：${nextTrain.time} (${nextTrain.direction}, ${nextTrain.train}, ${nextTrain.content})`;
        countdownElement.textContent = `通過まで残り：${hours}時間${minutes}分${seconds}秒`;
      } else {
        nextTrainElement.textContent = "次通過列車：なし";
        countdownElement.textContent = "通過まで残り：-";
      }
    }

    // 初期化と定期的な更新（1秒ごと）
    updateNextTrain();
    setInterval(updateNextTrain, 1000);
  });