import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type FileMetadata = {
    filename : Text;
    size : Nat;
    uploadTimestamp : Time.Time;
    contentType : Text;
  };

  let metadataMap = Map.empty<Text, FileMetadata>();
  let fileBlobMap = Map.empty<Text, Storage.ExternalBlob>();

  public type FileId = Text;

  // Store file and metadata, return file ID
  public shared ({ caller }) func uploadFile(blob : Storage.ExternalBlob, filename : Text, size : Nat, contentType : Text) : async FileId {
    let fileId = filename;
    let metadata : FileMetadata = {
      filename;
      size;
      uploadTimestamp = Time.now();
      contentType;
    };

    metadataMap.add(fileId, metadata);
    fileBlobMap.add(fileId, blob);

    fileId;
  };

  // Retrieve file content and metadata by ID
  public query ({ caller }) func getFile(fileId : FileId) : async ?{
    blob : Storage.ExternalBlob;
    metadata : FileMetadata;
  } {
    switch (metadataMap.get(fileId), fileBlobMap.get(fileId)) {
      case (null, _) { null };
      case (_, null) { null };
      case (?meta, ?blob) {
        ?{
          blob;
          metadata = meta;
        };
      };
    };
  };

  // List all files with metadata
  public query ({ caller }) func listFiles() : async [{
    fileId : FileId;
    metadata : FileMetadata;
  }] {
    metadataMap.entries().map<(Text, FileMetadata), { fileId : FileId; metadata : FileMetadata }>(
      func(entry) {
        let (fileId, metadata) = entry;
        {
          fileId;
          metadata;
        };
      }
    ).toArray();
  };
};

