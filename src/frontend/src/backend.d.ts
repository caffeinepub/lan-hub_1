import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface FileMetadata {
    contentType: string;
    size: bigint;
    uploadTimestamp: Time;
    filename: string;
}
export type FileId = string;
export interface backendInterface {
    getFile(fileId: FileId): Promise<{
        metadata: FileMetadata;
        blob: ExternalBlob;
    } | null>;
    listFiles(): Promise<Array<{
        metadata: FileMetadata;
        fileId: FileId;
    }>>;
    uploadFile(blob: ExternalBlob, filename: string, size: bigint, contentType: string): Promise<FileId>;
}
