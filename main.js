// スリープを実現する関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// メインの処理
async function blockPromotionAccount() {
  const cellInnerDivElements = document.querySelectorAll('[data-testid="cellInnerDiv"]');

  for (const element of cellInnerDivElements) {
    const spans = element.querySelectorAll('span');
    const hasPromotion = Array.from(spans).some(span => span.textContent.includes('プロモーション'));

    if (hasPromotion) {
      const userBlocks = element.querySelectorAll('div[data-testid="User-Name"] > div')
      const userName = userBlocks[0].innerText;
      const userID = userBlocks[1].querySelector('span').innerText;
      console.log(`プロモーションアカウントをブロックします: ${userName} (${userID})`);
      const caretElement = element.querySelector('div[data-testid="caret"]');
      if (caretElement) {
        caretElement.click();
        await sleep(1000); // 1秒待つ

        // ポップアップ内のブロックメニュー項目をクリック
        const blockMenu = document.querySelector('div[data-testid="block"]');
        if (blockMenu) {
          blockMenu.click();
          await sleep(1000); // 確認用のポップアップが表示されるのを待つ

          // 確認用ポップアップ内の「確認」ボタンをクリック
          const confirmButton = document.querySelector('div[data-testid="confirmationSheetConfirm"]');
          if (confirmButton) {
            confirmButton.click();
            await sleep(1000); // 最終ポップアップが表示されるのを待つ

            // 「後で試す」をクリック
            const tryLaterSpan = [...document.querySelectorAll('div[data-testid="sheetDialog"] span')].find(span => span.textContent === '後で試す');
            if (tryLaterSpan) {
                tryLaterSpan.click();
            }
          }
        }
      }
      // break; // 最初の一致要素の処理が終わったらループを抜ける
    }
  }
}

setInterval(blockPromotionAccount, 10000);
