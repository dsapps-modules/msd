<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vitrine Clean | Coopera</title>
    <style>
        :root {
            --bg: #eef3fb;
            --panel: #ffffff;
            --panel-soft: #f8fbff;
            --text: #102033;
            --muted: #6b7a90;
            --line: #dbe4f0;
            --blue: #2563eb;
            --cyan: #38bdf8;
            --green: #16a34a;
            --amber: #f59e0b;
            --violet: #7c3aed;
            --shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
            --shadow-soft: 0 8px 20px rgba(15, 23, 42, 0.045);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: var(--text);
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, 0.06), transparent 22%),
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 18%),
                linear-gradient(180deg, #fbfdff 0%, var(--bg) 100%);
        }

        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; display: block; }

        .shell {
            min-height: 100vh;
            padding: 18px;
        }

        .page {
            max-width: 1440px;
            margin: 0 auto;
            display: grid;
            gap: 16px;
        }

        .topbar,
        .nav,
        .hero,
        .section,
        .footer,
        .card {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid rgba(219, 228, 240, 0.95);
            border-radius: 24px;
            box-shadow: var(--shadow);
            backdrop-filter: blur(10px);
        }

        .topbar {
            padding: 12px 16px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .topbar strong {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .04em;
        }

        .topbar span {
            color: var(--muted);
            font-size: 13px;
        }

        .pills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .pill {
            display: inline-flex;
            align-items: center;
            min-height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #0f3d8c;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .05em;
            text-transform: uppercase;
        }

        .nav {
            padding: 14px 16px;
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 14px;
            align-items: center;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-mark {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            font-weight: 800;
            box-shadow: 0 10px 22px rgba(37, 99, 235, 0.16);
        }

        .brand-text strong {
            display: block;
            font-size: 16px;
            line-height: 1.15;
            font-weight: 700;
        }

        .brand-text span {
            display: block;
            margin-top: 3px;
            color: var(--muted);
            font-size: 12px;
        }

        .search {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 10px;
            align-items: center;
        }

        .search-box {
            display: flex;
            align-items: center;
            gap: 10px;
            min-height: 52px;
            padding: 0 14px;
            border-radius: 16px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
        }

        .search-box input {
            width: 100%;
            border: 0;
            outline: 0;
            background: transparent;
            color: var(--text);
            font: inherit;
            font-size: 14px;
        }

        .search-box input::placeholder { color: #94a3b8; }

        .btn {
            appearance: none;
            border: 0;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 14px;
            padding: 0 16px;
            min-height: 44px;
            font-weight: 700;
            transition: transform .15s ease, opacity .15s ease, background .15s ease;
        }

        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            box-shadow: 0 10px 20px rgba(37, 99, 235, 0.14);
        }
        .btn-secondary {
            background: rgba(37, 99, 235, 0.07);
            color: #0f3d8c;
            border: 1px solid rgba(37, 99, 235, 0.10);
        }

        .quick-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 8px;
        }

        .quick-link {
            display: inline-flex;
            align-items: center;
            min-height: 40px;
            padding: 0 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #243447;
            font-size: 12px;
            font-weight: 600;
        }

        .hero-stage {
            display: block;
        }

        .hero-carousel {
            padding: 18px;
        }

        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.10);
            color: #dbeafe;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .06em;
            text-transform: uppercase;
        }

        .hero h1 {
            margin: 16px 0 12px;
            max-width: 700px;
            font-size: clamp(32px, 4.2vw, 56px);
            line-height: 1;
            letter-spacing: -0.035em;
            font-weight: 700;
        }

        .hero p {
            margin: 0;
            max-width: 750px;
            color: rgba(226, 232, 240, 0.90);
            font-size: 15px;
            line-height: 1.65;
            font-weight: 400;
        }

        .hero-search {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 10px;
            margin-top: 20px;
            padding: 12px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .hero-search input {
            border: 0;
            outline: 0;
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
            border-radius: 14px;
            min-height: 48px;
            padding: 0 14px;
            font: inherit;
            font-size: 14px;
        }

        .hero-search input::placeholder { color: rgba(226, 232, 240, 0.72); }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 16px;
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            margin-top: 18px;
        }

        .stat-card {
            padding: 14px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .stat-card strong {
            display: block;
            font-size: 22px;
            letter-spacing: -0.03em;
            font-weight: 700;
        }

        .stat-card span {
            display: block;
            margin-top: 5px;
            color: rgba(226, 232, 240, 0.82);
            font-size: 12px;
            line-height: 1.5;
        }

        .carousel-card,
        .section-body,
        .footer {
            padding: 18px;
        }

        .carousel-card {
            display: grid;
            gap: 14px;
            overflow: hidden;
            box-shadow: var(--shadow-soft);
        }

        .carousel-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            flex-wrap: wrap;
        }

        .carousel-controls {
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .carousel-btn {
            width: 40px;
            height: 40px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #334155;
            cursor: pointer;
            display: grid;
            place-items: center;
            transition: transform .15s ease, background .15s ease;
        }

        .carousel-btn:hover {
            transform: translateY(-1px);
            background: #f8fbff;
        }

        .carousel-viewport {
            overflow: hidden;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
        }

        .carousel-track {
            display: flex;
            will-change: transform;
            transition: transform .35s ease;
        }

        .carousel-slide {
            min-width: 100%;
            display: grid;
            grid-template-rows: minmax(420px, 1fr);
        }

        .slide-visual {
            position: relative;
            padding: 28px;
            color: #fff;
            overflow: hidden;
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.7fr);
            gap: 18px;
            align-items: end;
            min-height: 420px;
        }

        .slide-visual::after {
            content: "";
            position: absolute;
            inset: auto -60px -70px auto;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.10);
        }

        .slide-badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.16);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .05em;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
        }

        .slide-copy {
            position: relative;
            z-index: 1;
            max-width: 760px;
        }

        .slide-copy h3 {
            margin: 0 0 6px;
            font-size: clamp(30px, 4vw, 54px);
            line-height: .96;
            font-weight: 700;
            letter-spacing: -0.03em;
        }

        .slide-copy p {
            margin: 0;
            color: rgba(226, 232, 240, 0.90);
            font-size: 15px;
            line-height: 1.65;
            max-width: 700px;
        }

        .slide-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
        }

        .slide-meta {
            display: grid;
            gap: 10px;
            position: relative;
            z-index: 1;
            align-self: stretch;
        }

        .meta-card {
            padding: 14px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(8px);
        }

        .meta-card strong {
            display: block;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: .05em;
            text-transform: uppercase;
            color: rgba(226, 232, 240, 0.92);
            margin-bottom: 6px;
        }

        .meta-card span {
            display: block;
            font-size: 15px;
            line-height: 1.45;
            color: #fff;
        }

        .slide-body {
            padding: 16px 18px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
        }

        .slide-body h4 {
            margin: 0;
            font-size: 17px;
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .slide-body p {
            margin: 0;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.55;
            max-width: 740px;
        }

        .carousel-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
        }

        .carousel-dots {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }

        .dot-btn {
            width: 10px;
            height: 10px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: #cbd5e1;
            cursor: pointer;
            transition: transform .15s ease, background .15s ease, width .15s ease;
        }

        .dot-btn.active {
            width: 26px;
            border-radius: 999px;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
        }

        .carousel-meta {
            color: var(--muted);
            font-size: 12px;
        }

        .promo-body h2,
        .section-head h2,
        .points h3,
        .support h3 {
            margin: 0 0 8px;
            letter-spacing: -0.03em;
            font-weight: 700;
        }

        .promo-body h2 { font-size: 22px; }
        .section-head h2 { font-size: 18px; }
        .points h3,
        .support h3 { font-size: 20px; }

        .promo-body p,
        .section-head p,
        .points p,
        .support p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
            font-weight: 400;
        }

        .section {
            overflow: hidden;
        }

        .section-head {
            padding: 18px 18px 12px;
            border-bottom: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            flex-wrap: wrap;
        }

        .section-body {
            padding-top: 16px;
        }

        .category-grid,
        .feature-grid {
            display: grid;
            gap: 14px;
        }

        .category-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .feature-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

        .category-card,
        .product-card,
        .feature-card {
            border-radius: 20px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            box-shadow: none;
        }

        .category-card {
            position: relative;
            overflow: hidden;
            min-height: 164px;
            padding: 16px;
            display: grid;
            align-content: space-between;
        }

        .category-card::after {
            content: "";
            position: absolute;
            right: -36px;
            bottom: -40px;
            width: 128px;
            height: 128px;
            border-radius: 50%;
            background: var(--accent-soft, rgba(37, 99, 235, 0.10));
        }

        .category-icon {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            display: grid;
            place-items: center;
            background: var(--accent-soft, rgba(37, 99, 235, 0.10));
            color: var(--accent, var(--blue));
            font-size: 18px;
            margin-bottom: 10px;
        }

        .category-card h3,
        .product-body h4,
        .feature-card h3 {
            margin: 0 0 6px;
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .category-card h3 { font-size: 16px; }
        .product-body h4 { font-size: 16px; }
        .feature-card h3 { font-size: 16px; }

        .category-card p,
        .product-art p,
        .feature-card p {
            margin: 0;
            color: var(--muted);
            line-height: 1.55;
            font-size: 13px;
        }

        .category-card .cta,
        .feature-card .cta {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            width: fit-content;
            padding: 8px 10px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.80);
            border: 1px solid rgba(219, 228, 240, 0.95);
            color: #0f3d8c;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .05em;
            text-transform: uppercase;
        }

        .product-card {
            overflow: hidden;
            display: grid;
            min-width: 0;
        }

        .product-carousel {
            display: grid;
            gap: 12px;
        }

        .product-carousel-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
        }

        .product-carousel-shell {
            position: relative;
        }

        .product-carousel-track {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: calc((100% - 42px) / 4);
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x proximity;
            scroll-behavior: smooth;
            padding-bottom: 6px;
            scrollbar-width: none;
        }

        .product-carousel-track::-webkit-scrollbar {
            display: none;
        }

        .product-carousel-track > .product-card {
            scroll-snap-align: start;
            min-height: 100%;
        }

        .product-carousel-controls {
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .product-carousel-btn {
            width: 40px;
            height: 40px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #334155;
            cursor: pointer;
            display: grid;
            place-items: center;
            transition: transform .15s ease, background .15s ease;
        }

        .product-carousel-btn:hover {
            transform: translateY(-1px);
            background: #f8fbff;
        }

        .product-carousel-note {
            color: var(--muted);
            font-size: 12px;
        }

        .product-art {
            min-height: 164px;
            padding: 16px;
            position: relative;
            color: #fff;
            background:
                radial-gradient(circle at top right, rgba(255, 255, 255, 0.24), transparent 30%),
                linear-gradient(135deg, var(--product-a, #2563eb), var(--product-b, #38bdf8));
        }

        .product-art .badge {
            display: inline-flex;
            align-items: center;
            padding: 7px 10px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.16);
            border: 1px solid rgba(255, 255, 255, 0.16);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .05em;
            text-transform: uppercase;
        }

        .product-art .art-title {
            position: absolute;
            left: 16px;
            right: 16px;
            bottom: 16px;
        }

        .product-art h3 {
            margin: 0 0 5px;
            font-size: 19px;
            line-height: 1.05;
            letter-spacing: -0.03em;
            font-weight: 700;
        }

        .product-body {
            padding: 16px;
            display: grid;
            gap: 10px;
        }

        .topline {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 10px;
        }

        .tag,
        .mini-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 10px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #334155;
            font-size: 11px;
            font-weight: 600;
        }

        .tag {
            color: #0f3d8c;
            background: rgba(37, 99, 235, 0.08);
            border-color: rgba(37, 99, 235, 0.10);
        }

        .price-row {
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 8px;
        }

        .price-now {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.04em;
        }

        .price-before {
            color: var(--muted);
            text-decoration: line-through;
            font-size: 12px;
        }

        .product-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .feature-card {
            padding: 16px;
            display: grid;
            gap: 10px;
        }

        .feature-icon {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            display: grid;
            place-items: center;
            background: rgba(37, 99, 235, 0.08);
            color: var(--blue);
            font-size: 18px;
        }

        .split {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(330px, 0.94fr);
            gap: 14px;
        }

        .points,
        .support {
            padding: 18px;
            border-radius: 24px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 12px;
        }

        .points-list {
            display: grid;
            gap: 10px;
        }

        .points-row {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding-top: 10px;
            border-top: 1px solid var(--line);
        }

        .points-row:first-child {
            padding-top: 0;
            border-top: 0;
        }

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-top: 6px;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            flex: none;
        }

        .points-row strong,
        .support-item strong {
            display: block;
            margin-bottom: 3px;
            font-weight: 700;
        }

        .points-row span,
        .support-item span {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.55;
        }

        .support-grid {
            display: grid;
            gap: 10px;
        }

        .support-item {
            padding: 12px;
            border-radius: 16px;
            border: 1px solid var(--line);
            background: #fff;
        }

        .footer {
            display: grid;
            gap: 14px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1.1fr .9fr .9fr;
            gap: 14px;
        }

        .footer-card {
            padding: 16px;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: #fff;
            box-shadow: none;
        }

        .footer-card h4 {
            margin: 0 0 10px;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .footer-links {
            display: grid;
            gap: 8px;
        }

        .footer-links a {
            color: #334155;
            font-size: 13px;
            line-height: 1.5;
        }

        .payment-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .payment {
            display: inline-flex;
            align-items: center;
            min-height: 34px;
            padding: 0 10px;
            border-radius: 12px;
            border: 1px solid var(--line);
            background: #fff;
            color: #0f3d8c;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .05em;
        }

        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            color: var(--muted);
            font-size: 12px;
            padding-top: 2px;
        }

        .muted { color: var(--muted); }

        @media (max-width: 1180px) {
            .nav,
            .hero-stage,
            .split,
            .footer-grid {
                grid-template-columns: 1fr;
            }

            .quick-links {
                justify-content: flex-start;
            }

            .category-grid,
            .product-grid,
            .feature-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 760px) {
            .shell { padding: 12px; }

            .topbar,
            .nav,
            .hero,
            .section,
            .footer {
                border-radius: 20px;
            }

            .hero {
                padding: 22px;
            }

            .hero h1 {
                font-size: clamp(30px, 10vw, 44px);
            }

            .hero-stats,
            .category-grid,
            .feature-grid {
                grid-template-columns: 1fr;
            }

            .slide-visual {
                grid-template-columns: 1fr;
                min-height: 0;
            }

            .product-carousel-track {
                grid-auto-columns: minmax(240px, 82%);
            }

            .search,
            .hero-search {
                grid-template-columns: 1fr;
            }

            .slide-copy {
                max-width: none;
            }
        }
    </style>
</head>
<body>
@php
    $categories = [
        ['title' => 'Shopping', 'icon' => '◼', 'description' => 'Tecnologia, utilidades e ofertas do dia.', 'cta' => 'Explorar vitrine', 'accent' => '#2563eb', 'accentSoft' => 'rgba(37, 99, 235, 0.12)'],
        ['title' => 'Agronegócio', 'icon' => '▣', 'description' => 'Insumos, ferramentas e operações do campo.', 'cta' => 'Ver oportunidades', 'accent' => '#16a34a', 'accentSoft' => 'rgba(22, 163, 74, 0.12)'],
        ['title' => 'Saúde', 'icon' => '✚', 'description' => 'Bem-estar, autocuidado e itens essenciais.', 'cta' => 'Acessar coleção', 'accent' => '#7c3aed', 'accentSoft' => 'rgba(124, 58, 237, 0.12)'],
        ['title' => 'Viagens', 'icon' => '✈', 'description' => 'Experiências, destinos e serviços premium.', 'cta' => 'Montar viagem', 'accent' => '#f59e0b', 'accentSoft' => 'rgba(245, 158, 11, 0.14)'],
    ];

    $products = [
        ['title' => 'Cafeteira Compacta Duo', 'subtitle' => 'Bebidas quentes para começar o dia com praticidade.', 'category' => 'Destaque', 'price' => 'R$ 189,90', 'oldPrice' => 'R$ 219,90', 'installments' => '3x de R$ 63,30', 'points' => '9.495 pts', 'rating' => '4,9', 'stock' => 'Pronta entrega', 'productA' => '#1d4ed8', 'productB' => '#38bdf8'],
        ['title' => 'Kit Bem-Estar Essencial', 'subtitle' => 'Itens para autocuidado e rotina saudável.', 'category' => 'Saúde', 'price' => 'R$ 129,00', 'oldPrice' => 'R$ 149,00', 'installments' => '2x de R$ 64,50', 'points' => '6.450 pts', 'rating' => '4,8', 'stock' => 'Mais pedido', 'productA' => '#7c3aed', 'productB' => '#a78bfa'],
        ['title' => 'Mochila Travel Pro', 'subtitle' => 'Organização e resistência para deslocamentos.', 'category' => 'Viagens', 'price' => 'R$ 239,00', 'oldPrice' => 'R$ 279,00', 'installments' => '4x de R$ 59,75', 'points' => '11.950 pts', 'rating' => '4,9', 'stock' => 'Oferta limitada', 'productA' => '#f59e0b', 'productB' => '#fbbf24'],
        ['title' => 'Ferramenta Multiuso Agro', 'subtitle' => 'Solução prática para atividades do campo.', 'category' => 'Agronegócio', 'price' => 'R$ 99,90', 'oldPrice' => 'R$ 119,90', 'installments' => '2x de R$ 49,95', 'points' => '4.995 pts', 'rating' => '4,7', 'stock' => 'Alta saída', 'productA' => '#16a34a', 'productB' => '#22c55e'],
        ['title' => 'Smart Speaker Home', 'subtitle' => 'Automação, música e assistente de voz.', 'category' => 'Shopping', 'price' => 'R$ 349,90', 'oldPrice' => 'R$ 399,90', 'installments' => '6x de R$ 58,31', 'points' => '17.495 pts', 'rating' => '5,0', 'stock' => 'Novo na loja', 'productA' => '#0f3d8c', 'productB' => '#2563eb'],
        ['title' => 'Kit Hidratação Premium', 'subtitle' => 'Rotina de cuidado com foco em conforto.', 'category' => 'Saúde', 'price' => 'R$ 79,90', 'oldPrice' => 'R$ 94,90', 'installments' => '2x de R$ 39,95', 'points' => '3.995 pts', 'rating' => '4,8', 'stock' => 'Estoque seguro', 'productA' => '#0891b2', 'productB' => '#38bdf8'],
        ['title' => 'Maleta Office Plus', 'subtitle' => 'Organização com visual limpo para trabalho.', 'category' => 'Shopping', 'price' => 'R$ 159,90', 'oldPrice' => 'R$ 189,90', 'installments' => '3x de R$ 53,30', 'points' => '7.995 pts', 'rating' => '4,8', 'stock' => 'Saída constante', 'productA' => '#334155', 'productB' => '#64748b'],
        ['title' => 'Experiência Fim de Semana', 'subtitle' => 'Pacote para descanso, lazer e compra.', 'category' => 'Viagens', 'price' => 'R$ 499,90', 'oldPrice' => 'R$ 559,90', 'installments' => '8x de R$ 62,49', 'points' => '24.995 pts', 'rating' => '5,0', 'stock' => 'Seleção premium', 'productA' => '#1e40af', 'productB' => '#60a5fa'],
    ];

    $productRows = [
        $products,
        $products,
    ];

    $features = [
        ['icon' => '◔', 'title' => 'Compra com saldo e pontos', 'description' => 'Flexibilidade de pagamento com leitura clara do preço.',],
        ['icon' => '◫', 'title' => 'Categorias por experiência', 'description' => 'Entrada por intenção de uso e não apenas por produto.',],
        ['icon' => '◉', 'title' => 'Cards informativos', 'description' => 'Preço, desconto, parcelas e pontos sem excesso visual.',],
    ];

    $carouselSlides = [
        [
            'badge' => 'Curadoria do dia',
            'title' => 'Seleção suave para abrir a experiência',
            'description' => 'Uma vitrine com foco em descoberta, menos contraste e leitura mais calma.',
            'bodyTitle' => 'Mix de compra com respiro',
            'bodyText' => 'Ofertas organizadas sem competir com a tipografia.',
            'metaA' => 'Leitura',
            'metaAValue' => 'Mais confortável',
            'metaB' => 'Paleta',
            'metaBValue' => 'Azul mantido',
            'accentA' => '#2563eb',
            'accentB' => '#38bdf8',
            'image' => 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80',
        ],
        [
            'badge' => 'Parcelamento leve',
            'title' => 'Preço, desconto e parcelas em equilíbrio',
            'description' => 'Mantemos a paleta azul, mas reduzimos a densidade visual dos elementos.',
            'bodyTitle' => 'Hierarquia mais limpa',
            'bodyText' => 'Valor, condição de pagamento e apelo promocional sem exagero.',
            'metaA' => 'Parcelamento',
            'metaAValue' => 'Até 12x',
            'metaB' => 'Foco',
            'metaBValue' => 'Conversão suave',
            'accentA' => '#0f3d8c',
            'accentB' => '#1d4ed8',
            'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
        ],
        [
            'badge' => 'Categorias em foco',
            'title' => 'Experiências separadas por intenção de compra',
            'description' => 'Navegação simples para shopping, agro, saúde e viagens.',
            'bodyTitle' => 'Organização de catálogo',
            'bodyText' => 'Resumo do caminho visual da demo antes dos blocos abaixo.',
            'metaA' => 'Categorias',
            'metaAValue' => '04 entradas',
            'metaB' => 'Estrutura',
            'metaBValue' => 'Pronta para escala',
            'accentA' => '#7c3aed',
            'accentB' => '#38bdf8',
            'image' => 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80',
        ],
    ];
@endphp

    <div class="shell">
        <div class="page">
            <div class="topbar">
                <div>
                    <strong>Vitrine estática de teste</strong>
                    <span>Versão clean da demo em <code>/teste2</code>, sem integração com API.</span>
                </div>
                <div class="pills">
                    <span class="pill">12x sem juros</span>
                    <span class="pill">Pontos + dinheiro</span>
                    <span class="pill">Layout clean</span>
                    <a class="pill" href="{{ route('carrinho.index') }}">Carrinho</a>
                </div>
            </div>

            <header class="nav">
                <a class="brand" href="#inicio">
                    <div class="brand-mark">C</div>
                    <div class="brand-text">
                        <strong>Coopera Vitrine</strong>
                        <span>Versão mais leve da página de teste</span>
                    </div>
                </a>

                <div class="search">
                    <label class="search-box" aria-label="Buscar produtos">
                        <span class="muted">⌕</span>
                        <input type="text" placeholder="Buscar por categoria, produto ou experiência">
                    </label>
                    <a class="btn btn-primary" href="#produtos">Buscar</a>
                </div>

                <div class="quick-links">
                    <a class="quick-link" href="#categorias">Categorias</a>
                    <a class="quick-link" href="#produtos">Produtos</a>
                    <a class="quick-link" href="#rodape">Ajuda</a>
                </div>
            </header>
            <section class="hero-stage" id="inicio">
                <article class="carousel-card hero-carousel" aria-label="Carrossel principal da vitrine">
                    <div class="carousel-head">
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Destaques</span>
                        <div class="carousel-controls">
                            <button class="carousel-btn" type="button" data-carousel-prev aria-label="Slide anterior">�</button>
                            <button class="carousel-btn" type="button" data-carousel-next aria-label="Pr�ximo slide">�</button>
                        </div>
                    </div>

                    <div class="carousel-viewport">
                        <div class="carousel-track" data-carousel-track>
                            @foreach($carouselSlides as $slide)
                                <article class="carousel-slide">
                                    <div class="slide-visual" style="background-image: linear-gradient(135deg, color-mix(in srgb, {{ $slide['accentA'] }} 72%, rgba(9, 18, 36, 0.18)), color-mix(in srgb, {{ $slide['accentB'] }} 62%, rgba(9, 18, 36, 0.22))), url('{{ $slide['image'] }}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                                        <div class="slide-copy">
                                            <span class="slide-badge">{{ $slide['badge'] }}</span>
                                            <h3>{{ $slide['title'] }}</h3>
                                            <p>{{ $slide['description'] }}</p>
                                                @if($loop->first)
                                                    <div class="hero-search" style="margin-top: 20px;">
                                                        <input type="text" placeholder="Exemplo: cafeteira, mochila, bem-estar, viagem">
                                                        <a class="btn btn-primary" href="#produtos">Explorar agora</a>
                                                    </div>
                                                    <div class="slide-actions">
                                                        <a class="btn btn-secondary" href="#categorias">Ver categorias</a>
                                                        <a class="btn btn-secondary" href="#rodape">Como funciona</a>
                                                    </div>
                                                @else
                                                    <div class="slide-actions">
                                                        <a class="btn btn-secondary" href="#produtos">Ver ofertas</a>
                                                        <a class="btn btn-secondary" href="#rodape">Entender fluxo</a>
                                                    </div>
                                                @endif
                                        </div>

                                        <div class="slide-meta">
                                            <div class="meta-card">
                                                <strong>{{ $slide['metaA'] }}</strong>
                                                <span>{{ $slide['metaAValue'] }}</span>
                                            </div>
                                            <div class="meta-card">
                                                <strong>{{ $slide['metaB'] }}</strong>
                                                <span>{{ $slide['metaBValue'] }}</span>
                                            </div>
                                            <div class="meta-card">
                                                <strong>{{ $slide['bodyTitle'] }}</strong>
                                                <span>{{ $slide['bodyText'] }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            @endforeach
                        </div>
                    </div>

                    <div class="carousel-footer">
                        <div class="carousel-dots" data-carousel-dots aria-label="Pagina��o do carrossel"></div>
                        <span class="carousel-meta">Passe os slides para comparar os destaques da vitrine.</span>
                    </div>
                </article>
            </section>

            <section class="section" id="categorias">
                <div class="section-head">
                    <div>
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Categorias</span>
                        <h2>Navegue por experiência</h2>
                        <p>As cores continuam vivas, mas com peso tipográfico e contorno visual reduzidos.</p>
                    </div>
                </div>
                <div class="section-body">
                    <div class="category-grid">
                        @foreach($categories as $category)
                            <article class="category-card" style="--accent: {{ $category['accent'] }}; --accent-soft: {{ $category['accentSoft'] }};">
                                <div class="meta">
                                    <div class="category-icon">{{ $category['icon'] }}</div>
                                    <h3>{{ $category['title'] }}</h3>
                                    <p>{{ $category['description'] }}</p>
                                </div>
                                <span class="cta">{{ $category['cta'] }} →</span>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section class="section" id="produtos">
                <div class="section-head">
                    <div>
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Produtos</span>
                        <h2>Produtos em destaque</h2>
                        <p>Os cards aparecem em duas linhas circulares, com 8 produtos por linha e 4 visíveis por vez.</p>
                    </div>
                    <a class="btn btn-secondary" href="#rodape">Ver atendimento</a>
                </div>
                <div class="section-body">
                    <div class="product-carousel" data-product-carousels>
                        @foreach($productRows as $rowIndex => $rowProducts)
                            <div class="product-carousel-shell" data-product-carousel-shell>
                                <div class="product-carousel-head">
                                    <div>
                                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Linha {{ $rowIndex + 1 }}</span>
                                        <div class="product-carousel-note">
                                            {{ $rowIndex === 0 ? 'Primeira linha com 8 produtos e 4 visíveis por vez.' : 'Segunda linha com 8 produtos e 4 visíveis por vez.' }}
                                        </div>
                                    </div>
                                    <div class="product-carousel-controls">
                                        <button class="product-carousel-btn" type="button" data-product-prev aria-label="Produtos anteriores">‹</button>
                                        <button class="product-carousel-btn" type="button" data-product-next aria-label="Próximos produtos">›</button>
                                    </div>
                                </div>

                                <div class="product-carousel-track" data-product-carousel>
                                    @foreach($rowProducts as $product)
                                        <article class="product-card">
                                            <div class="product-art" style="--product-a: {{ $product['productA'] }}; --product-b: {{ $product['productB'] }};">
                                                <span class="badge">{{ $product['category'] }}</span>
                                                <div class="art-title">
                                                    <h3>{{ $product['title'] }}</h3>
                                                    <p>{{ $product['subtitle'] }}</p>
                                                </div>
                                            </div>

                                            <div class="product-body">
                                                <div class="topline">
                                                    <div>
                                                        <span class="tag">{{ $product['stock'] }}</span>
                                                        <h4>{{ $product['title'] }}</h4>
                                                    </div>
                                                    <span class="mini-pill">★ {{ $product['rating'] }}</span>
                                                </div>

                                                <div class="price-row">
                                                    <span class="price-now">{{ $product['price'] }}</span>
                                                    <span class="price-before">{{ $product['oldPrice'] }}</span>
                                                </div>

                                                <div class="product-meta">
                                                    <span class="mini-pill">{{ $product['installments'] }}</span>
                                                    <span class="mini-pill">ou {{ $product['points'] }}</span>
                                                </div>

                                            <div class="promo-actions">
                                                <form method="POST" action="{{ route('carrinho.add') }}" style="display: contents;">
                                                    @csrf
                                                    <input type="hidden" name="slug" value="{{ \Illuminate\Support\Str::slug($product['title']) }}">
                                                    <input type="hidden" name="title" value="{{ $product['title'] }}">
                                                    <input type="hidden" name="subtitle" value="{{ $product['subtitle'] ?? '' }}">
                                                    <input type="hidden" name="category" value="{{ $product['category'] ?? 'Produto' }}">
                                                    <input type="hidden" name="brand" value="{{ $product['brand'] ?? 'Coopera' }}">
                                                    <input type="hidden" name="ref" value="{{ $product['ref'] ?? '' }}">
                                                    <input type="hidden" name="price" value="{{ $product['price'] ?? 'R$ 0,00' }}">
                                                    <input type="hidden" name="old_price" value="{{ $product['oldPrice'] ?? '' }}">
                                                    <input type="hidden" name="image" value="{{ $product['image'] ?? 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80' }}">
                                                    <input type="hidden" name="stock" value="{{ $product['stock'] ?? 'Em estoque' }}">
                                                    <input type="hidden" name="quantity" value="1">
                                                    <input type="hidden" name="redirect_to" value="{{ url()->current() }}">
                                                    <button class="btn btn-primary" type="submit">Comprar</button>
                                                </form>
                                                <a class="btn btn-secondary" href="{{ route('produto.detalhe', ['slug' => \Illuminate\Support\Str::slug($product['title'])]) }}">Detalhes</a>
                                            </div>
                                        </div>
                                    </article>
                                @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>

            <footer class="footer" id="rodape">
                <div class="footer-grid">
                    <article class="footer-card">
                        <h4>Coopera Vitrine</h4>
                        <p class="muted" style="margin: 0; line-height: 1.65;">
                            Demo estática em <code>/teste2</code>, com o mesmo conteúdo-base, mas em uma leitura mais limpa e suave.
                        </p>
                    </article>

                    <article class="footer-card">
                        <h4>Institucional</h4>
                        <div class="footer-links">
                            <a href="#inicio">Página inicial</a>
                            <a href="#categorias">Categorias</a>
                            <a href="#produtos">Produtos</a>
                        </div>
                    </article>

                    <article class="footer-card">
                        <h4>Formas de pagamento</h4>
                        <div class="payment-row">
                            <span class="payment">Pix</span>
                            <span class="payment">Cartão</span>
                            <span class="payment">Pontos</span>
                            <span class="payment">Saldo</span>
                            <span class="payment">Parcelado</span>
                        </div>
                    </article>
                </div>

                <div class="footer-bottom">
                    <span>Demo estática. Sem integração com catálogo real.</span>
                    <span>Versão clean, com sombras reduzidas e tipografia mais leve.</span>
                </div>
            </footer>
        </div>
    </div>

    <script>
        (() => {
            const track = document.querySelector('[data-carousel-track]');
            const dotsHost = document.querySelector('[data-carousel-dots]');
            const prevBtn = document.querySelector('[data-carousel-prev]');
            const nextBtn = document.querySelector('[data-carousel-next]');

            if (!track || !dotsHost || !prevBtn || !nextBtn) {
                return;
            }

            const slides = Array.from(track.children);
            let index = 0;
            const dots = [];

            const render = () => {
                track.style.transform = `translateX(-${index * 100}%)`;
                dots.forEach((dot, dotIndex) => {
                    dot.classList.toggle('active', dotIndex === index);
                    dot.setAttribute('aria-pressed', dotIndex === index ? 'true' : 'false');
                });
            };

            const goTo = (nextIndex) => {
                index = (nextIndex + slides.length) % slides.length;
                render();
            };

            slides.forEach((_, slideIndex) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'dot-btn';
                dot.setAttribute('aria-label', `Ir para o slide ${slideIndex + 1}`);
                dot.addEventListener('click', () => goTo(slideIndex));
                dotsHost.appendChild(dot);
                dots.push(dot);
            });

            prevBtn.addEventListener('click', () => goTo(index - 1));
            nextBtn.addEventListener('click', () => goTo(index + 1));

            let timer = window.setInterval(() => goTo(index + 1), 7000);

            const resetTimer = () => {
                window.clearInterval(timer);
                timer = window.setInterval(() => goTo(index + 1), 7000);
            };

            [prevBtn, nextBtn, ...dots].forEach((element) => {
                element.addEventListener('click', resetTimer);
            });

            render();
        })();

        (() => {
            const shells = document.querySelectorAll('[data-product-carousel-shell]');

            shells.forEach((shell) => {
                const track = shell.querySelector('[data-product-carousel]');
                const prevBtn = shell.querySelector('[data-product-prev]');
                const nextBtn = shell.querySelector('[data-product-next]');

                if (!track || !prevBtn || !nextBtn) {
                    return;
                }

                const cards = Array.from(track.querySelectorAll('.product-card'));
                let index = 0;
                const visibleCount = 4;
                const maxIndex = Math.max(0, cards.length - visibleCount);

                const getStep = () => {
                    const card = cards[0];
                    if (!card) return 0;
                    const cardWidth = card.getBoundingClientRect().width;
                    const gap = parseFloat(getComputedStyle(track).gap || '0') || 0;
                    return cardWidth + gap;
                };

                const scrollToIndex = (nextIndex) => {
                    index = Math.max(0, Math.min(maxIndex, nextIndex));
                    track.scrollTo({ left: index * getStep(), behavior: 'smooth' });
                };

                prevBtn.addEventListener('click', () => {
                    scrollToIndex(index <= 0 ? maxIndex : index - 1);
                });

                nextBtn.addEventListener('click', () => {
                    scrollToIndex(index >= maxIndex ? 0 : index + 1);
                });

                let timer = window.setInterval(() => scrollToIndex(index >= maxIndex ? 0 : index + 1), 6000);

                const resetTimer = () => {
                    window.clearInterval(timer);
                    timer = window.setInterval(() => scrollToIndex(index >= maxIndex ? 0 : index + 1), 6000);
                };

                [prevBtn, nextBtn].forEach((el) => el.addEventListener('click', resetTimer));
            });
        })();
    </script>
</body>
</html>
