const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Cache for Instagram data
let instagramCache = {
    data: null,
    timestamp: null,
    expiresIn: 60 * 60 * 1000 // 1 hour cache
};

// Sample demo data for testing
const DEMO_POSTS = [
    {
        id: '1',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '🎬 Creating magic through visual storytelling! Check out our latest production work.',
        like_count: 245,
        comments_count: 18,
        timestamp: new Date().toISOString()
    },
    {
        id: '2',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '📸 Behind the scenes of our latest photo shoot. The creative process in action!',
        like_count: 189,
        comments_count: 12,
        timestamp: new Date().toISOString()
    },
    {
        id: '3',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '✨ Transforming visions into reality. Every frame tells a story.',
        like_count: 312,
        comments_count: 24,
        timestamp: new Date().toISOString()
    },
    {
        id: '4',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '🎥 Lights, camera, action! Another successful day on set.',
        like_count: 276,
        comments_count: 15,
        timestamp: new Date().toISOString()
    },
    {
        id: '5',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '🌟 Capturing authentic moments that connect with audiences.',
        like_count: 198,
        comments_count: 9,
        timestamp: new Date().toISOString()
    },
    {
        id: '6',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1579547621869-0ddb5f237392?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '📹 From concept to completion - we bring ideas to life through innovative media production.',
        like_count: 234,
        comments_count: 14,
        timestamp: new Date().toISOString()
    },
    {
        id: '7',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '🎬 Professional video production that engages and inspires. Your story, our expertise.',
        like_count: 289,
        comments_count: 21,
        timestamp: new Date().toISOString()
    },
    {
        id: '8',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1492619424696-4da28395e0e7?w=600&h=600&fit=crop',
        permalink: 'https://www.instagram.com/strawhut.media',
        caption: '💡 Creative solutions for every project. Let\'s make something amazing together!',
        like_count: 267,
        comments_count: 17,
        timestamp: new Date().toISOString()
    }
];

// Function to fetch Instagram posts using Instagram Graph API
async function fetchInstagramPostsFromAPI() {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID;

    if (!accessToken) {
        console.log('No Instagram access token found. Using demo data.');
        return DEMO_POSTS;
    }

    try {
        // Use Instagram Business Account ID if provided, otherwise try 'me' endpoint
        const endpoint = instagramAccountId
            ? `https://graph.facebook.com/v18.0/${instagramAccountId}/media`
            : `https://graph.instagram.com/me/media`;

        const response = await fetch(
            `${endpoint}?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&access_token=${accessToken}&limit=12`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Instagram API error:', response.status, errorData);
            throw new Error(`Instagram API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for images and videos, format the data
        const posts = data.data
            .filter(post => post.media_type === 'IMAGE' || post.media_type === 'VIDEO' || post.media_type === 'CAROUSEL_ALBUM')
            .slice(0, 12)
            .map(post => ({
                id: post.id,
                media_type: post.media_type,
                media_url: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
                permalink: post.permalink,
                caption: post.caption || '',
                like_count: post.like_count || 0,
                comments_count: post.comments_count || 0,
                timestamp: post.timestamp
            }));

        return posts;
    } catch (error) {
        console.error('Error fetching from Instagram API:', error);
        return DEMO_POSTS;
    }
}

// API endpoint to get Instagram feed
app.get('/api/instagram-feed', async (req, res) => {
    try {
        // Check if we have cached data that's still valid
        const now = Date.now();
        if (instagramCache.data && instagramCache.timestamp &&
            (now - instagramCache.timestamp < instagramCache.expiresIn)) {
            console.log('Returning cached Instagram data');
            return res.json({
                posts: instagramCache.data,
                cached: true,
                lastUpdate: new Date(instagramCache.timestamp).toISOString()
            });
        }

        // Fetch fresh data
        console.log('Fetching fresh Instagram data');
        const posts = await fetchInstagramPostsFromAPI();

        // Update cache
        instagramCache.data = posts;
        instagramCache.timestamp = now;

        res.json({
            posts: posts,
            cached: false,
            lastUpdate: new Date(now).toISOString()
        });
    } catch (error) {
        console.error('Error in /api/instagram-feed:', error);
        res.status(500).json({
            error: 'Failed to fetch Instagram posts',
            posts: DEMO_POSTS // Fallback to demo data
        });
    }
});

// Serve the widget page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'widget.html'));
});

// Serve the demo page
app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Instagram Widget Server running on http://localhost:${PORT}`);
    console.log(`📱 Widget: http://localhost:${PORT}/`);
    console.log(`🎨 Demo: http://localhost:${PORT}/demo`);
    console.log(`💚 Health: http://localhost:${PORT}/health`);

    if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
        console.log('\n⚠️  WARNING: No Instagram access token found!');
        console.log('   The widget will use demo data until you configure your Instagram API credentials.');
        console.log('   Required: INSTAGRAM_ACCESS_TOKEN');
        console.log('   Optional: INSTAGRAM_ACCOUNT_ID (recommended for Business/Creator accounts)');
        console.log('   See DEVELOPER_INSTRUCTIONS.md for setup instructions.\n');
    } else {
        console.log('\n✅ Instagram access token configured!');
        if (process.env.INSTAGRAM_ACCOUNT_ID) {
            console.log('✅ Instagram Business Account ID configured!\n');
        } else {
            console.log('ℹ️  Using default endpoint (consider adding INSTAGRAM_ACCOUNT_ID for Business/Creator accounts)\n');
        }
    }
});

module.exports = app;
