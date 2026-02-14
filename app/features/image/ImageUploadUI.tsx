"use client";

import { useState, useRef, useCallback } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { ImageUploadElement, ImageElement } from "../../core/EditorTypes";
import Image from "next/image";

interface ImageUploadUIProps {
    element: ImageUploadElement;
}

const ImageUploadUI = ({ element }: ImageUploadUIProps) => {
    const editor = useSlateStatic();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFile = useCallback((selectedFile: File) => {
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) {
                handleFile(droppedFile);
            }
        },
        [handleFile]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
                handleFile(selectedFile);
            }
        },
        [handleFile]
    );

    const handleUpload = useCallback(async () => {
        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            const imageUrl = data.url;

            // Get the path of this element and transform it into an image
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes<ImageElement>(
                editor,
                { type: "image", url: imageUrl },
                { at: path }
            );
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    }, [file, editor, element]);

    const handleCancel = useCallback(() => {
        // Clean up preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        // Remove the upload element
        const path = ReactEditor.findPath(editor, element);
        Transforms.removeNodes(editor, { at: path });
    }, [editor, element, previewUrl]);

    const handleBrowseClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <div className="image-upload-container">
            {!previewUrl ? (
                <div
                    className={`image-upload-dropzone ${isDragOver ? "drag-over" : ""}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />
                    <div className="dropzone-content">
                        <svg
                            className="upload-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                            />
                        </svg>
                        <p className="dropzone-text">
                            Drag and drop an image here, or{" "}
                            <button
                                type="button"
                                onClick={handleBrowseClick}
                                className="browse-link"
                            >
                                browse
                            </button>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="cancel-btn-small"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="image-preview-container">
                    <div className="image-preview-wrapper">
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            width={400}
                            height={300}
                            style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                    <div className="upload-actions">
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading}
                            className="upload-btn"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={uploading}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadUI;
