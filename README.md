# \# Event Ticketing Portal

# 

# Individual frontend for the Event Ticketing and Venue Booking System — SWC3633/SWC4443 Web API Development final project.

# 

# \## Author

# \- \*\*Name:\*\* AHMAD FARHAN FITRI BIN ABD RAHIM

# \- \*\*Student ID:\*\* AM2412018324

# \- \*\*Course:\*\* SWC3633/SWC4443 Web API Development

# 

# \## What This Is

# A light-themed dashboard frontend that consumes the shared RESTful API built by the group. It supports three roles — Administrator, Staff/Organiser, and Customer — with role-aware navigation, dashboard statistics, and CRUD operations.

# 

# \## Tech Stack

# \- HTML5, CSS3

# \- Vanilla JavaScript (ES6+)

# \- Fetch API

# \- localStorage for token storage

# \- External API: Open-Meteo (weather forecast, accessed via the shared backend)

# 

# \## Pages

# | File | Purpose |

# |------|---------|

# | `index.html` | Login (Bearer token authentication) |

# | `dashboard.html` | Role-aware statistics |

# | `events.html` | Events list with search, filter, sort, weather |

# | `event-form.html` | Create / edit event |

# | `venues.html` | Venue management (admin only) |

# | `bookings.html` | Bookings with role-filtered visibility |

# | `users.html` | User management (admin only) |

# 

# \## API Endpoints Used

# \- `POST /auth/login.php` — Login

# \- `POST /auth/logout.php` — Logout

# \- `GET /api/events/` — List events (with `?limit=50`)

# \- `POST /api/events/index.php` — Create event

# \- `PUT /api/events/index.php?id=X` — Update event

# \- `DELETE /api/events/index.php?id=X` — Cancel event

# \- Similar CRUD for users, venues, bookings

# \- `GET /api/weather/?event\_id=X` — Weather (Open-Meteo)

# 

# \## Test Accounts

# | Role | Email | Password |

# |------|-------|----------|

# | Admin | admin@gmail.com | admin123 |

# | Staff | staff1@gmail.com | staff123 |

# | Customer | customer1@gmail.com | customer123 |

# 

# \## Local Setup

# 1\. Install XAMPP and start Apache + MySQL

# 2\. Ensure the backend is placed at `C:\\xampp\\htdocs\\event\_ticketing\_api\\`

# 3\. Ensure the database `event\_ticketing\_db` exists (see backend repo)

# 4\. Copy this folder to `C:\\xampp\\htdocs\\ticketing\_portal\_1\\`

# 5\. Open `http://localhost/ticketing\_portal\_1/` in a browser

# 

# \## Evidence

# Screenshots in the `evidence/` folder demonstrate login, role-based UI, CRUD workflows, weather integration, and error handling.

# 

# \## Video Demonstration

# \[INSERT YOUTUBE LINK]

