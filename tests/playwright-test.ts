import { test as base, Page, TestInfo } from '@playwright/test';
import path from 'path';

function getOutputPath(testInfo: TestInfo, shouldCompress: boolean) {
  const slug = testInfo
    .outputDir
    .split('/')
    .slice(-1)[0]
    .split('-')
    .slice(0, -1)
    .join('-');

  const fileSegment = shouldCompress ? `${slug}.zip` : `${slug}/main.har`;

  const snapshotPath = path.join(path.dirname(testInfo.file), 'dumps', fileSegment);

  return snapshotPath;
}

const DEFAULT_OPTIONS: TestOptions['customHarParams'] = {
  enabled: true,
  compress: Boolean(process.env.SAVE_HAR_AS_ZIP),
  options: {
    update: Boolean(process.env.UPDATE_DUMPS),
  },
};

export type TestOptions = {
  readonly customHarParams: {
    readonly enabled: boolean;
    readonly compress: boolean;
    readonly options: Parameters<Page['routeFromHAR']>[1];
  };
};

export const test = base.extend<TestOptions>({
  customHarParams: [DEFAULT_OPTIONS, { option: true }],

  async page({ page, customHarParams }, use, testInfo) {
    if (customHarParams.enabled) {
      const outputPath = getOutputPath(testInfo, customHarParams.compress);

      await page.routeFromHAR(outputPath, {
        ...customHarParams.options,
        url: /https:\/\/localhost:3000\..+/,
      });
    }

    await use(page); // base functionality
  },
});
