const fs = require('fs');
const { getNow, mkDir, saveImg } = require('../libs/common');

// モック関数を作成
jest.mock('fs');

// getNow関数のテスト
describe('getNow', () => {
  test('should return a formatted date string', () => {
    // テスト用の日時を指定
    const mockDate = new Date('2023-01-01T12:34:56');
    jest.spyOn(global, 'Date').mockImplementationOnce(() => mockDate);
    const result = getNow();
    expect(result).toBe('2023-01-01_213456');  // 日本時間に変換された日時のフォーマット
    // モックの解除
    jest.restoreAllMocks();
  });
});

// mkDir関数のテスト
describe('mkDir', () => {

    // 各テストケースごとにモックの状態をリセット
    beforeEach(() => {
        jest.clearAllMocks();
      });

    // 作成するディレクトリが存在しないケース
    test('should create a directory if it does not exist', () => {
      const mockExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      const mockMkdirSync = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
      mkDir('testDirectory');
      expect(mockExistsSync).toHaveBeenCalledWith('testDirectory');
      expect(mockMkdirSync).toHaveBeenCalledWith('testDirectory');
    });
  
    // 作成するディレクトリがすでに存在するケース
    test('should not create a directory if it already exists', () => {
      const mockExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      const mockMkdirSync = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
      mkDir('existingDirectory');
      expect(mockExistsSync).toHaveBeenCalledWith('existingDirectory');
      expect(mockMkdirSync).not.toHaveBeenCalled();
    });
});

// saveImg関数のテスト
describe('saveImg', () => {

  // 画像保存が失敗するケース
  test('should handle errors during image saving', async () => {
    const data = {
      img: ''
    }
    const result = await saveImg(data);
    expect(result).toBe(false);
  });
});
