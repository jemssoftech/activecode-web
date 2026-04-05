"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import CTA from "@/components/CTA";
import data from "@/utils/data.json";

type PortfolioSingleProps = {
  id: string;
};

// Lightbox Component for Gallery
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 
          hover:bg-white/20 transition-colors"
        aria-label="Close gallery"
      >
        <XMarkIcon className="w-6 h-6 text-white" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 p-3 rounded-full bg-white/10 
          hover:bg-white/20 transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl h-[80vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </motion.div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 p-3 rounded-full bg-white/10 
          hover:bg-white/20 transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>

      {/* Thumbnail Strip */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 
        bg-black/50 rounded-xl backdrop-blur-sm max-w-[90vw] overflow-x-auto"
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to this image
            }}
            className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 
              transition-all duration-300 ${
                idx === currentIndex
                  ? "ring-2 ring-primary scale-105"
                  : "opacity-50 hover:opacity-100"
              }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Gallery Grid Component
function GallerySection({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) {
  if (!images || images.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-16"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary" />
        Project Gallery
      </h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 
                group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 
              transition-colors duration-300 flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm 
                  flex items-center justify-center opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Image Number Badge */}
            <div
              className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm 
              rounded-md text-xs text-white/80"
            >
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button (if more than 8 images) */}
      {images.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => onImageClick(0)}
            className="px-6 py-3 border border-white/20 rounded-full 
              text-white/80 hover:text-white hover:border-primary 
              transition-colors"
          >
            View All {images.length} Images
          </button>
        </div>
      )}
    </motion.section>
  );
}

// Masonry Gallery (Alternative Style)
function MasonryGallery({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) {
  if (!images || images.length === 0) return null;

  // Create masonry pattern
  const getSpanClass = (index: number) => {
    const pattern = [
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-2", // Tall
      "col-span-1 row-span-1", // Small
      "col-span-2 row-span-1", // Wide
    ];
    return pattern[index % pattern.length];
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-16"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary" />
        Project Gallery
        <span className="text-sm font-normal text-white/50 ml-2">
          ({images.length} images)
        </span>
      </h2>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer 
              ${getSpanClass(index)}`}
            onClick={() => onImageClick(index)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 
                group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent 
              to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Zoom Icon */}
            <div
              className="absolute inset-0 flex items-center justify-center 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md 
                flex items-center justify-center border border-white/20"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function PortfolioSingle({ id }: PortfolioSingleProps) {
  const { portfolio } = data;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = portfolio.find((item) => String(item.id) === String(id));

  // Get current project index for prev/next navigation
  const currentIndex = portfolio.findIndex(
    (item) => String(item.id) === String(id),
  );
  const prevProject = portfolio[currentIndex - 1];
  const nextProject = portfolio[currentIndex + 1];

  if (!project) {
    return (
      <main className="pt-32 pb-20">
        <div className="container xl:max-w-[1320px] mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary 
              text-black font-medium rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  // Gallery images - combine main image with gallery
  const galleryImages = [project.image, ...(project.gallery || [])].filter(
    Boolean,
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  // Keyboard navigation for lightbox
  if (typeof window !== "undefined") {
    window.onkeydown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
    };
  }
  console.log(project);
  return (
    <main className="pt-32 pb-20">
      <div className="container xl:max-w-[1320px] mx-auto px-4">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span
              className="px-3 py-1 bg-primary/10 border border-primary/30 
              rounded-full text-primary text-sm"
            >
              {project.year}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">{project.client}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mb-6">
            {project.subtitle || project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white/5 border border-white/10 
                  rounded-full text-sm text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-12 
            cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 
              group-hover:scale-105"
            priority
            sizes="100vw"
          />

          {/* View Full Image Overlay */}
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/30 
            transition-colors duration-300 flex items-center justify-center"
          >
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity 
              duration-300 flex items-center gap-2 px-4 py-2 bg-white/10 
              backdrop-blur-sm rounded-full text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              View Full Image
            </div>
          </div>
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* About */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                About the Project
              </h2>
              {project.fullDescription?.map((paragraph, index) => (
                <p key={index} className="text-white/70 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <div className="grid md:grid-cols-2 gap-6">
                {project.challenge && (
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                    <h3 className="text-lg font-bold mb-3 text-red-400">
                      The Challenge
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                    <h3 className="text-lg font-bold mb-3 text-green-400">
                      Our Solution
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Key Results
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent 
                        border border-white/10 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        {result.value}
                      </div>
                      <div className="text-sm text-white/50">
                        {result.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Project Info Card */}
            <div
              className="p-6 rounded-2xl border border-white/10 
              bg-gradient-to-br from-white/5 to-transparent sticky top-24"
            >
              <h3 className="text-xl font-bold mb-6">Project Info</h3>

              <div className="space-y-5">
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <span className="text-sm text-white/50">Client</span>
                  <span className="font-medium text-right">
                    {project.client}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <span className="text-sm text-white/50">Year</span>
                  <span className="font-medium">{project.year}</span>
                </div>

                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <span className="text-sm text-white/50">Duration</span>
                  <span className="font-medium">{project.duration}</span>
                </div>

                {project.services && (
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-sm text-white/50 block mb-2">
                      Services
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.services)
                        ? project.services
                        : [project.services]
                      ).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 rounded text-xs text-primary"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.technologies && (
                  <div>
                    <span className="text-sm text-white/50 block mb-2">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.technologies)
                        ? project.technologies
                        : [project.technologies]
                      ).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery Section - Choose one style */}
        {galleryImages.length > 1 && (
          <MasonryGallery images={galleryImages} onImageClick={openLightbox} />
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-20">
        <CTA />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={galleryImages}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onPrev={goToPrevImage}
            onNext={goToNextImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
