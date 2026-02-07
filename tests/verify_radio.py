import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        # Launch browser with mobile emulation
        iphone_13 = p.devices['iPhone 13']
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(**iphone_13)
        page = await context.new_page()

        # Go to the app
        print("Opening app...")
        await page.goto("http://localhost:3000")

        # Inject CSS to hide Next.js dev overlay if it exists
        await page.add_style_tag(content="nextjs-portal { display: none !important; }")

        # Wait for "Start Radio" button and click it
        print("Waiting for 'Start Radio' button...")
        start_button = page.get_by_role("button", name="Start Radio")
        await start_button.wait_for(state="visible", timeout=10000)
        await start_button.click()
        print("Clicked 'Start Radio'")

        # Wait for main UI
        await page.wait_for_selector("h1", timeout=10000)
        title = await page.locator("h1").inner_text()
        artist = await page.locator("h2").inner_text()
        print(f"Now playing: {title} by {artist}")
        await page.screenshot(path="/home/jules/verification/main_ui.png")

        # Open History
        print("Opening History drawer...")
        history_button = page.get_by_title("Recently Played")
        await history_button.click()

        # Wait for drawer text
        print("Verifying History drawer...")
        await page.wait_for_selector("text=Recently Played", timeout=5000)
        await page.screenshot(path="/home/jules/verification/history_drawer.png")

        # Close History
        await page.mouse.click(10, 10) # Click top left to close drawer
        await asyncio.sleep(1)

        # Open Lyrics
        print("Opening Lyrics view...")
        lyrics_button = page.get_by_title("Lyrics")
        await lyrics_button.click()

        # Wait for Lyrics
        print("Verifying Lyrics view...")
        await page.wait_for_selector("[title='Close']", timeout=10000)
        await page.screenshot(path="/home/jules/verification/lyrics_view.png")

        # Close Lyrics
        print("Closing Lyrics...")
        close_button = page.get_by_title("Close")
        await close_button.click()

        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/final_state.png")

        await browser.close()
        print("Verification complete!")

if __name__ == "__main__":
    asyncio.run(run())
