import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'jobOpening',
  title: 'Tuyển Dụng',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề của công việc',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Địa điểm',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
    },
  },
});