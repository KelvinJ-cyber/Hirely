/**
 * Reusable section card wrapper with icon + title + optional subtitle.
 *
 * @param {object}  props
 * @param {import('lucide-react').LucideIcon} props.icon
 * @param {string}  props.iconColor   – CSS class: 'blue' | 'purple' | 'green'
 * @param {string}  props.title
 * @param {string}  [props.subtitle]
 * @param {React.ReactNode} props.children
 */
export function SectionCard({ icon: Icon, iconColor = 'blue', title, subtitle, children }) {
  return (
    <div className="section-card">
      <div className="section-header">
        {Icon && (
          <div className={`section-icon ${iconColor}`}>
            <Icon style={{ width: 20, height: 20 }} />
          </div>
        )}
        <div>
          <h3 className="section-title">{title}</h3>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
