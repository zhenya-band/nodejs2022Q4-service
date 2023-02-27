import { ConsoleLogger } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, renameSync, statSync } from 'fs';
import { join } from 'path';

export class CustomLogger extends ConsoleLogger {
  private readonly logDir = 'src/logs';
  private readonly logFile = 'app.log';
  private readonly maxFileSize = Number(process.env.MAX_LOG_FILE_SIZE_KB) * 1024;
  private writeStream: NodeJS.WritableStream;
  private errorWriteStream: NodeJS.WritableStream;

  private logLevel = Number(process.env.LOG_LEVEL) || 3;

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
    if (this.logLevel >= 1) {
      super.error(message, stack, context);
      this.writeLogToFile(message);
      this.writeErrorLogToFile(message);
    }
  }

  warn(message: string) {
    if (this.logLevel >= 2) {
      super.warn(message);
      this.writeLogToFile(message);
    }
  }

  debug(message: string) {
    if (this.logLevel >= 3) {
      super.debug(message);
      this.writeLogToFile(message);
    }
  }

  verbose(message: string) {
    if (this.logLevel >= 4) {
      super.verbose(message);
      this.writeLogToFile(message);
    }
  }

  private createWriteStream() {
    const path = join(this.logDir, this.logFile);
    const errorsPath = join(this.logDir, 'app-errors.log');

    this.writeStream = createWriteStream(path, { flags: 'a' });
    this.errorWriteStream = createWriteStream(errorsPath, { flags: 'a' });
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

  private writeErrorLogToFile(message: string) {
    this.checkLogFileSize();

    const formattedMessage = `${this.getTimestamp()} ${message}\n`;
    this.errorWriteStream.write(formattedMessage);
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
