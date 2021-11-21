import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    // date: { type: Date, required: true },
    // start_time: { type: String, required: true },
    date_time: { type: Date, required: true },
    duration: { type: String, required: true },
    event_image_url: { type: String, required: true },
    event_video_url: { type: String, required: true },
    group_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Group' },
    tags: [{ type: String, required: true }],
    recorded_url: { type: String },
    attendees: [{ type: String }]
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;