import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Listen for console events
        page.on("console", lambda msg: print(f"CONSOLE [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
        page.on("requestfailed", lambda req: print(f"REQUEST FAILED [{req.url}]: {req.failure}"))
        
        # Go to the local page
        print("Navigating to http://localhost:8080/frontend/pages/admin-dashboard.html")
        await page.goto("http://localhost:8080/frontend/pages/admin-dashboard.html", wait_until="networkidle")
        
        print("Waiting for map...")
        # Wait a bit for everything to settle
        await page.wait_for_timeout(3000)
        
        # Take a screenshot to see if the map is visible
        await page.screenshot(path="screenshot_admin_map.png", full_page=True)
        print("Screenshot saved to screenshot_admin_map.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
