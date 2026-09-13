# Homepage behavior contract

## Header and navigation

- The header begins transparent with white controls over the hero.
- On downward scroll it moves out of view. On upward scroll it returns on a white surface with dark controls; at the top it returns to transparent.
- Menu opens a white left drawer over a dark, blurred page scrim. Desktop drawer width is 475px; mobile drawer fills the viewport.
- Top-level groups are Collections, Savoir-Faire, Our World, and Services. Selecting a group reveals its related links in the same drawer.
- Escape, the close control, and clicking the scrim close the drawer. While open, body scrolling is locked and focus stays within the drawer.
- Locale control opens a centered locale panel and can be closed by Escape, close control, or its scrim.

## Media

- Hero and lookbook videos autoplay muted, loop, and use `playsInline`.
- Each video exposes a play/pause control with an accessible label.
- Hero media always uses cover sizing. The first hero swaps to the narrow image under 768px.

## Carousels

- Track supports touch/trackpad horizontal scrolling and hidden native scrollbar.
- Previous/next controls scroll one visible card group and disable at the respective ends.
- Card links and the section-level novelty link remain usable with keyboard focus.

## Footer and links

- Internal links retain the captured Audemars Piguet paths; external destinations open normally.
- Newsletter CTA is a real link to the captured subscription page.
- Mobile footer groups use disclosure controls so long legal lists do not dominate the first view.

