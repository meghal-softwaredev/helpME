import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Meghal',
      email: 'meghal@example.com',
      password: bcrypt.hashSync('1234', 8)
    },
    {
      name: 'Umang',
      email: 'umang@example.com',
      password: bcrypt.hashSync('1234', 8)
    },
    {
      name: 'Jesson',
      email: 'jesson@example.com',
      password: bcrypt.hashSync('1234', 8)
    },
    {
      name: 'James',
      email: 'james@example.com',
      password: bcrypt.hashSync('1234', 8)
    },
    {
      name: 'Sam',
      email: 'sam@example.com',
      password: bcrypt.hashSync('1234', 8)
    },
    {
      name: 'Albert',
      email: 'albert@example.com',
      password: bcrypt.hashSync('1234', 8)
    },
    {
      name: 'Walter',
      email: 'walter@example.com',
      password: bcrypt.hashSync('1234', 8)
    }
  ],
  categories: [
    {
      name: 'Coding'
    },
    {
      name: 'Car'
    },
    {
      name: 'Food'
    }
  ],
  feeds: [
    {
      title: `Facebook's react.js-- object is not a function`,
      description: `Going along Facebook's read.js tutorial, I get this error:
        Uncaught TypeError: Property 'CommentList' of object [object Object] is not a function`,
      user_id: "618dcf88205f076ec8f55d11",
      feed_category_id: "6190afe0ee6fb3c345e5c6f9",
      tags: [`React`]
    },
    {
      title: `Why do my car cut off when I slow down or come to a complete stop?`,
      description: `Why do my car cut off when I slow down or come to a complete stop
        Mechanic's Assistant: What is the make/model/year of your car?
        2007 Honda Accord
        Mechanic's Assistant: Are you fixing your Accord yourself? What have you tried so far?
        No I took it to a shop but it was for something different and I thought that would make it stop cutting off`,
      user_id: "618dd0f544fed0b263668d6c",
      feed_category_id: "6190afe0ee6fb3c345e5c6fa",
      tags: [`2007`, `Honda`, `Accord`]
    },
    {
      title: `What to Eat With Hummus?`,
      description: `You’d be hard-pressed to find a spread (or is it a dip?) more universally loved than . The delicious blend of mashed chickpeas, tahini, oils, and spices is a welcome sight on any table. But, after a while,  gets boring. How many different foods can you even eat hummus? `,
      user_id: "618dee2b0b54ac2ca484ba21",
      category_id: "6190afe0ee6fb3c345e5c6fb",
      tags: [`Hummus`]
    }
  ],
  feedAnswers: [
    {
      answer: `There are two main issues going on here.
        First, when React.renderComponent is called, CommentList hasn't been assigned, and is therefore still undefined. This is causing an error because CommentBox's render function refers to
        <CommentList />
        which jsx compiles to
        CommentList(null)`,
      upvotes: 10
    },
    {
      answer: `I’m very sorry that you’re having this issue and together, we will get this figured out. I will need your help too because I can’t see, touch, hear or smell anything that’s going on with your vehicle. We may also require some specialized testing tools in order to assist us in diagnosing the problems due to the complexity of today’s vehicles. JA will offer a phone call to you at an additional fee, it’s your choice. Please be patient with my replies, I reply back in question order received. If I send you an attachment, I will tell you, BUT, you will NOT get it on a phone; you must be on a tablet or PC. Please let me know when you are satisfied with my answers too so we can close out your question
        Okay, so the shop should scan the computer checking for current and pending codes as well as check your idle speed motor/throttle body.
        They should also check for vacuum leaks too.
        This data can help a lot finding that stalling issue.
        Thanks again and all the best:)`,
      user_id: 6,
    },
    {
      answer: `You can’t go wrong with a classic. Whether it’s white or wheat, hard or soft, pita bread and hummus are always a perfect pairing.`,
      upvotes: 20
    }
  ],
  groups: [
    {
      title: `Agile`,
      description: `Agile is a time boxed, iterative approach to software delivery that builds software incrementally from the start of the project, instead of trying to deliver it all at once near the end`,
      user_id: "618dcf88205f076ec8f55d11",
      category_id: "6190afe0ee6fb3c345e5c6fb",
      group_url: "http://localhost:3000/assets/group/agile.png",
      followers: [``]
    },
  ],
  events: [
    {
      title: `Agile approach to cyber security`,
      description: `Cybersecurity in an agile development environment means having a comprehensive approach to identifying any gaps or concerns. This includes investing in automation where possible for testing and scanning, along with simulated attacks to ensure security at every step of development`,
      user_id: "618dcf88205f076ec8f55d11",
      start_time: new Date(),
      end_time: new Date(),
      event_url: "http://localhost:3000/assets/group/agile.png",
      group_id: "61944880bf8a7111c03a36f5",
      tags: [`Agile`],
      attendees: [``]
    },
  ],
};
export default data;