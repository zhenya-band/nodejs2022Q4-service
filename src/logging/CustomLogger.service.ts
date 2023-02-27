import { ConsoleLogger } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, renameSync, statSync } from 'fs';
import { join } from 'path';

export class CustomLogger extends ConsoleLogger {
  private readonly logDir = 'src/logs';
  private readonly logFile = 'app.log';
  private readonly maxFileSize = Number(process.env.MAX_LOG_FILE_SIZE_KB) * 1024;
  private writeStream: NodeJS.WritableStream;

  constructor() {
    super();
    this.checkLogDirectoryExists();
    this.createWriteStream();
  }

  log(message: string) {
    super.log(message);
    this.writeLogToFile(message);
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    this.writeLogToFile(message);
  }

  warn(message: string) {
    super.warn(message);
    this.writeLogToFile(message);
  }

  debug(message: string) {
    super.debug(message);
    this.writeLogToFile(message);
  }

  verbose(message: string) {
    super.verbose(message);
    this.writeLogToFile(message);
  }

  private createWriteStream() {
    const path = join(this.logDir, this.logFile);
    this.writeStream = createWriteStream(path, { flags: 'a' });
  }

  private checkLogDirectoryExists() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir);
    }
  }

  private writeLogToFile(message: string) {
    this.checkLogFileSize();

    const formattedMessage = `${this.getTimestamp()} ${message}\n`;
    this.writeStream.write(formattedMessage);
  }

  private checkLogFileSize() {
    const logFilePath = join(this.logDir, this.logFile);
    const stats = statSync(logFilePath);
    const fileSizes = stats.size;

    if (fileSizes > this.maxFileSize) {
      this.rotateLogFile();
    }
  }

  private rotateLogFile() {
    this.writeStream.end();
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const oldLogFile = join(this.logDir, `${this.logFile}-${timestamp}`);
    renameSync(join(this.logDir, this.logFile), oldLogFile);

    this.createWriteStream();
  }

  protected getTimestamp() {
    return new Date().toISOString().slice(0, 10);
  }
}
